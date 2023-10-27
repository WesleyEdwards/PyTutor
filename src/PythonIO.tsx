import { TextEditor } from "./TextEditor";
import { RunCode } from "./RunCode";
import { CodeResult } from "./CodeResult";
import { Stack } from "@mui/joy";
import { PythonIOProvider } from "./PyIOContext";
import { useState } from "react";

// ["def sayHello():", '\tprint("Hello world!")'].join("\n")
function PythonIO() {
  const [initialLoad, setInitialLoad] = useState(false);
  return (
    <PythonIOProvider>
      <Stack
        direction="row"
        gap="1rem"
        sx={{
          margin: "2rem",
        }}
      >
        <TextEditor isLoaded={() => setInitialLoad(true)} />
        <RunCode initialLoad={initialLoad} />
        <CodeResult />
      </Stack>
    </PythonIOProvider>
  );
}

export default PythonIO;
