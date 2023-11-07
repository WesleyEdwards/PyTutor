import { FC, useCallback } from "react";
import CodeMirror, { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { usePyIOContext } from "../pyIOContext/PyIOContext";

export const CodeMirrorEditor: FC = () => {
  const { code, setCode } = usePyIOContext();

  const onChangeFun: ReactCodeMirrorProps["onChange"] = (val, _) => {
    setCode(val);
  };

  const onChange = useCallback(onChangeFun, []);

  return (
    <CodeMirror
      value={code}
      height="600px"
      extensions={[python()]}
      onChange={onChange}
      theme={"dark"}
    />
  );
};
