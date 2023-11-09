import { Card, Divider, Stack, Typography } from "@mui/joy";
import { FC } from "react";
import { usePyIOContext } from "./pyIOContext/PyIOContext";

export const CodeResult: FC = () => {
  const { codeOutput } = usePyIOContext();

  const { error, res } = codeOutput;

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
            {error ? error : res}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};
