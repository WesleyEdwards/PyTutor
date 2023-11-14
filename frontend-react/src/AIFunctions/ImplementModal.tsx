import { FC, useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  ModalClose,
  Stack,
  Typography,
  AccordionGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/joy";
import { CodeOutput, GptFunction } from "../types";
import { WriteTest } from "./WriteTest";
import { ImplementFun } from "./ImplementFun";
import { CodeResult } from "../codeResults/CodeResult";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { highlightFunSignature, highlightedText } from "../renderHelpers";
import { extractFunctionName, getOutputChopOffBool } from "../utils";

export const ImplementModal: FC<{
  fun: GptFunction | null;
  closeModal: () => void;
}> = ({ fun, closeModal }) => {
  const [testRes, setTestRes] = useState<CodeOutput>({
    res: "",
    error: undefined,
  });
  const { gptFunctions } = usePyIOContext();

  useEffect(() => {
    if (!fun) return;
    setTestRes({ res: "", error: undefined });
  }, [fun]);

  const processTestRes = useMemo(
    () => ({ ...testRes, res: getOutputChopOffBool(testRes.res) }),
    [testRes.res, testRes.error]
  );

  const testResult = useMemo(() => {
    if (testRes.error) return false;
    if (testRes.res === "") return undefined;
    return testRes.res.trim().endsWith("True");
  }, [testRes.res, testRes.error]);

  return (
    <Modal open={!!fun} onClose={closeModal}>
      <ModalDialog layout="fullscreen">
        <ModalClose />
        <DialogTitle>{fun && highlightFunSignature(fun)}</DialogTitle>
        <DialogContent>
          {fun && (
            <Stack gap="1rem" alignItems="center" width="100%">
              <Stack
                gap="1rem"
                width="100%"
                maxWidth="1000px"
                justifyContent="center"
              >
                <AccordionGroup>
                  <Accordion>
                    <AccordionSummary>
                      <Typography level="h2">Implementation</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ImplementFun fun={fun} />
                    </AccordionDetails>
                  </Accordion>
                  <Accordion defaultExpanded>
                    <AccordionSummary>
                      <Typography level="h2">Test</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <WriteTest
                        fun={fun}
                        setTestRes={setTestRes}
                        testInstructions={
                          <Typography>
                            This should test your implementation of the function{" "}
                            {highlightedText(
                              extractFunctionName(fun.def) ?? "",
                              "function"
                            )}
                            .
                          </Typography>
                        }
                        codeToTest={() =>
                          gptFunctions.find((f) => f._id === fun._id)
                            ?.implementation ?? ""
                        }
                        testResult={testResult}
                      />
                      <CodeResult
                        codeOutput={processTestRes}
                        title="Test Result"
                        height="200px"
                      />
                    </AccordionDetails>
                  </Accordion>
                </AccordionGroup>
              </Stack>
            </Stack>
          )}
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};
