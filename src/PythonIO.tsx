import { TextEditor } from "./TextEditor";
import { RunCode } from "./RunCode";
import { CodeResult } from "./CodeResult";
import { Stack } from "@mui/joy";
import { PythonIOProvider } from "./PyIOContext";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { Instructions } from "./Instructions";
import { ExerciseList } from "./ExerciseList";

// ["def sayHello():", '\tprint("Hello world!")'].join("\n")
function PythonIO() {
  const smallScreen = useMediaQuery("(max-width: 1500px)");
  const [initialLoad, setInitialLoad] = useState(false);
  return (
    <PythonIOProvider>
      <Stack>
        <Stack direction="row" gap="1rem" sx={{ margin: "2rem" }}>
          <Instructions />
          <ExerciseList />
        </Stack>
        <Stack
          direction={smallScreen ? "column" : "row"}
          gap="1rem"
          sx={{ margin: "2rem" }}
        >
          <TextEditor isLoaded={() => setInitialLoad(true)} />
          <RunCode initialLoad={initialLoad} />
          <CodeResult />
        </Stack>
      </Stack>
    </PythonIOProvider>
  );
}

export default PythonIO;
