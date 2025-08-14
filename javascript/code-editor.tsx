import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

export const CodeEditor = ({ value, onChange }) => {
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      className="rounded border-2 overflow-hidden"
      minHeight="90px"
      maxHeight="300px"
      extensions={[javascript()]}
    />
  );
};
