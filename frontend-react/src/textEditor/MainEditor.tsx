import { CodeMirrorEditor } from "./CodeMirrorEditor";
import { usePyIOContext } from "../hooks/usePyIOContext";

export const MainEditor = () => {
  const { code, setCode } = usePyIOContext();

  return <CodeMirrorEditor height={"600px"} value={code} onChange={setCode} />;
};
