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
import { DeleteForever } from "@mui/icons-material";

export const DeletingModal: FC<{
  fun: GptFunction | null;
  closeModal: () => void;
}> = ({ fun, closeModal }) => {
  const { updateFuns } = usePyIOContext();

  const onDelete = () => {
    if (!fun) return;
    closeModal();
    updateFuns("remove", fun);
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
          <Button
            startDecorator={<DeleteForever />}
            variant="soft"
            color="danger"
            onClick={onDelete}
          >
            Delete
          </Button>
          <Button variant="plain" color="neutral" onClick={closeModal}>
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};
