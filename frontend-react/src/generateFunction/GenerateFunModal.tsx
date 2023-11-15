import {
  Alert,
  Button,
  DialogContent,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import { useState } from "react";
import { BasicExplanation } from "./BasicExplanation";
import { GptFunction } from "../types";
import { usePyIOContext } from "../hooks/usePyIOContext";
import AddIcon from "@mui/icons-material/Add";
import { TestCreatedFun } from "./TestCreatedFun";

export type GenError = "repeatName" | "unableToGenerate" | "noExplanation";

export const GenerateFunModal = () => {
  const { addGptFunction, removeGptFunction } = usePyIOContext();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<GenError>();
  const [createdFun, setCreatedFun] = useState<GptFunction>();
  const [retryGenerate, setRetryGenerate] = useState<{
    initialExplanation: string;
  }>();

  const onClose = () => {
    setCreatedFun(undefined);
    setOpen(false);
    setError(undefined);
    setRetryGenerate(undefined);
  };
  return (
    <>
      <Button
        endDecorator={<AddIcon />}
        sx={{ alignSelf: "center" }}
        onClick={() => setOpen(true)}
      >
        Create a Function
      </Button>
      <Modal open={open} onClose={onClose}>
        <ModalDialog minWidth="64rem">
          <ModalClose />
          <DialogContent sx={{ mx: "2rem", px: "1rem" }}>
            {(() => {
              if (createdFun && !retryGenerate) {
                return (
                  <TestCreatedFun
                    fun={createdFun}
                    retryGenerate={() => {
                      setRetryGenerate({
                        initialExplanation: createdFun.explanation,
                      });
                      removeGptFunction(createdFun);
                    }}
                  />
                );
              }
              return (
                <>
                  <BasicExplanation
                    createFun={(fun) => {
                      setRetryGenerate(undefined);
                      addGptFunction(fun);
                      setCreatedFun(fun);
                    }}
                    setError={setError}
                    moreExplanation={retryGenerate?.initialExplanation}
                  />

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
                </>
              );
            })()}
          </DialogContent>
        </ModalDialog>
      </Modal>
    </>
  );
};
