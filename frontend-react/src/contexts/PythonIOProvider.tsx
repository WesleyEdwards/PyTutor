import { FC, ReactNode, createContext, useState } from "react";
import { GptApi } from "../api/GptApi";
import { CodeOutput, GptFunction } from "../types";
import { AiApi } from "../api/AiApi";
import { MockApi } from "../api/mocks/mockApi";
import { starterCode } from "../utils";

type PythonIOContextType = {
  code: string;
  codeOutput: CodeOutput;
  appendOutput: (out: string | null) => void;
  setOutputError: (error: string | undefined) => void;
  setCode: (code: string) => void;
  aiapi: AiApi;
  changeApi: (type: "mock" | "real") => void;
  gptFunctions: GptFunction[];
  addGptFunction: (props: GptFunction) => void;
  removeGptFunction: (props: GptFunction) => void;
  modifyFunction: (id: string, mod: Partial<GptFunction>) => void;
};

export const PyIOContext = createContext<PythonIOContextType>(
  {} as PythonIOContextType
);

export const PythonIOProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [code, setCode] = useState<string>(starterCode);
  const [codeOutput, setCodeOutput] = useState("");
  const [outputError, setOutputError] = useState<string>();
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

  const modifyFunction = (id: string, mod: Partial<GptFunction>) => {
    setGptFunctions((prev) =>
      prev.map((func) => (func._id === id ? { ...func, ...mod } : func))
    );
  };

  const changeApi = (type: "mock" | "real") => {
    localStorage.setItem("aiapi", type);
    setAiapi(type === "mock" ? new MockApi() : new GptApi());
  };

  const appendOutput = (out: string | null) => {
    if (out === null) return setCodeOutput("");
    setCodeOutput((prev) => prev.concat(out));
  };

  return (
    <PyIOContext.Provider
      value={{
        code,
        setCode,
        codeOutput: { res: codeOutput, error: outputError },
        setOutputError,
        appendOutput,
        aiapi,
        changeApi,
        gptFunctions,
        addGptFunction,
        removeGptFunction,
        modifyFunction,
      }}
    >
      {children}
    </PyIOContext.Provider>
  );
};
