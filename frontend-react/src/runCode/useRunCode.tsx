import {
  PythonError,
  runCode,
  setEngine,
  setOptions,
} from "client-side-python-runner";
import { useEffect, useState } from "react";
import { usePyIOContext } from "../pyIOContext/PyIOContext";

export const useRunCode = () => {
  const { code, setCodeOutput, gptFunctions } = usePyIOContext();

  const [pyResult, setPyResult] = useState<string[]>([]);
  const [error, setError] = useState<PythonError>();
  const [runFromKeyBoard, setRunFromKeyBoard] = useState(false);

  const [trigger, setTrigger] = useState(0);

  const createRunnableCode = (code: string): string => {
    const gptCode = gptFunctions.reduce((acc, gptFunction) => {
      return acc.concat(gptFunction.code);
    }, "");
    return gptCode.concat(code);
  };

  const runPythonCode = () => {
    runCode(createRunnableCode(code));
  };

  useEffect(() => {
    setEngine("pyodide");
    setOptions({
      output: (data) => {
        setError(undefined);
        setPyResult((prev) => prev.concat(data.replace("\n", "")));
        setTrigger((prev) => prev + 1);
      },
      error: (e) => {
        setError(e);
      },
    });
  }, []);

  useEffect(() => {
    setCodeOutput({ res: pyResult, error });
    setPyResult([]);
  }, [trigger]);

  useEffect(() => {
    if (runFromKeyBoard) {
      runPythonCode();
    }
    setRunFromKeyBoard(false);
  }, [runFromKeyBoard]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Enter") {
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
