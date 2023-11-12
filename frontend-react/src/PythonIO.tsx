import { RunCode } from "./codeResults/RunCode";
import { Divider, Stack } from "@mui/joy";
import { Instructions } from "./Instructions";
import { GptFunctions } from "./AIFunctions/GptFunctions";
import { GenerateFunModal } from "./generateFunction/GenerateFunModal";
import { MainEditor } from "./textEditor/MainEditor";
import { MainCodeResult } from "./codeResults/MainCodeResult";
import { useMediaQuery } from "@mui/material";

function PythonIO() {
  const smallScreen = useMediaQuery("(max-width: 900px)");
  return (
    <Stack
      direction={smallScreen ? "column-reverse" : "row"}
      width="100%"
      gap="1rem"
      sx={{ p: "2rem" }}
    >
      <Stack direction="column" gap="1rem" flex={1}>
        <MainEditor />
        <RunCode />
        <MainCodeResult />
      </Stack>
      <Stack width="100%" gap="1rem" sx={{ maxWidth: "28rem" }} flex={1}>
        <Instructions />
        <GenerateFunModal />
        <Divider sx={{ my: "1rem" }} />
        <GptFunctions />
      </Stack>
    </Stack>
  );
}

export default PythonIO;
