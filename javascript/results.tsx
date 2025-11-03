import { CircleCheckIcon, CircleXIcon } from "lucide-react";

export const Results = ({ lines }) => {
  if (!lines || lines.length === 0) return null;

  const passed = lines.filter((line) => line.success).length;
  const total = lines.length;
  const allPassed = passed === total;

  return (
    <>
      <div className="flex items-center justify-between mt-4 mb-2">
        <p className="text-sm font-semibold">Test Results</p>
        <div
          className={`text-sm font-medium px-2 py-0.5 rounded ${
            allPassed
              ? "bg-emerald-100 text-emerald-700"
              : "bg-zinc-100 text-zinc-700"
          }`}
        >
          {passed}/{total} passed
        </div>
      </div>
      <div className="rounded bg-zinc-100 divide-y divide-zinc-300 text-xs mt-1 px-3">
        {lines.map((line, index) => (
          <div key={index} className="py-2">
            <div className="flex items-start gap-2">
              {line.success ? (
                <CircleCheckIcon className="text-emerald-500 size-4 flex-shrink-0 mt-0.5" />
              ) : (
                <CircleXIcon className="text-red-500 size-4 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <strong className="block">{line.title}</strong>
                {line.message && (
                  <span className="text-zinc-600 block mt-0.5">
                    {line.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
