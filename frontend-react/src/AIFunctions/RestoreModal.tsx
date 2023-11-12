import { FC } from "react";
import {
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ModalClose,
} from "@mui/joy";
import { GptFunction } from "../types";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { Restore } from "@mui/icons-material";
import { getInitialValuesFromDef } from "../utils";
import { highlightFunSignature } from "../renderHelpers";

export const RestoreModal: FC<{
  fun: GptFunction | null;
  closeModal: () => void;
}> = ({ fun, closeModal }) => {
  const { modifyFunction } = usePyIOContext();

  return (
    <Modal open={!!fun} onClose={closeModal}>
      <ModalDialog variant="outlined" role="alertdialog">
        <ModalClose />
        <DialogTitle>{fun && highlightFunSignature(fun)}</DialogTitle>
        <DialogContent>
          By restoring this function, you will lose all the changes you have
          made to the implementation and test you have made.
        </DialogContent>
        <DialogActions>
          <Button
            startDecorator={<Restore />}
            variant="soft"
            color="warning"
            onClick={() => {
              if (!fun) return;
              closeModal();
              modifyFunction(fun._id, getInitialValuesFromDef(fun.def));
            }}
          >
            Restore
          </Button>
          <Button variant="plain" color="neutral" onClick={closeModal}>
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};
