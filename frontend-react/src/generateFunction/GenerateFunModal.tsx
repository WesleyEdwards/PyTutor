import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import { useState } from "react";
import { BasicExplanation } from "./BasicExplanation";
import { GptFunction } from "../types";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { TestCreatedFun } from "./TestCreatedFun";

export type GenError = "repeatName" | "unableToGenerate" | "noExplanation";

export const GenerateFunModal = () => {
  const { addGptFunction } = usePyIOContext();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<GenError>();
  const [createdFun, setCreatedFun] = useState<GptFunction>();

  const onClose = () => {
    setCreatedFun(undefined);
    setOpen(false);
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>Create a Function</Button>
      <Modal open={open} onClose={onClose}>
        <ModalDialog sx={{ p: "2rem" }} size="lg" minWidth="64rem">
          <ModalClose />
          <DialogContent>
            {createdFun ? (
              <TestCreatedFun fun={createdFun} />
            ) : (
              <BasicExplanation
                createFun={(fun) => {
                  addGptFunction(fun);
                  setCreatedFun(fun);
                }}
                setError={setError}
              />
            )}

            {error && (
              <Alert color="warning">
                {
                  (
                    {
                      repeatName:
                        "You've already generated a function for that.",
                      unableToGenerate:
                        "Sorry, we couldn't generate a function for that. Please try again.",
                      noExplanation: "Please provide an explanation.",
                    } satisfies Record<GenError, string>
                  )[error]
                }
              </Alert>
            )}
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogActions> */}
        </ModalDialog>
      </Modal>
    </>
  );
};
