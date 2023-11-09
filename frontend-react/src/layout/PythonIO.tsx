import { RunCode } from "../RunCode";
import { CodeResult } from "../CodeResult";
import { Divider, Stack } from "@mui/joy";
import { Instructions } from "../Instructions";
import { GptFunctions } from "../AIFunctions/GptFunctions";
import { GenerateFunModal } from "./generateFunction/GenerateFunModal";
import { MainEditor } from "../textEditor/MainEditor";

function PythonIO() {
  return (
    <Stack direction="row" width="100%" gap="1rem" sx={{ p: "2rem" }}>
      <Stack direction="column" gap="1rem">
        <Instructions />
        <MainEditor />
        <RunCode />
        <CodeResult />
      </Stack>
      <Stack width="100%" gap="1rem" sx={{ maxWidth: "24rem" }}>
        <GenerateFunModal />
        <Divider sx={{ my: "1rem" }} />
        <GptFunctions />
      </Stack>
    </Stack>
  );
}

export default PythonIO;
