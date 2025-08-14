import { FrontendResultsComponent } from "@examplary/ui";
import { Results } from "./results";

const ResultsComponent: FrontendResultsComponent = ({ answer, t }) => {
  return (
    <>
      <pre>{answer?.value}</pre>
      <Results lines={answer?.context?.lines} />
    </>
  );
};

export default ResultsComponent;
