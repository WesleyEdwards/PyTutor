import { useEffect, useState } from "react";
import { Editor } from "./Editor";
import { RunCode } from "./RunCode";
import { CodeResult } from "./CodeResult";
import { Stack, useColorScheme } from "@mui/joy";

// ["def sayHello():", '\tprint("Hello world!")'].join("\n")
function PythonIO() {
  const [code, setCode] = useState<string>(`print("Hello world!")`);
  const [codeResult, setCodeResult] = useState<string>("");

  return (
    <Stack
      direction="row"
      gap="2rem"
      sx={{
        margin: "2rem",
      }}
    >
      <Editor code={code} changeCode={setCode} />
      <RunCode code={code} setCodeResult={setCodeResult} />
      <CodeResult codeResult={codeResult} />
    </Stack>
  );
}

export default PythonIO;
