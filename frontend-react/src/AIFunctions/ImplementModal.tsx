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
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionGroup,
} from "@mui/joy";
import { GptFunction } from "../types";
import { CodeMirrorEditor } from "../textEditor/CodeMirrorEditor";
import RestoreIcon from "@mui/icons-material/Restore";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { WriteTest } from "./WriteTest";
import { useDebounce } from "../hooks/useDebounce";

export const ImplementModal: FC<{
  fun: GptFunction | null;
  closeModal: () => void;
}> = ({ fun, closeModal }) => {
  const { modifyFunction } = usePyIOContext();
  const [impl, setImpl] = useState<string>("");

  const debouncedImpl = useDebounce(impl, 1000);

  useEffect(() => {
    if (!fun) return;
    setImpl(fun.implementation);
  }, [fun]);

  useEffect(() => {
    if (!fun || !debouncedImpl) return;
    modifyFunction(fun._id, { implementation: debouncedImpl });
  }, [debouncedImpl]);

  return (
    <Modal open={!!fun} onClose={closeModal}>
      <ModalDialog sx={{ p: "2rem", width: "800px" }} size="lg">
        <ModalClose />
        <DialogTitle>Implement {fun?.def}</DialogTitle>
        <DialogContent>{fun?.explanation}</DialogContent>
        <AccordionGroup size="lg">
          <Accordion defaultExpanded>
            <AccordionSummary>Implementation</AccordionSummary>
            <AccordionDetails>
              <div style={{ height: "300px" }}>
                <CodeMirrorEditor
                  key="implement"
                  height={"300px"}
                  value={impl}
                  onChange={setImpl}
                />
              </div>
            </AccordionDetails>
          </Accordion>
          <WriteTest getImpl={() => impl} fun={fun} />
        </AccordionGroup>
        <DialogActions>
          <Button sx={{ maxWidth: "12rem" }} color="success">
            Implement
          </Button>
          <Tooltip title="Reset">
            <IconButton
              onClick={() => {
                setImpl(`${fun?.def}\n    return True` ?? "");
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
