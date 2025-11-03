import { AnswerBox, FrontendPrintComponent } from "@examplary/ui";

const PrintComponent: FrontendPrintComponent = ({ answerBoxes }) => {
  if (!answerBoxes || answerBoxes.length === 0) return null;

  return (
    <div className="space-y-4">
      {answerBoxes.map((answerBox, index) => (
        <AnswerBox key={index} className="min-h-20">
          {answerBox.answer?.value && (
            <div>
              <p className="text-xs font-semibold mb-1 text-zinc-600">Code:</p>
              <pre className="text-xs bg-zinc-50 p-2 rounded overflow-x-auto">
                <code>{answerBox.answer.value}</code>
              </pre>
            </div>
          )}
        </AnswerBox>
      ))}
    </div>
  );
};

export default PrintComponent;
