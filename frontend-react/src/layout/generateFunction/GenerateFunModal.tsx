import { Button, Modal, ModalDialog } from "@mui/joy";
import { useState } from "react";
import { FunctionGenerator } from "../../AIFunctions/FunctionGenerator";

export const GenerateFunModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create a Function</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog sx={{ p: "2rem" }} size="lg" minWidth={"64rem"}>
          <FunctionGenerator handleClose={() => setOpen(false)} />
        </ModalDialog>
      </Modal>
    </>
  );
};
