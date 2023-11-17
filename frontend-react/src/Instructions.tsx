import {
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import { Description } from "@mui/icons-material";
import { FC, useState } from "react";

const instructions = {
  genes: (
    <DialogContent>
      This program processes DNA sequences.
      <ul>
        <li>
          A sequence will be made up of letters <b>A, C, T, and G</b>. ALl
          others should be ignored.
        </li>
        <li>
          a sequence starts after the sequence <b>ATG</b>
        </li>
        <li>Sequences will be Multiple of 3</li>
      </ul>
      <Divider />
      Example: "TTATGTTTTAAGGATGGGGCGTTAGTT" should print the following:
      <br />
      ---
      <br /> TTATGTTTTAAGGATGGGGCGTTAGTT
      <br /> TTT <br />
      GGGCGT
      <br /> ---
    </DialogContent>
  ),
  speech: (
    <DialogContent>
      Write a program that revises speeches. In order to make the speech better,
      do the following:
      <ul>
        <li>Remove all usages of 'umm' and 'I guess'</li>
        <li>Add an exclamation point at the end of the speech!</li>
      </ul>
      Print the following:
      <ul>
        <li>How many times I was going to use the word 'umm'</li>
        <li>How many times I was going to use the phrase 'I guess'</li>
        <li>The speech with the modifications specified above.</li>
      </ul>
      <Divider />
      Example:
      <br />
      Initial Speech:
      <br />
      <code>
        This umm I guess is umm my thrilling umm speech I guess I will give
      </code>
      <br />
      Output:
      <br />
      -------------
      <br />
      <code>
        umm: 3<br />
        I guess: 2<br />
        This is my thrilling speech!
      </code>
      -------------
    </DialogContent>
  ),
};

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
          {instructions.speech}
        </ModalDialog>
      </Modal>
    </>
  );
};
