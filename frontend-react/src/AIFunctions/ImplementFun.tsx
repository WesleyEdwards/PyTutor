import { FC, useEffect, useState } from "react";
import { Typography, Stack } from "@mui/joy";
import { GptFunction } from "../types";
import { CodeMirrorEditor } from "../textEditor/CodeMirrorEditor";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { useDebounce } from "../hooks/useDebounce";

export const ImplementFun: FC<{
  fun: GptFunction;
}> = ({ fun }) => {
  const { updateFuns } = usePyIOContext();
  const [impl, setImpl] = useState<string>("");

  const debouncedImpl = useDebounce(impl, 500);

  useEffect(() => {
    setImpl(fun.implementation);
  }, [fun]);

  useEffect(() => {
    if (!fun || !debouncedImpl) return;
    updateFuns("modify", {
      id: fun._id,
      mod: { implementation: debouncedImpl },
    });
  }, [debouncedImpl]);

  return (
    <Stack width="100%">
      <Typography level="body-sm" sx={{ fontStyle: "italic", pb: "0.5rem" }}>
        {fun?.explanation}
      </Typography>
      <CodeMirrorEditor key="implement" value={impl} onChange={setImpl} />
    </Stack>
  );
};
