import {
  Alert,
  Button,
  DialogContent,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import { useState } from "react";
import { BasicExplanation } from "./BasicExplanation";
import { GptFunction } from "../types";
import { usePyIOContext } from "../hooks/usePyIOContext";
import AddIcon from "@mui/icons-material/Add";
import { TestCreatedFun } from "./TestCreatedFun";

export type GenError = "repeatName" | "unableToGenerate" | "noExplanation";
export type Explanation = {
  general: string;
  input: string;
  output: string;
};

export const GenerateFunModal = () => {
  const { updateFuns } = usePyIOContext();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<GenError>();
  const [createdFun, setCreatedFun] = useState<GptFunction>();
  const [retryGenerate, setRetryGenerate] = useState(false);
  const [explanation, setExplanation] = useState<Explanation>({
    general: "",
    input: "",
    output: "",
  });

  const onClose = () => {
    setCreatedFun(undefined);
    setOpen(false);
    setError(undefined);
    setRetryGenerate(false);
    if (createdFun) {
      setExplanation({ general: "", input: "", output: "" });
    }
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
          {/* <DialogTitle>Create a Function</DialogTitle> */}
          <ModalClose />
          <DialogContent sx={{ mx: "2rem", px: "1rem" }}>
            {(() => {
              if (createdFun && !retryGenerate) {
                return (
                  <TestCreatedFun
                    fun={createdFun}
                    retryGenerate={() => {
                      setRetryGenerate(true);
                      updateFuns("remove", createdFun);
                    }}
                  />
                );
              }
              return (
                <>
                  <Typography level="h3">Create a Function</Typography>
                  <BasicExplanation
                    createFun={(fun) => {
                      setRetryGenerate(false);
                      updateFuns("add", fun);
                      setCreatedFun(fun);
                    }}
                    setError={setError}
                    explanation={explanation}
                    setExplanation={setExplanation}
                    moreExplanation={retryGenerate}
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
