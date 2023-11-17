import { FC, useEffect, useState } from "react";
import {
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ModalClose,
  Textarea,
  Stack,
  Typography,
} from "@mui/joy";
import { GptFunction } from "../types";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { extractFunctionName } from "../utils";
import { highlightVariables, highlightedText } from "../renderHelpers";

export const RenameModal: FC<{
  fun: GptFunction | null;
  closeModal: () => void;
}> = ({ fun, closeModal }) => {
  const { updateFuns } = usePyIOContext();
  const [newName, setNewName] = useState("");

  const onRename = () => {
    if (!fun) return;
    closeModal();
    updateFuns("rename", { id: fun._id, newName });
  };

  useEffect(() => {
    setNewName(extractFunctionName(fun?.def) ?? "");
  }, [fun?._id]);

  return (
    <Modal open={!!fun} onClose={closeModal}>
      <ModalDialog variant="outlined" role="alertdialog">
        <ModalClose />
        <DialogTitle sx={{ marginRight: "3rem" }}>
          Rename {extractFunctionName(fun?.def)}
        </DialogTitle>
        <DialogContent>
          <Stack
            direction="row"
            alignItems="center"
            gap="1rem"
            marginTop="2rem"
          >
            <Typography>{highlightedText("def", "keyword")}</Typography>
            <Textarea
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <Stack direction="row" gap="3px">
              ({fun?.def && highlightVariables(fun.def)})
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="soft" onClick={onRename}>
            Save
          </Button>
          <Button variant="plain" color="neutral" onClick={closeModal}>
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};
