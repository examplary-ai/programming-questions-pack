import { AnswerBox, FrontendPrintComponent } from "@examplary/ui";

const PrintComponent: FrontendPrintComponent = ({ answerBoxes }) => {
  if (!answerBoxes) return null;

  return <AnswerBox className="min-h-40" />;
};

export default PrintComponent;
