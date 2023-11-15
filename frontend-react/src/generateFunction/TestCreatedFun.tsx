import { FC, useEffect, useMemo, useState } from "react";
import { CodeOutput, GptFunction } from "../types";
import { Button, Stack, Typography } from "@mui/joy";
import { WriteTest } from "../AIFunctions/WriteTest";
import { CodeResult } from "../codeResults/CodeResult";
import { getOutputChopOffBool } from "../utils";
import { highlightTextInstructions } from "../renderHelpers";

export const TestCreatedFun: FC<{
  fun: GptFunction;
  retryGenerate: () => void;
}> = ({ fun, retryGenerate }) => {
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
      <Stack direction="row" justifyContent="space-between">
        <Typography level="h3">Write a Test</Typography>
        <Button onClick={retryGenerate} sx={{ alignSelf: "flex-end" }}>
          Didn't generate correctly?
        </Button>
      </Stack>

      <WriteTest
        fun={fun}
        setTestRes={setTestRes}
        testInstructions={testInstructions}
        codeToTest={() => fun.code}
        testResult={testResult}
      />
      <CodeResult
        codeOutput={processTestRes}
        title="Test Result"
        height="200px"
      />
    </>
  );
};
