import { FC, useEffect, useMemo, useState } from "react";
import { CodeOutput, GptFunction } from "../types";
import { Typography } from "@mui/joy";
import { WriteTest } from "../AIFunctions/WriteTest";
import { CodeResult } from "../codeResults/CodeResult";
import { getOutputChopOffBool } from "../utils";
import { highlightTextInstructions } from "../renderHelpers";

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

  const testInstructions: React.ReactNode = useMemo(
    () => highlightTextInstructions(fun),
    [fun.def]
  );

  const testResult = useMemo(() => {
    if (testRes.error) return false;
    if (testRes.res === "") return undefined;
    return testRes.res.trim().endsWith("True");
  }, [testRes.res, testRes.error]);

  return (
    <>
      <Typography level="h2">Write a Test</Typography>
      <WriteTest
        fun={fun}
        setTestRes={setTestRes}
        testInstructions={testInstructions}
        codeToTest={() => fun.code}
        testResult={testResult}
      />
      <CodeResult
        defaultExpanded={false}
        codeOutput={processTestRes}
        title="Test Result"
        height="200px"
      />
    </>
  );
};
