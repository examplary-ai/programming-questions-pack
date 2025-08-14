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
          TODO
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
