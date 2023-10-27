import { TextEditor } from "./TextEditor";
import { RunCode } from "./RunCode";
import { CodeResult } from "./CodeResult";
import { Stack } from "@mui/joy";
import { PythonIOProvider } from "./PyIOContext";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";

// ["def sayHello():", '\tprint("Hello world!")'].join("\n")
function PythonIO() {
  const smallScreen = useMediaQuery("(max-width: 1500px)");
  const [initialLoad, setInitialLoad] = useState(false);
  return (
    <PythonIOProvider>
      <Stack
        direction={smallScreen ? "column" : "row"}
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
