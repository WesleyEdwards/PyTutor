import { CodeResult } from "./CodeResult";
import { usePyIOContext } from "../hooks/usePyIOContext";

export const MainCodeResult = () => {
  const { codeOutput } = usePyIOContext();
  return (
    <CodeResult codeOutput={codeOutput} expandable={false} height="600px" />
  );
};
