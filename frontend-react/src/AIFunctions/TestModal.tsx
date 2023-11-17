import { FC, useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  ModalClose,
  Stack,
  Typography,
} from "@mui/joy";
import { CodeOutput, GptFunction } from "../types";
import { WriteTest } from "./WriteTest";
import { CodeResult } from "../codeResults/CodeResult";
import { highlightFunSignature, highlightedText } from "../renderHelpers";
import { extractFunctionName, getOutputChopOffBool } from "../utils";

export const TestModal: FC<{
  fun: GptFunction | null;
  closeModal: () => void;
}> = ({ fun, closeModal }) => {
  const [testRes, setTestRes] = useState<CodeOutput>({
    res: "",
    error: undefined,
  });

  const processTestRes = useMemo(
    () => ({ ...testRes, res: getOutputChopOffBool(testRes.res) }),
    [testRes.res, testRes.error]
  );

  const testResult = useMemo(() => {
    if (testRes.error) return false;
    if (testRes.res === "") return undefined;
    return testRes.res.trim().endsWith("True");
  }, [testRes.res, testRes.error]);

  useEffect(() => {
    if (!fun) return;
    setTestRes({ res: "", error: undefined });
  }, [fun]);

  return (
    <Modal open={!!fun} onClose={closeModal}>
      <ModalDialog
        layout="fullscreen"
        sx={{ marginInlineEnd: 0, paddingInlineEnd: 0 }}
      >
        <ModalClose />
        <DialogTitle>{fun && highlightFunSignature(fun)}</DialogTitle>
        <DialogContent>
          {fun && (
            <Stack gap="1rem" alignItems="center" width="100%">
              <Stack maxWidth="1000px" width="90%" justifyContent="center">
                <Typography level="h2">Test</Typography>
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
                  testResult={testResult}
                  codeToTest={"implementation"}
                />
                <CodeResult
                  codeOutput={processTestRes}
                  title="Test Result"
                  height="200px"
                />
              </Stack>
            </Stack>
          )}
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};
