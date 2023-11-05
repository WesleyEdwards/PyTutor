import { FC, ReactNode, createContext, useState } from "react";
import { PythonError } from "client-side-python-runner";
import { GptApi } from "../api/GptApi";
import { GptFunction } from "../types";
import { AiApi } from "../api/AiApi";
import { MockApi } from "../api/mocks/mockApi";

type CodeOutput = {
  res?: string;
  error?: PythonError;
};

type PythonIOContextType = {
  code: string;
  codeOutput: CodeOutput;
  setCodeOutput: (props: { res?: string; error?: PythonError }) => void;
  setCode: (code: string) => void;
  aiapi: AiApi;
  changeApi: (type: "mock" | "real") => void;
  gptFunctions: GptFunction[];
  addGptFunction: (props: GptFunction) => void;
  removeGptFunction: (props: GptFunction) => void;
  defineGptFunction: (props: GptFunction) => void;
};

export const PyIOContext = createContext<PythonIOContextType>(
  {} as PythonIOContextType
);

export const PythonIOProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [code, setCode] = useState<string>(
    `\n\ndef main():\n\tprint("Your code goes here")\n\n\n\nmain()`
  );
  const [codeOutput, setCodeOutput] = useState<CodeOutput>({});
  const [gptFunctions, setGptFunctions] = useState<GptFunction[]>([]);
  const [aiapi, setAiapi] = useState<AiApi>(
    localStorage.getItem("aiapi") === "mock" ? new MockApi() : new GptApi()
  );

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

  const changeApi = (type: "mock" | "real") => {
    localStorage.setItem("aiapi", type);
    setAiapi(type === "mock" ? new MockApi() : new GptApi());
  };

  return (
    <PyIOContext.Provider
      value={{
        code,
        setCode,
        codeOutput,
        setCodeOutput,
        aiapi,
        changeApi,
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
