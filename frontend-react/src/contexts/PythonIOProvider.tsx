import { FC, ReactNode, createContext, useState } from "react";
import { GptApi } from "../api/GptApi";
import { CodeOutput, GptFunction } from "../types";
import { AiApi } from "../api/AiApi";
import { MockApi } from "../api/mocks/mockApi";
import { UpdateFunsType, usePTFunctions } from "./usePTFunctions";
import { currentAssignment } from "../assignmentInfo";

type PythonIOContextType = {
  code: string;
  codeOutput: CodeOutput;
  appendOutput: (out: string | null) => void;
  setOutputError: (error: string | undefined) => void;
  setCode: (code: string) => void;
  aiapi: AiApi;
  changeApi: (type: "mock" | "real") => void;
  gptFunctions: GptFunction[];
  updateFuns: UpdateFunsType;
};

export const PyIOContext = createContext<PythonIOContextType>(
  {} as PythonIOContextType
);

export const PythonIOProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [code, setCode] = useState<string>(currentAssignment.starterCode);
  const [codeOutput, setCodeOutput] = useState("");
  const [outputError, setOutputError] = useState<string>();
  const [aiapi, setAiapi] = useState<AiApi>(
    localStorage.getItem("aiapi") === "mock" ? new MockApi() : new GptApi()
  );

  const changeApi = (type: "mock" | "real") => {
    localStorage.setItem("aiapi", type);
    setAiapi(type === "mock" ? new MockApi() : new GptApi());
  };

  const appendOutput = (out: string | null) => {
    if (out === null) return setCodeOutput("");
    setCodeOutput((prev) => prev.concat(out));
  };

  const { gptFunctions, updateFuns } = usePTFunctions();

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
        updateFuns,
      }}
    >
      {children}
    </PyIOContext.Provider>
  );
};
