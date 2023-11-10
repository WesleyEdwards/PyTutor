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

export const DeletingModal: FC<{
  fun: GptFunction | null;
  closeModal: () => void;
}> = ({ fun, closeModal }) => {
  const { removeGptFunction } = usePyIOContext();

  const onDelete = () => {
    if (!fun) return;
    closeModal();
    removeGptFunction(fun);
  };

  return (
    <Modal open={!!fun} onClose={closeModal}>
      <ModalDialog variant="outlined" role="alertdialog">
        <ModalClose />
        <DialogTitle>{fun?.def}</DialogTitle>
        <DialogContent>
          Are you sure you want to remove this function?
        </DialogContent>
        <DialogActions>
          <Button variant="solid" color="danger" onClick={onDelete}>
            Discard
          </Button>
          <Button variant="plain" color="neutral" onClick={closeModal}>
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};
