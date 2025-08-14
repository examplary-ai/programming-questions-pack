import { useRef, useState } from "react";

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
  const [value, setValue] = useState(answer?.value || "");
  const [result, setResult] = useState<any>(null);
  const timeout = useRef<any>(null);

  const update = (newValue) => {
    setValue(newValue);

    // @ts-ignore
    saveAnswer((answer) => ({ ...answer, value: newValue }));

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(async () => {
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
    }, 1000);
  };

  return (
    <>
      <CodeEditor value={value} onChange={update} />
      {result ? <Results lines={result} /> : null}
    </>
  );
};

export default AssessmentComponent;
