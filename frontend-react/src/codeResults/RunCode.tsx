import { IconButton, Stack, Tooltip } from "@mui/joy";
import { FC, useEffect, useState } from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { processMainError } from "../utils";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { useRunPython } from "../hooks/useRunPython";

export const RunCode: FC = () => {
  const { code, appendOutput, setOutputError, gptFunctions } = usePyIOContext();

  const [runFromKeyBoard, setRunFromKeyBoard] = useState(false);

  const createRunnableCode = (code: string): string => {
    const gptCode = gptFunctions.reduce((acc, gptFunction) => {
      return gptFunction.implemented
        ? acc.concat(gptFunction.implementation)
        : acc.concat(gptFunction.code);
    }, "");
    return gptCode.concat(code);
  };

  const { runPythonCode } = useRunPython({
    appendOutput,
    onError: (e) => {
      setOutputError(processMainError(e, code, createRunnableCode(code)));
    },
    getRunnable: () => createRunnableCode(code),
  });

  const runMainCode = () => {
    setOutputError(undefined);
    runPythonCode();
  };

  useEffect(() => {
    if (runFromKeyBoard) {
      runMainCode();
    }
    setRunFromKeyBoard(false);
  }, [runFromKeyBoard]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "Enter") {
        setRunFromKeyBoard(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "flex-end", minWidth: "2rem" }}
    >
      <Tooltip size="sm" variant="soft" title="Run Code (Ctrl + Shift + Enter)">
        <IconButton
          variant="solid"
          onClick={runMainCode}
          sx={{
            backgroundColor: "#0b5c04",
            transition: "background-color 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "#198908",
            },
          }}
        >
          <PlayArrowRoundedIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
