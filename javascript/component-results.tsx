import { FrontendResultsComponent } from "@examplary/ui";
import { Results } from "./results";

const ResultsComponent: FrontendResultsComponent = ({ answer, t }) => {
  return (
    <div className="space-y-3">
      {answer?.value && (
        <div>
          <p className="text-sm font-semibold mb-2">Submitted Code</p>
          <pre className="text-xs bg-zinc-50 p-3 rounded overflow-x-auto border border-zinc-200">
            <code>{answer.value}</code>
          </pre>
        </div>
      )}
      {answer?.context?.lines && <Results lines={answer.context.lines} />}
    </div>
  );
};

export default ResultsComponent;
