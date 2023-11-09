import { runCode, setEngine, setOptions } from "client-side-python-runner";
import { useEffect, useState } from "react";
import { usePyIOContext } from "../pyIOContext/PyIOContext";
import { processErrorMessage } from "../utils";

export const useRunCode = () => {
  const { code, appendOutput, setOutputError, gptFunctions } = usePyIOContext();

  const [runFromKeyBoard, setRunFromKeyBoard] = useState(false);

  const createRunnableCode = (code: string): string => {
    const gptCode = gptFunctions.reduce((acc, gptFunction) => {
      return acc.concat(gptFunction.code);
    }, "");
    return gptCode.concat(code);
  };

  const runPythonCode = () => {
    appendOutput(null);
    setOutputError(undefined);
    const runnable = createRunnableCode(code);
    runCode(runnable);
  };

  useEffect(() => {
    setEngine("skulpt");
    setOptions({
      output: (data) => {
        appendOutput(data);
      },
      error: (e) => {
        setOutputError(processErrorMessage(e, code, createRunnableCode(code)));
      },
    });
  }, []);

  useEffect(() => {
    if (runFromKeyBoard) {
      runPythonCode();
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
    runPythonCode,
  };
};
