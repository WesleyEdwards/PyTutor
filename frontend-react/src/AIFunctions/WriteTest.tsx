import { Stack, Button, Alert } from "@mui/joy";
import { FC, useEffect, useState } from "react";
import { CodeMirrorEditor } from "../textEditor/CodeMirrorEditor";
import { useDebounce } from "../hooks/useDebounce";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { CodeOutput, GptFunction } from "../types";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useRunPython } from "../hooks/useRunPython";
import { extractFunctionName, processTestError } from "../utils";

export const WriteTest: FC<{
  fun: GptFunction;
  setTestRes: React.Dispatch<React.SetStateAction<CodeOutput>>;
  testInstructions: React.ReactNode;
  testResult: boolean | undefined;
  codeToTest: () => string;
}> = ({ fun, setTestRes, testInstructions, codeToTest, testResult }) => {
  const { modifyFunction } = usePyIOContext();
  const [testCode, setTestCode] = useState<string>(fun.test);

  const debouncedTestCode = useDebounce(testCode, 500);

  const createRunnableTestCode = () => {
    const callTest = extractFunctionName(testCode);
    return `${codeToTest()}\n${testCode}\nprint(${callTest}())`;
  };

  useEffect(() => {
    if (!debouncedTestCode) return;
    modifyFunction(fun._id, { test: debouncedTestCode });
  }, [debouncedTestCode]);

  const { runPythonCode } = useRunPython({
    appendOutput: (data) => {
      if (!data) return setTestRes((prev) => ({ ...prev, res: "" }));
      setTestRes((prev) => ({ res: prev.res.concat(data), error: undefined }));
    },
    onError: (e) => {
      setTestRes({ res: "", error: processTestError(e, codeToTest()) });
    },
    getRunnable: createRunnableTestCode,
  });

  return (
    <Stack gap="1rem" mb="1rem" width="100%">
      {testInstructions}
      <CodeMirrorEditor
        key="implement"
        value={testCode}
        onChange={setTestCode}
      />
      <Stack
        direction="row"
        gap="1rem"
        justifyContent="flex-end"
        alignItems="center"
      >
        {testResult !== undefined && (
          <Alert
            sx={{ width: "100%" }}
            color={testResult ? "success" : "danger"}
          >
            {testResult ? "Test Passed" : "Test Failed"}
          </Alert>
        )}
        <Button
          variant="solid"
          onClick={runPythonCode}
          endDecorator={<PlayArrowRoundedIcon />}
          sx={{
            minWidth: "8rem",
            backgroundColor: "#0b5c04",
            transition: "background-color 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "#198908",
            },
          }}
        >
          Run Test
        </Button>
      </Stack>
    </Stack>
  );
};
