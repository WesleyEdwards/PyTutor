import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Stack,
  Typography,
  IconButton,
} from "@mui/joy";
import { FC, useEffect, useState } from "react";
import { CodeMirrorEditor } from "../textEditor/CodeMirrorEditor";
import { useDebounce } from "../hooks/useDebounce";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { GptFunction } from "../types";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useRunPython } from "../hooks/useRunPython";

export const WriteTest: FC<{
  fun: GptFunction | null;
  getImpl: () => string;
}> = ({ fun, getImpl }) => {
  const { modifyFunction } = usePyIOContext();

  const [testCode, setTestCode] = useState<string>(fun?.test || "");
  const [testResult, setTestResult] = useState<boolean>();
  const [outputError, setOutputError] = useState<string>();

  const debouncedTestCode = useDebounce(testCode, 1000);

  const createRunnableTestCode = () => {
    const callTest = debouncedTestCode
      .split("\n")[0]
      .replace("def ", "")
      .replace(":", "");
    return `${getImpl()}\n${debouncedTestCode}\nprint(${callTest})`;
  };

  useEffect(() => {
    if (!fun || !debouncedTestCode) return;
    modifyFunction(fun._id, { test: debouncedTestCode });
  }, [debouncedTestCode]);

  const { runPythonCode } = useRunPython({
    key: `${fun?._id}-test`,
    appendOutput: (data) => {
      setOutputError(undefined);
      setTestResult(data?.includes("True"));
    },
    onError: (e) => {
      setOutputError((e?.error as unknown as string) ?? "");
    },
    getRunnable: () => createRunnableTestCode(),
  });

  return (
    <Accordion>
      <AccordionSummary>Write a test</AccordionSummary>
      <AccordionDetails>
        <Stack gap="1rem">
          <Typography level="body-sm">
            The test should return true only if the function produces the
            correct behavior
          </Typography>
          <div style={{ height: "300px" }}>
            <CodeMirrorEditor
              key="implement"
              height={"300px"}
              value={testCode}
              onChange={setTestCode}
            />
          </div>
          <IconButton
            variant="solid"
            onClick={runPythonCode}
            sx={{
              alignSelf: "flex-end",
              backgroundColor: "#0b5c04",
              transition: "background-color 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "#198908",
              },
            }}
          >
            <PlayArrowRoundedIcon />
          </IconButton>

          {testResult !== undefined && !outputError && (
            <Alert color={testResult ? "success" : "danger"}>
              {testResult ? "Test Passed" : "Test Failed"}
            </Alert>
          )}

          {outputError && <Alert color="danger">{outputError}</Alert>}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
