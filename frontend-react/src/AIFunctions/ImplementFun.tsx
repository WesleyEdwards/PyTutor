import { FC, useEffect, useState } from "react";
import { Typography, Stack } from "@mui/joy";
import { GptFunction } from "../types";
import { CodeMirrorEditor } from "../textEditor/CodeMirrorEditor";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { useDebounce } from "../hooks/useDebounce";

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
      <Typography>{fun?.explanation}</Typography>
      <CodeMirrorEditor
        key="implement"
        height={"300px"}
        value={impl}
        onChange={setImpl}
      />

      {/* {!writingTest && (
        <>
          <Typography level="body-sm">
            When you've written the function and are ready, write a test to make
            sure it works as intended
          </Typography>
          <Button
            onClick={openTestSection}
            color="success"
            sx={{ maxWidth: "12rem", alignSelf: "flex-end" }}
          >
            Write Test
          </Button>
        </>
      )} */}
    </Stack>
  );
};
