import { FC, ReactNode, createContext, useContext, useState } from "react";
import { PythonError } from "client-side-python-runner";

type PythonIOContextType = {
  code: string;
  setCode: (code: string) => void;
  codeResult: string[];
  setCodeResult: (res: string[]) => void;
  error?: PythonError;
  setError: (error: PythonError | undefined) => void;
  resetCode: (code: string) => void;
  resetEditorTrigger: number;
};

const PyIOContext = createContext<PythonIOContextType>({
  code: "",
  codeResult: [],
  error: undefined,
  resetEditorTrigger: 0,
  resetCode: {} as (code: string) => void,
  setCode: {} as PythonIOContextType["setCode"],
  setCodeResult: {} as PythonIOContextType["setCodeResult"],
  setError: {} as PythonIOContextType["setError"],
});

export const PythonIOProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [code, setCode] = useState<string>(`print("Hello world!")`);
  const [codeResult, setCodeResult] = useState<string[]>([]);
  const [error, setError] = useState<PythonError>();
  const [resetEditorTrigger, setResetEditorTrigger] = useState(0);

  const resetCode = (code: string) => {
    setCode(code);
    setResetEditorTrigger((prev) => prev + 1);
  };

  return (
    <PyIOContext.Provider
      value={{
        code,
        setCode,
        codeResult,
        setCodeResult,
        error,
        setError,
        resetCode,
        resetEditorTrigger,
      }}
    >
      {children}
    </PyIOContext.Provider>
  );
};

export const usePyIOContext = () => {
  return useContext(PyIOContext);
};
