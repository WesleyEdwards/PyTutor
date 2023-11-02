import { Button, IconButton, Stack } from "@mui/joy";
import { runCode, setEngine, setOptions } from "client-side-python-runner";
import { FC, useEffect, useState } from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { usePyIOContext } from "./PyIOContext";
import { exercisesMod } from "./exercises/phanon-mod";

export const RunCode: FC<{ initialLoad: boolean }> = ({ initialLoad }) => {
  const {
    code,
    gradeResult,
    setError,
    codeResult,
    setCurrExercise,
    currExercise,
  } = usePyIOContext();

  const [pyResult, setPyResult] = useState<string[]>([]);

  const [trigger, setTrigger] = useState(0);

  const runPythonCode = async () => {
    setPyResult([]);
    await runCode(code);
    setTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    setEngine("pyodide");
    setOptions({
      output: (data) => {
        setError(undefined);
        setPyResult((prev) => prev.concat(data.replace("\n", "")));
      },
      error: (e) => {
        setError(e);
      },
    });
  }, []);

  useEffect(() => {
    gradeResult(pyResult);
  }, [trigger]);

  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "flex-end", minWidth: "2rem", mb: "1rem" }}
    >
      {codeResult.pass ? (
        <Button
          onClick={() => {
            setCurrExercise(
              exercisesMod[
                (exercisesMod.findIndex((x) => x.id === currExercise.id) ?? 0) +
                  1
              ]
            );
          }}
        >
          Next
        </Button>
      ) : (
        <IconButton
          variant="solid"
          onClick={runPythonCode}
          disabled={!initialLoad}
          sx={{
            maxWidth: "12rem",
          }}
        >
          <PlayArrowRoundedIcon />
        </IconButton>
      )}
    </Stack>
  );
};
