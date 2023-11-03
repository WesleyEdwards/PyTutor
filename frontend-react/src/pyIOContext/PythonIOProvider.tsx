import { FC, ReactNode, createContext, useState } from "react";
import { PythonError } from "client-side-python-runner";
import { GptApi } from "../api/GptApi";

type CodeOutput = {
  res?: string[];
  error?: PythonError;
};
export type GptFunction = {
  _id: string;
  def: string;
  code: string;
  implementation?: string;
};

type PythonIOContextType = {
  code: string;
  codeResult: CodeOutput;
  setCodeOutput: (props: { res?: string[]; error?: PythonError }) => void;
  setCode: (code: string) => void;
  gptApi: GptApi;
  gptFunctions: GptFunction[];
  addGptFunction: (props: GptFunction) => void;
  removeGptFunction: (props: GptFunction) => void;
  defineGptFunction: (props: GptFunction) => void;
};

export const PyIOContext = createContext<PythonIOContextType>(
  {} as PythonIOContextType
);

export const PythonIOProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [code, setCode] = useState<string>(`\n\ndef main():\n\tprint("Your code goes here")\n\n\n\nmain()`);
  const [codeResult, setCodeResult] = useState<CodeOutput>({});
  const [gptFunctions, setGptFunctions] = useState<GptFunction[]>([]);

  const setCodeOutput = (props: CodeOutput) => {
    setCodeResult({ ...props });
  };

  const addGptFunction = (props: GptFunction) => {
    setGptFunctions((prev) => [...prev, props]);
  };
  const removeGptFunction = (props: GptFunction) => {
    setGptFunctions((prev) => prev.filter((func) => func.def !== props.def));
  };

  const defineGptFunction = (props: GptFunction) => {
    setGptFunctions((prev) =>
      prev.map((func) => (func._id === props._id ? props : func))
    );
  };

  return (
    <PyIOContext.Provider
      value={{
        code,
        setCode,
        codeResult,
        setCodeOutput,
        gptApi: new GptApi(),
        gptFunctions,
        addGptFunction,
        removeGptFunction,
        defineGptFunction,
      }}
    >
      {children}
    </PyIOContext.Provider>
  );
};
