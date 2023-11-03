import { TextEditor } from "../TextEditor";
import { RunCode } from "../RunCode";
import { CodeResult } from "../CodeResult";
import { Divider, Stack } from "@mui/joy";
import { PythonIOProvider } from "../pyIOContext/PythonIOProvider";
import { useState } from "react";
import { Instructions } from "../Instructions";
import { FunctionGenerator } from "../AIFunctions/FunctionGenerator";
import { GptFunctions } from "../AIFunctions/GptFunctions";

function PythonIO() {
  const [initialLoad, setInitialLoad] = useState(false);

  return (
    <PythonIOProvider>
      <Stack direction="row" width="100%" gap="1rem" sx={{ p: "2rem" }}>
        <Stack direction="column" gap="1rem">
          <Instructions />
          <TextEditor isLoaded={() => setInitialLoad(true)} />
          <RunCode initialLoad={initialLoad} />
          <CodeResult />
        </Stack>
        <Stack width="100%" gap="1rem" sx={{ maxWidth: "700px" }}>
          <FunctionGenerator />
          <Divider sx={{ my: "1rem" }} />
          <GptFunctions />
        </Stack>
      </Stack>
    </PythonIOProvider>
  );
}

export default PythonIO;