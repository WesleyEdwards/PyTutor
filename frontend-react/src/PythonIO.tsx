import { Divider, Stack } from "@mui/joy";
import { GptFunctions } from "./AIFunctions/GptFunctions";
import { GenerateFunModal } from "./generateFunction/GenerateFunModal";
import { MainEditor } from "./textEditor/MainEditor";
import { useMediaQuery } from "@mui/material";
import { RunCode } from "./codeResults/RunCode";
import { MainCodeResult } from "./codeResults/MainCodeResult";

function PythonIO() {
  const smallScreen = useMediaQuery("(max-width: 1200px)");
  return (
    <Stack direction={smallScreen ? "column" : "row"} gap="1rem" padding="1rem">
      <Stack gap="1rem" width="100%" flex={4}>
        <GenerateFunModal />
        <GptFunctions />
        <RunCode />
        <MainEditor />
      </Stack>

      <Stack
        gap="1rem"
        width="100%"
        overflow="auto"
        justifyContent="flex-end"
        flex={3}
      >
        <MainCodeResult />
      </Stack>
    </Stack>
  );
}

export default PythonIO;
