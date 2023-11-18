import { Check } from "@mui/icons-material";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import { useState } from "react";
import { usePyIOContext } from "../hooks/usePyIOContext";

export const SubmitAssignment = () => {
  const [modal, setModal] = useState(false);
  const { gptFunctions } = usePyIOContext();

  const completed = gptFunctions.every((fn) => fn.implemented);

  return (
    <>
      <Button
        color="success"
        sx={{ mt: "1rem", alignSelf: "flex-end" }}
        endDecorator={<Check />}
        onClick={() => setModal(true)}
      >
        Submit
      </Button>
      <Modal open={modal} onClose={() => setModal(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <ModalClose onClick={() => setModal(false)} />
          <DialogTitle sx={{ marginRight: "3rem" }}>
            {completed ? "Good Job!" : "Keep Going"}
          </DialogTitle>
          <DialogContent sx={{ gap: "1rem", mt: "1rem" }}>
            <Typography>
              {completed
                ? "Assuming that you completed the assignment correctly, you should feel very accomplished!"
                : "Not all of the functions have been implemented yet. Keep going!"}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setModal(false)}
            >
              Close
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
};
