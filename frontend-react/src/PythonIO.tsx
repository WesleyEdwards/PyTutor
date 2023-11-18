import { Stack, Typography } from "@mui/joy";
import { GptFunctions } from "./AIFunctions/GptFunctions";
import { GenerateFunModal } from "./generateFunction/GenerateFunModal";
import { MainEditor } from "./textEditor/MainEditor";
import { useMediaQuery } from "@mui/material";
import { RunCode } from "./codeResults/RunCode";
import { MainCodeResult } from "./codeResults/MainCodeResult";
import { SubmitAssignment } from "./AIFunctions/SubmitAssignment";

function PythonIO() {
  const smallScreen = useMediaQuery("(max-width: 1200px)");
  return (
    <Stack padding="1rem">
      <Stack direction={smallScreen ? "column" : "row"} gap="1rem">
        <Stack gap="1rem" width="100%" flex={4}>
          <Stack direction="row" justifyContent="space-between">
            <Typography level="h4">My Functions</Typography>
            <GenerateFunModal />
          </Stack>
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
      <SubmitAssignment />
    </Stack>
  );
}

export default PythonIO;
