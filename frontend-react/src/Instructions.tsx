import {
  Button,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import { Description } from "@mui/icons-material";
import { FC, useState } from "react";
import { currentAssignment } from "./assignmentInfo";

export const Instructions: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="soft"
        onClick={() => setOpen(true)}
        startDecorator={<Description />}
      >
        Assignment
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalClose />
          <DialogTitle>Assignment</DialogTitle>
          <DialogContent>{currentAssignment.description}</DialogContent>
        </ModalDialog>
      </Modal>
    </>
  );
};
