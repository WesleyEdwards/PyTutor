import {
  PythonError,
  runCode,
  setEngine,
  setOptions,
} from "client-side-python-runner";
import { useEffect } from "react";

export const useRunPython = (params: {
  key: string;
  appendOutput: (data: string | null) => void;
  onError: (error: PythonError | undefined) => void;
  getRunnable: () => string;
}) => {
  const { appendOutput, onError, getRunnable, key } = params;

  const runPythonCode = () => {
    appendOutput(null);
    setOptions({
      output: (data) => {
        appendOutput(data);
      },
      error: (e) => {
        onError(e);
      },
    });
    const runnable = getRunnable();
    runCode(runnable);
  };

  useEffect(() => {
    setEngine("skulpt");
  }, [key]);

  return {
    runPythonCode,
  };
};
