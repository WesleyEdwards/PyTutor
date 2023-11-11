import { Stack, Typography, Button } from "@mui/joy";
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
}> = ({ fun, setTestRes }) => {
  const { modifyFunction, gptFunctions } = usePyIOContext();
  const [testCode, setTestCode] = useState<string>(fun.test);
  

  const debouncedTestCode = useDebounce(testCode, 500);

  const getImpl = () => {
    return gptFunctions.find((f) => f._id === fun._id)?.implementation ?? "";
  };

  const createRunnableTestCode = () => {
    const callTest = extractFunctionName(testCode);
    return `${getImpl()}\n${testCode}\nprint(${callTest}())`;
  };

  useEffect(() => {
    if (!debouncedTestCode) return;
    modifyFunction(fun._id, { test: debouncedTestCode });
  }, [debouncedTestCode]);

  const { runPythonCode } = useRunPython({
    appendOutput: (data) => {
      if (!data) return setTestRes((prev) => ({ ...prev, res: "" }));
      setTestRes((prev) => ({
        res: prev.res.concat(data),
        error: undefined,
      }));
    },
    onError: (e) => {
      setTestRes({ res: "", error: processTestError(e, getImpl()) });
    },
    getRunnable: createRunnableTestCode,
  });

  return (
    <Stack gap="1rem" width="100%">
      <Typography level="h2">Write a test</Typography>
      <Typography height="4rem" overflow="auto">
        The test should return True if the function produces the correct
        behavior
      </Typography>
      <div style={{ height: "300px" }}>
        <CodeMirrorEditor
          key="implement"
          height={"300px"}
          value={testCode}
          onChange={setTestCode}
        />
      </div>
      <Button
        variant="solid"
        onClick={runPythonCode}
        endDecorator={<PlayArrowRoundedIcon />}
        sx={{
          alignSelf: "flex-end",
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
  );
};
