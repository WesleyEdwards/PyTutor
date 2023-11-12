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
import CheckIcon from "@mui/icons-material/Check";
import { highlightedText } from "../renderHelpers";
import { extractFunctionName, getOutputChopOffBool } from "../utils";
import CodeIcon from "@mui/icons-material/Code";

export const ImplementModal: FC<{
  fun: GptFunction | null;
  closeModal: () => void;
}> = ({ fun, closeModal }) => {
  const [testRes, setTestRes] = useState<CodeOutput>({
    res: "",
    error: undefined,
  });
  const { gptFunctions, modifyFunction } = usePyIOContext();
  const [implemented, setImplemented] = useState(false);

  useEffect(() => {
    if (!fun) return;
    // setWritingTest(!fun.test.split("\n")[1].includes("return False"));
    setTestRes({ res: "", error: undefined });
    setImplemented(fun.implemented);
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
                    <Accordion defaultExpanded>
                      <AccordionSummary>
                        <Typography level="h2">Implement</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ImplementFun fun={fun} />
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary>
                        <Typography level="h2">Test</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <WriteTest
                          fun={fun}
                          setTestRes={setTestRes}
                          testInstructions={
                            <Typography>
                              This should test your implementation of the
                              function{" "}
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
          <Button
            disabled={testResult !== true}
            sx={{ maxWidth: "12rem" }}
            color="success"
            endDecorator={implemented ? <CheckIcon /> : <CodeIcon />}
            onClick={() => {
              modifyFunction(fun?._id ?? "", { implemented: true });
              setImplemented(true);
            }}
          >
            Implement
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};
