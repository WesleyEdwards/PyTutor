import { FC, useEffect, useMemo, useState } from "react";
import { CodeOutput, GptFunction } from "../types";
import { Alert, Stack, Typography } from "@mui/joy";
import { WriteTest } from "../AIFunctions/WriteTest";
import { CodeResult } from "../codeResults/CodeResult";
import { extractFunctionName, getOutputChopOffBool } from "../utils";
import { highlightedText } from "../renderHelpers";

export const TestCreatedFun: FC<{ fun: GptFunction }> = ({ fun }) => {
  const [testRes, setTestRes] = useState<CodeOutput>({
    res: "",
    error: undefined,
  });

  const processTestRes = useMemo(
    () => ({ ...testRes, res: getOutputChopOffBool(testRes.res) }),
    [testRes.res, testRes.error]
  );

  useEffect(() => {
    if (!fun) return;
    setTestRes({ res: "", error: undefined });
  }, [fun]);

  const variables: React.ReactNode = useMemo(() => {
    const after = fun.def.split("(")[1];
    const before = after.split(")")[0];
    const args = before.split(",").map((arg) => arg.trim());
    return args.map((arg, i) => {
      return (
        <Typography key={i}>
          {highlightedText(arg, "variable")}
          {highlightedText(i === args.length - 1 ? "" : ", ", "punctuation")}
        </Typography>
      );
    });
  }, [fun.def]);

  const testResult = useMemo(() => {
    if (testRes.error) return false;
    if (testRes.res === "") return undefined;
    return testRes.res.trim().endsWith("True");
  }, [testRes.res]);

  return (
    <>
      <Typography level="h2">Write a Test</Typography>
      <WriteTest
        fun={fun}
        setTestRes={setTestRes}
        testInstructions={
          <>
            <Typography>
              {highlightedText("def", "keyword")}{" "}
              {highlightedText(extractFunctionName(fun.def) ?? "", "function")}
              {highlightedText("(", "punctuation")}
              {variables}
              {highlightedText(")", "punctuation")}
            </Typography>
            <Typography overflow="auto">
              Write a test to ensure that the function{" "}
              {highlightedText(extractFunctionName(fun.def) ?? "", "function")}{" "}
              works as intended. The test should return{" "}
              {highlightedText("True", "boolean")} if the function if the
              function works as intended and{" "}
              {highlightedText("False", "boolean")} otherwise. You can use the{" "}
              {highlightedText("print", "function")}
              {highlightedText("()", "punctuation")} function to print the
              output of the function and the{" "}
              {highlightedText("return", "keyword")} keyword to return the
              output of the function.
            </Typography>
          </>
        }
        codeToTest={() => fun.code}
        testResult={testResult}
      />
      <CodeResult codeOutput={processTestRes} height="150px" />
    </>
  );
};
