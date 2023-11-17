import { FC, ReactNode, createContext, useState } from "react";
import { GptApi } from "../api/GptApi";
import { CodeOutput, GptFunction } from "../types";
import { AiApi } from "../api/AiApi";
import { MockApi } from "../api/mocks/mockApi";
import { extractFunctionName, starterCode } from "../utils";

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

type FunChange = {
  add: GptFunction;
  remove: GptFunction;
  modify: { id: string; mod: Partial<GptFunction> };
  reorder: { id: string; destination: number };
  rename: { id: string; newName: string };
};

type UpdateFunsType = <T extends keyof FunChange>(
  type: T,
  params: FunChange[T]
) => void;

export const PythonIOProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [code, setCode] = useState<string>(starterCode);
  const [codeOutput, setCodeOutput] = useState("");
  const [outputError, setOutputError] = useState<string>();
  const [gptFunctions, setGptFunctions] = useState<GptFunction[]>([]);
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

  const addGptFunction = (fun: FunChange["add"]) => {
    setGptFunctions((prev) => [...prev, fun]);
  };

  const removeGptFunction = (props: FunChange["remove"]) => {
    setGptFunctions((prev) => prev.filter((func) => func.def !== props.def));
  };

  const modifyFunction = (props: FunChange["modify"]) => {
    setGptFunctions((prev) =>
      prev.map((func) =>
        func._id === props.id ? { ...func, ...props.mod } : func
      )
    );
  };

  const reorderFunctions = (props: FunChange["reorder"]) => {
    const { id, destination } = props;
    const functions = [...gptFunctions];
    const funToMove = functions.find((f) => f._id === id) ?? functions[0];
    functions.splice(functions.indexOf(funToMove), 1);
    functions.splice(destination, 0, funToMove);
    setGptFunctions(functions);
  };

  const renameFunction = (props: FunChange["rename"]) => {
    const { id, newName } = props;
    const functions = [...gptFunctions];
    const funToRename = functions.find((f) => f._id === id);
    const oldName = extractFunctionName(funToRename?.def ?? "");
    if (!oldName || !funToRename) return;

    const replaceName = (str: string) => str.replace(oldName, newName);

    const replacement: GptFunction = {
      ...funToRename,
      def: replaceName(funToRename.def),
      code: replaceName(funToRename.code),
      implementation: replaceName(funToRename.implementation),
      test: replaceName(funToRename.test),
    };
    console.log(replacement);

    setGptFunctions(
      functions.map((func) => (func._id === id ? replacement : func))
    );
  };

  const updateFuns: UpdateFunsType = (type, params) => {
    if (type === "add") addGptFunction(params as FunChange["add"]);
    if (type === "remove") removeGptFunction(params as FunChange["remove"]);
    if (type === "modify") modifyFunction(params as FunChange["modify"]);
    if (type === "reorder") reorderFunctions(params as FunChange["reorder"]);
    if (type === "rename") renameFunction(params as FunChange["rename"]);
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
        updateFuns,
      }}
    >
      {children}
    </PyIOContext.Provider>
  );
};
