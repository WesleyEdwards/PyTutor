import { CodeMirrorEditor } from "./CodeMirrorEditor";
import { usePyIOContext } from "../pyIOContext/PyIOContext";

export const MainEditor = () => {
  const { code, setCode } = usePyIOContext();

  return <CodeMirrorEditor height={"600px"} value={code} onChange={setCode} />;
};
