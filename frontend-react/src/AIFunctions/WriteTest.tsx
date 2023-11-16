import { Stack, Button, Alert } from "@mui/joy";
import { FC, useEffect, useMemo, useState } from "react";
import { CodeMirrorEditor } from "../textEditor/CodeMirrorEditor";
import { useDebounce } from "../hooks/useDebounce";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { CodeOutput, GptFunction } from "../types";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useRunPython } from "../hooks/useRunPython";
import { extractFunctionName, processTestError } from "../utils";
import { Check, Close } from "@mui/icons-material";

export type TestFunction = {
  _id: string;
  defCode: string;
  length: number;
  def: string;
};

export const WriteTest: FC<{
  fun: GptFunction;
  setTestRes: React.Dispatch<React.SetStateAction<CodeOutput>>;
  testInstructions: React.ReactNode;
  testResult: boolean | undefined;
  codeToTest: "implementation" | "code";
}> = ({ fun, setTestRes, testInstructions, codeToTest, testResult }) => {
  const { updateFuns, gptFunctions } = usePyIOContext();
  const [testCode, setTestCode] = useState<string>(fun.test);

  const debouncedTestCode = useDebounce(testCode, 500);

  const functions: TestFunction[] = useMemo(
    () =>
      gptFunctions.map((f) => {
        if (f._id === fun._id) {
          return {
            _id: f._id,
            def: f.def,
            defCode: f[codeToTest],
            length: f[codeToTest].split("\n").length,
          };
        }
        const code = f.implemented ? f.implementation : f.code;
        return {
          _id: f._id,
          def: f.def,
          defCode: code,
          length: code.split("\n").length,
        };
      }),
    [fun._id, codeToTest]
  );

  const createRunnableTestCode = () => {
    const callTest = extractFunctionName(testCode);
    const funs = functions.map((f) => f.defCode).join("\n");
    return `${funs}\n${testCode}\nprint(${callTest}())`;
  };

  useEffect(() => {
    if (!debouncedTestCode) return;
    updateFuns("modify", { id: fun._id, mod: { test: debouncedTestCode } });
  }, [debouncedTestCode]);

  const { runPythonCode } = useRunPython({
    appendOutput: (data) => {
      if (!data) return setTestRes((prev) => ({ ...prev, res: "" }));
      setTestRes((prev) => ({ res: prev.res.concat(data), error: undefined }));
    },
    onError: (e) => {
      setTestRes({ res: "", error: processTestError(e, functions) });
    },
    getRunnable: createRunnableTestCode,
  });

  return (
    <Stack gap="1rem" width="100%">
      {testInstructions}
      <CodeMirrorEditor
        key="implement"
        height="20rem"
        value={testCode}
        onChange={setTestCode}
      />
      <Stack
        direction="row"
        gap="1rem"
        justifyContent="flex-end"
        alignItems="center"
        height="3rem"
      >
        {testResult !== undefined && (
          <Alert
            sx={{ width: "100%" }}
            color={testResult ? "success" : "danger"}
            startDecorator={testResult ? <Check /> : <Close />}
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
