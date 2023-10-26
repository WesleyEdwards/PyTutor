import { IconButton } from "@mui/joy";
import { runCode, setEngine, setOptions } from "client-side-python-runner";
import { FC, useEffect, useState } from "react";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

export const RunCode: FC<{
  code: string;
  setCodeResult: (res: string) => void;
}> = ({ code, setCodeResult }) => {
  const [pyResult, setPyResult] = useState<string>("");

  const [trigger, setTrigger] = useState(0);

  const runPythonCode = async () => {
    setPyResult("");
    await runCode(code);
    setTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    setEngine("pyodide");
    setOptions({
      output: (data) => {
        setPyResult((prev) => [prev, data].join(""));
      },
    });
  }, []);

  useEffect(() => {
    setCodeResult(pyResult);
  }, [trigger]);

  return (
    <IconButton
      variant="solid"
      onClick={runPythonCode}
      sx={{
        alignSelf: "flex-end",
        maxWidth: "12rem",
      }}
    >
      <PlayArrowRoundedIcon />
    </IconButton>
  );
};
