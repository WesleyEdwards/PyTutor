import { FC, useCallback } from "react";
import CodeMirror, { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { useColorScheme } from "@mui/joy";

interface CodeMirrorEditorProps extends ReactCodeMirrorProps {
  value: string;
  onChange: (val: string) => void;
}

export const CodeMirrorEditor: FC<CodeMirrorEditorProps> = (props) => {
  const { value, onChange, ...rest } = props;

  const onChangeMirrorCode = useCallback(onChange, []);
  const { mode } = useColorScheme();

  return (
    <CodeMirror
      {...rest}
      value={value}
      basicSetup={{
        tabSize: 4,
        completionKeymap: false,
      }}
      extensions={[python()]}
      onChange={onChangeMirrorCode}
      theme={mode === "light" ? "light" : "dark"}
    />
  );
};
