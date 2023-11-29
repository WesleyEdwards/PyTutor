import { FC, useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  ModalClose,
  Stack,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/joy";
import { CodeOutput, GptFunction } from "../types";
import { WriteTest } from "./WriteTest";
import { CodeResult } from "../codeResults/CodeResult";
import { highlightFunSignature, highlightedText } from "../renderHelpers";
import { extractFunctionName, getOutputChopOffBool } from "../utils";
import { useMediaQuery } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { ImplementFun } from "./ImplementFun";

export const TestModal: FC<{
  fun: GptFunction | null;
  closeModal: () => void;
}> = ({ fun, closeModal }) => {
  const [testRes, setTestRes] = useState<CodeOutput>({
    res: "",
    error: undefined,
  });

  const [openImplementation, setOpenImplementation] = useState(true);

  const smallScreen = useMediaQuery("(max-width: 1200px)");

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
            <Stack width="100%" px="2rem">
              <Stack direction="row" gap="2rem">
                {!openImplementation && (
                  <Tooltip title="Show Implementation">
                    <IconButton
                      sx={{ alignSelf: "flex-start" }}
                      onClick={() => setOpenImplementation(true)}
                    >
                      <ChevronRight />
                    </IconButton>
                  </Tooltip>
                )}
                {!smallScreen && openImplementation && (
                  <Stack width="100%">
                    <Stack
                      direction="row"
                      alignItems="flex-start"
                      justifyContent="space-between"
                    >
                      <Typography level="h2" mb="0.75rem">
                        Implementation
                      </Typography>
                      <Tooltip title="Hide">
                        <IconButton
                          onClick={() => setOpenImplementation(false)}
                        >
                          <ChevronLeft />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                    <ImplementFun fun={fun} />
                  </Stack>
                )}
                <Stack width="100%">
                  <Typography level="h2">Test</Typography>
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
                        .
                      </Typography>
                    }
                    testResult={testResult}
                    codeToTest={"implementation"}
                  />
                  <CodeResult
                    codeOutput={processTestRes}
                    title="Test Result"
                    height="20rem"
                  />
                </Stack>
              </Stack>
            </Stack>
          )}
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};
