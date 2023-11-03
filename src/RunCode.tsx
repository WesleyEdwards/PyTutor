import { IconButton, Stack } from "@mui/joy";
import {
  PythonError,
  runCode,
  setEngine,
  setOptions,
} from "client-side-python-runner";
import { FC, useEffect, useState } from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { usePyIOContext } from "./pyIOContext/PyIOContext";

export const RunCode: FC<{ initialLoad: boolean }> = ({ initialLoad }) => {
  const { code, setCodeOutput } = usePyIOContext();

  const [pyResult, setPyResult] = useState<string[]>([]);
  const [error, setError] = useState<PythonError>();

  const [trigger, setTrigger] = useState(0);

  const runPythonCode = async () => {
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
    setPyResult([]);
    setCodeOutput({ res: pyResult, error });
  }, [trigger]);

  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "flex-end", minWidth: "2rem", mb: "1rem" }}
    >
      <IconButton
        variant="solid"
        onClick={runPythonCode}
        disabled={!initialLoad}
        sx={{
          maxWidth: "12rem",
          backgroundColor: "#0b5c04",
          transition: "background-color 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: "#198908",
          },
        }}
      >
        <PlayArrowRoundedIcon />
      </IconButton>
    </Stack>
  );
};
