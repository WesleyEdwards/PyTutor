import { IconButton, Stack, Tooltip } from "@mui/joy";
import { FC } from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useRunCode } from "./runCode/useRunCode";

export const RunCode: FC = () => {
  const { runMainCode } = useRunCode();
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
