import { FC, useEffect, useState } from "react";
import { Typography, Stack } from "@mui/joy";
import { GptFunction } from "../types";
import { CodeMirrorEditor } from "../textEditor/CodeMirrorEditor";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { useDebounce } from "../hooks/useDebounce";
import { highlightFunSignature } from "../renderHelpers";

export const ImplementFun: FC<{
  fun: GptFunction;
}> = ({ fun }) => {
  const { modifyFunction } = usePyIOContext();
  const [impl, setImpl] = useState<string>("");

  const debouncedImpl = useDebounce(impl, 500);

  useEffect(() => {
    setImpl(fun.implementation);
  }, [fun]);

  useEffect(() => {
    if (!fun || !debouncedImpl) return;
    modifyFunction(fun._id, { implementation: debouncedImpl });
  }, [debouncedImpl]);

  return (
    <Stack gap="1rem" width="100%">
      <Typography sx={{ fontStyle: "italic" }}>{fun?.explanation}</Typography>
      <CodeMirrorEditor
        key="implement"
        height={"300px"}
        value={impl}
        onChange={setImpl}
      />
    </Stack>
  );
};
