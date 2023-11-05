import { Card, Divider, Stack, Typography } from "@mui/joy";
import { FC } from "react";
import { usePyIOContext } from "./pyIOContext/PyIOContext";

export const CodeResult: FC = () => {
  const { codeOutput } = usePyIOContext();

  // For Sculpt and Brython, the error is a string, not an Error object.
  const errorMessage = codeOutput?.error?.error as unknown as string;

  return (
    <Card
      variant="soft"
      sx={{
        width: "100%",
        p: 1,
        borderRadius: 10,
      }}
    >
      <Stack sx={{ maxHeight: "500px", minHeight: "500px" }}>
        <Typography>Output</Typography>
        <Divider sx={{ my: "1rem" }} />
        <Stack sx={{ overflow: "auto" }}>
          <Typography
            sx={{
              fontFamily: "monospace",
              whiteSpace: "pre",
              maxWidth: "100%",
              color: codeOutput.error ? "#d10000" : undefined,
            }}
          >
            {codeOutput.res ? codeOutput.res : errorMessage}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};
