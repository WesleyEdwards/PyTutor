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
          <DialogContent>
            Write a program that prints the numbers from 1 to 100. But for
            multiples of three print “Fizz” instead of the number and for the
            multiples of five print “Buzz”. For numbers which are multiples of
            both three and five print “FizzBuzz”.
          </DialogContent>
        </ModalDialog>
      </Modal>
    </>
  );
};
