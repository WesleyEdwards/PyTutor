import { useEffect, useState } from "react";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { processErrorMessage } from "../utils";
import { useRunPython } from "../hooks/useRunPython";

export const useRunCode = () => {
  const { code, appendOutput, setOutputError, gptFunctions } = usePyIOContext();

  const [runFromKeyBoard, setRunFromKeyBoard] = useState(false);

  const createRunnableCode = (code: string): string => {
    const gptCode = gptFunctions.reduce((acc, gptFunction) => {
      return acc.concat(gptFunction.code);
    }, "");
    return gptCode.concat(code);
  };

  const { runPythonCode } = useRunPython({
    key: "main",
    appendOutput,
    onError: (e) => {
      setOutputError(processErrorMessage(e, code, createRunnableCode(code)));
    },
    getRunnable: () => createRunnableCode(code),
  });

  const runMainCode = () => {
    appendOutput(null);
    setOutputError(undefined);
    runPythonCode();
  };

  useEffect(() => {
    if (runFromKeyBoard) {
      runMainCode();
    }
    setRunFromKeyBoard(false);
  }, [runFromKeyBoard]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "Enter") {
        setRunFromKeyBoard(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return {
    runMainCode,
  };
};
