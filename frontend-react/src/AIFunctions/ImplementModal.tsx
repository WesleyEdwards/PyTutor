import { FC, useEffect, useState } from "react";
import {
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  ModalClose,
  DialogActions,
  Button,
  IconButton,
  Tooltip,
} from "@mui/joy";
import { GptFunction } from "../types";
import { CodeMirrorEditor } from "../textEditor/CodeMirrorEditor";
import RestoreIcon from "@mui/icons-material/Restore";
import { usePyIOContext } from "../pyIOContext/PyIOContext";

export const ImplementModal: FC<{
  fun: GptFunction | null;
  closeModal: () => void;
}> = ({ fun, closeModal }) => {
  const { defineGptFunction } = usePyIOContext();
  const [impl, setImpl] = useState<string>("");
  const [debouncedImpl, setDebouncedImpl] = useState<string>("");

  useEffect(() => {
    if (!fun || !debouncedImpl) return;
    defineGptFunction(fun._id, debouncedImpl);
  }, [debouncedImpl]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedImpl(impl);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [impl]);

  return (
    <Modal open={!!fun} onClose={closeModal}>
      <ModalDialog sx={{ p: "2rem", width: "800px" }} size="lg">
        <ModalClose />
        <DialogTitle>Implement {fun?.def}</DialogTitle>
        <DialogContent>{fun?.explanation}</DialogContent>
        <div style={{ height: "300px" }}>
          <CodeMirrorEditor
            key="implement"
            height={"300px"}
            value={impl}
            onChange={setImpl}
          />
        </div>
        <DialogActions>
          <Button sx={{ maxWidth: "12rem" }} color="success">
            Implement
          </Button>
          <Tooltip title="Reset">
            <IconButton
              onClick={() => {
                setImpl(fun?.def ?? "");
              }}
            >
              <RestoreIcon />
            </IconButton>
          </Tooltip>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};
