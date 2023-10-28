import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { PythonError } from "client-side-python-runner";
import { Exercise } from "./exercises/Exercises";
import { exercisesMod } from "./exercises/phanon-mod";

type Setter<T> = (item: T) => void;

type PythonIOContextType = {
  code: string;
  codeResult: { res: string[]; pass?: boolean };
  error?: PythonError;
  resetEditorTrigger: number;
  currExercise: Exercise;
  gradeResult: Setter<string[]>;
  setCode: Setter<string>;
  setError: Setter<PythonError | undefined>;
  setCurrExercise: Setter<Exercise>;
};

const PyIOContext = createContext<PythonIOContextType>(
  {} as PythonIOContextType
);

export const PythonIOProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currExercise, setCurrExercise] = useState<Exercise>(exercisesMod[0]);
  const [code, setCode] = useState<string>(`print("Hello world!")`);
  const [codeResult, setCodeResult] = useState<{
    res: string[];
    pass?: boolean;
  }>({
    res: [],
  });
  const [error, setError] = useState<PythonError>();
  const [resetEditorTrigger, setResetEditorTrigger] = useState(0);

  useEffect(() => {
    setCode(currExercise.starterCode);
    setCodeResult({ res: [], pass: undefined });
    setResetEditorTrigger((prev) => prev + 1);
  }, [currExercise.id]);

  const gradeResult = (res: string[]) => {
    // console.log(res);
    // console.log(currExercise.testResult(res));
    setCodeResult({
      res,
      pass: currExercise.testResult(res) === null,
    });
  };

  return (
    <PyIOContext.Provider
      value={{
        code,
        setCode,
        codeResult,
        gradeResult,
        error,
        setError,
        resetEditorTrigger,
        setCurrExercise,
        currExercise,
      }}
    >
      {children}
    </PyIOContext.Provider>
  );
};

export const usePyIOContext = () => {
  return useContext(PyIOContext);
};
