import { IconButton, Stack, Typography } from "@mui/joy";
import CopyAll from "@mui/icons-material/CopyAll";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { FC } from "react";
import { useToast } from "../Toaster";
import { GptFunction } from "../types";

export const FunctionDef: FC<{
  gptFun: GptFunction;
  setEditing: () => void;
  setDeleting: () => void;
}> = ({ gptFun, setEditing, setDeleting }) => {
  const showToast = useToast();
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
              const defCopy = gptFun.def.split("(")[0].replace("def ", "");
              showToast({
                message: `Copied '${defCopy}' to clipboard`,
                color: "success",
              });
              navigator.clipboard.writeText(defCopy);
            }}
            sx={{ alignSelf: "flex-start", p: "3px" }}
          >
            <CopyAll />
          </IconButton>
          <Typography>{gptFun.def}</Typography>
        </Stack>
        <Stack direction="row" gap="1rem">
          <IconButton onClick={setEditing} variant="solid">
            <CreateIcon />
          </IconButton>
          <IconButton onClick={setDeleting} variant="solid" color="danger">
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
};
