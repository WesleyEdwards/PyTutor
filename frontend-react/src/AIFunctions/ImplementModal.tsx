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
  Alert,
} from "@mui/joy";
import { CodeOutput, GptFunction } from "../types";
import { WriteTest } from "./WriteTest";
import { ImplementFun } from "./ImplementFun";
import { CodeResult } from "../codeResults/CodeResult";

export const ImplementModal: FC<{
  fun: GptFunction | null;
  closeModal: () => void;
}> = ({ fun, closeModal }) => {
  const [writingTest, setWritingTest] = useState(false);
  const [testRes, setTestRes] = useState<CodeOutput>({
    res: "",
    error: undefined,
  });

  useEffect(() => {
    if (!fun) return;
    setWritingTest(!fun.test.split("\n")[1].includes("return False"));
  }, [fun]);

  const processTestRes = useMemo(() => {
    const res = testRes.res.trim();
    if (res.endsWith("True")) {
      return { ...testRes, res: res.substring(0, res.length - 4) };
    }
    if (res.endsWith("False")) {
      return { ...testRes, res: res.substring(0, res.length - 5) };
    }
    return testRes;
  }, [testRes.res, testRes.error]);

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
                <Stack
                  direction="row"
                  width={writingTest ? "64rem" : "32rem"}
                  gap="1rem"
                  justifyContent="center"
                >
                  <ImplementFun
                    writingTest={writingTest}
                    openTestSection={() => setWritingTest(true)}
                    fun={fun}
                  />
                  {writingTest && (
                    <WriteTest fun={fun} setTestRes={setTestRes} />
                  )}
                </Stack>
                {writingTest && (
                  <>
                    <Stack gap="1rem" maxWidth="64rem" width="100%">
                      {testResult !== undefined && (
                        <Alert color={testResult ? "success" : "danger"}>
                          {testResult ? "Test Passed" : "Test Failed"}
                        </Alert>
                      )}
                      <CodeResult codeOutput={processTestRes} />
                    </Stack>
                  </>
                )}
              </Stack>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button sx={{ maxWidth: "12rem" }} color="success">
            Implement
          </Button>
          {/* <Tooltip title="Reset">
            <IconButton
              onClick={() => {
                setImpl(`${fun?.def}\n    return True` ?? "");
              }}
            >
              <RestoreIcon />
            </IconButton>
          </Tooltip> */}
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};
