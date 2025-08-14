import {
  FrontendQuestionSettingsAreaComponent,
  RichTextField,
} from "@examplary/ui";

import { CodeEditor } from "./code-editor.js";
import { useEffect } from "react";
// import {it, expect, run} from "jest-lite";

const SettingsAreaComponent: FrontendQuestionSettingsAreaComponent = ({
  settings,
  setSetting,
  t,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-0.5">
          {t("assertions")}
        </label>
        <details className="mb-2">
          <summary className="text-sm text-zinc-600 cursor-pointer">
            {t("assertions-description")}
          </summary>
          <div className="my-2 rounded bg-zinc-100 p-4 text-sm">
            Assertions use{" "}
            <a
              href="https://jestjs.io/docs/expect"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
            >
              Jest's expect
            </a>{" "}
            function to assert the expected output of the code. The
            documentation linked provides more information on how to use it and
            the available matchers.
            <br />
            <br />
            You can also build a test suite by using the <code>
              describe
            </code>{" "}
            and <code>it</code> functions, which allows you to group tests and
            show specific feedback to the student:
            <pre className="rounded bg-white mt-1.5 p-2 text-xs">
              <code>
                {`it('result exists', () => {
  expect(result).toBeDefined();
});
it('result is an array', () => {
  expect(Array.isArray(result)).toEqual(true);
});
it('result contains 1,2,3', () => {
  expect(result).toEqual([1, 2, 3]);
});`}
              </code>
            </pre>
          </div>
        </details>
        <CodeEditor
          value={settings["assertions"] || ""}
          onChange={(value) => setSetting("assertions", value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {t("initial-value")}
        </label>
        <CodeEditor
          value={settings["initial-value"] || ""}
          onChange={(value) => setSetting("initial-value", value)}
        />
      </div>
    </div>
  );
};

export default SettingsAreaComponent;
