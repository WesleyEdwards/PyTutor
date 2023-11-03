import { IconButton, Stack, Typography } from "@mui/joy";
import CopyAll from "@mui/icons-material/CopyAll";
import CreateIcon from "@mui/icons-material/Create";
import { FC, useState } from "react";
import { GptFunction } from "../pyIOContext/PythonIOProvider";

export const FunctionDef: FC<{
  gptFun: GptFunction;
  setEditing: () => void;
}> = ({ gptFun, setEditing }) => {
  return (
    <>
      <Stack
        direction="row"
        paddingY="1rem"
        justifyContent="space-between"
        width="100%"
      >
        <Stack direction="row" alignItems="center" gap="1rem">
          <IconButton
            onClick={() => {
              navigator.clipboard.writeText(
                gptFun.def.split("(")[0].replace("def ", "")
              );
            }}
            sx={{ alignSelf: "flex-start", p: "3px" }}
          >
            <CopyAll />
          </IconButton>
          <Typography>{gptFun.def}</Typography>
        </Stack>
        <IconButton onClick={setEditing} variant="solid">
          <CreateIcon />
        </IconButton>
      </Stack>
    </>
  );
};
