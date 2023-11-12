import { FC, useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  ModalClose,
  DialogActions,
  Button,
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
import { highlightedText } from "../renderHelpers";
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
    // setWritingTest(!fun.test.split("\n")[1].includes("return False"));
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
  }, [testRes.res]);

  return (
    <Modal open={!!fun} onClose={closeModal}>
      <ModalDialog layout="fullscreen" size="lg">
        <ModalClose />
        <DialogTitle>{fun?.def}</DialogTitle>
        <DialogContent>
          {fun && (
            <>
              <Stack gap="1rem" alignItems="center" width="100%">
                <Stack width="48rem" gap="1rem" justifyContent="center">
                  <AccordionGroup>
                    <Accordion variant="soft" defaultExpanded>
                      <AccordionSummary>
                        <Typography level="h2">Implement</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ImplementFun fun={fun} />
                      </AccordionDetails>
                    </Accordion>
                    <Accordion variant="soft">
                      <AccordionSummary>
                        <Typography level="h2">Test</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <WriteTest
                          fun={fun}
                          setTestRes={setTestRes}
                          testInstructions={
                            <Typography>
                              This will test your implementation of the function{" "}
                              {highlightedText(
                                extractFunctionName(fun.def) ?? "",
                                "function"
                              )}
                              . The test should return True if the function
                              produces the correct behavior
                            </Typography>
                          }
                          codeToTest={() =>
                            gptFunctions.find((f) => f._id === fun._id)
                              ?.implementation ?? ""
                          }
                          testResult={testResult}
                        />
                        <Stack gap="1rem" maxWidth="64rem" width="100%">
                          <CodeResult
                            codeOutput={processTestRes}
                            height="200px"
                          />
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  </AccordionGroup>
                </Stack>
                {/* {writingTest && (
                  <Stack gap="1rem" maxWidth="64rem" width="100%">
                    <CodeResult codeOutput={processTestRes} height="200px" />
                  </Stack>
                )} */}
              </Stack>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button sx={{ maxWidth: "12rem" }} color="success">
            Implement
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};
