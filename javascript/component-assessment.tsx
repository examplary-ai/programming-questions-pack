import { useEffect, useRef, useState } from "react";

import { FrontendAssessmentComponent } from "@examplary/ui";
import { CodeEditor } from "./code-editor";
import { evaluate } from "./evaluate";
import { Results } from "./results";

const AssessmentComponent: FrontendAssessmentComponent = ({
  question,
  saveAnswer,
  answer,
  t,
}) => {
  // Initialize with answer value or initial value from settings
  const [value, setValue] = useState(
    answer?.value || question.settings["initial-value"] || ""
  );
  const [result, setResult] = useState<any>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const timeout = useRef<any>(null);
  const isInitialMount = useRef(true);

  // Sync with answer prop changes, but only after initial mount to avoid overwriting user input
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // On initial mount, if there's an answer with context, show the results
      if (answer?.context?.lines) {
        setResult(answer.context.lines);
      }
      // If there's no answer value, set the initial value from settings
      if (!answer?.value && question.settings["initial-value"]) {
        const initialValue = question.settings["initial-value"];
        setValue(initialValue);
        // Save the initial value to answer
        saveAnswer(() => ({ value: initialValue, completed: false }));
      }
    }
  }, []);

  const update = (newValue) => {
    setValue(newValue);

    // @ts-ignore
    saveAnswer((answer) => ({ ...answer, value: newValue }));

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    setIsEvaluating(true);

    timeout.current = setTimeout(async () => {
      try {
        const { completed, lines } = await evaluate(
          newValue,
          question.settings.assertions
        );

        // @ts-ignore
        saveAnswer((answer) => ({
          ...answer,
          completed,
          context: { lines },
        }));

        setResult(lines);
      } catch (error) {
        console.error("Evaluation error:", error);
        setResult([
          {
            success: false,
            title: "Error",
            message: "An error occurred while evaluating your code.",
          },
        ]);
      } finally {
        setIsEvaluating(false);
      }
    }, 1000);
  };

  return (
    <>
      <CodeEditor value={value} onChange={update} />
      {isEvaluating && (
        <div className="text-sm text-zinc-500 mt-2">Evaluating code...</div>
      )}
      {result && !isEvaluating ? <Results lines={result} /> : null}
    </>
  );
};

export default AssessmentComponent;
