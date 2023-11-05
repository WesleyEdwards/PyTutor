import { FC, useState } from "react";
import {
  Modal,
  ModalDialog,
  FormControl,
  Textarea,
  DialogTitle,
  DialogContent,
  ModalClose,
} from "@mui/joy";
import { GptFunction } from "../types";

export const ImplementModal: FC<{
  fun: GptFunction | null;
  closeModal: () => void;
}> = ({ fun, closeModal }) => {
  const [implementation, setImplementation] = useState<string>();

  return (
    <Modal open={!!fun} onClose={closeModal}>
      <ModalDialog sx={{ p: "2rem", minWidth: "600px" }}>
        <ModalClose />
        <DialogTitle>Implement {fun?.def}</DialogTitle>
        <DialogContent>{fun?.explanation}</DialogContent>
        <FormControl>
          <Textarea
            minRows={6}
            value={implementation}
            onChange={(event) => setImplementation(event.target.value)}
            placeholder="Explanation"
          />
        </FormControl>
      </ModalDialog>
    </Modal>
  );
};
