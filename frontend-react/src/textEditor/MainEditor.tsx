import { CodeMirrorEditor } from "./CodeMirrorEditor";
import { usePyIOContext } from "../hooks/usePyIOContext";
import "./MainEditor.css";

export const MainEditor = () => {
  const { code, setCode } = usePyIOContext();
  return <CodeMirrorEditor height="600px" value={code} onChange={setCode} />;
};
