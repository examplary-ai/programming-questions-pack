import { CircleCheckIcon, CircleXIcon } from "lucide-react";

export const Results = ({lines}) => {
    if(!lines) return null;
  return (
    <>
          <p className="text-sm font-semibold mt-4">Output</p>
          <div className="rounded bg-zinc-100 divide-y divide-zinc-300 text-xs mt-1 px-3">
            {lines.map((line, index) => (
              <div key={index} className="py-2">
                <div className="flex items-center gap-2">
                  {line.success ? (
                    <CircleCheckIcon className="text-emerald-500 size-4 flex-shrink-0" />
                  ) : (
                    <CircleXIcon className="text-red-500 size-4 flex-shrink-0" />
                  )}
                  <strong>{line.title}</strong>
                  {line.message}
                </div>
              </div>
            ))}
          </div>
        </>
  );
}
