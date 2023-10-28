import { Alert, Card, Divider, Stack, Typography } from "@mui/joy";
import { FC } from "react";
import { usePyIOContext } from "./PyIOContext";

export const CodeResult: FC = () => {
  const { codeResult } = usePyIOContext();

  return (
    <Card
      variant="soft"
      sx={{
        width: "100%",
        p: 1,
        borderRadius: 10,
      }}
    >
      <Stack sx={{ maxHeight: "500px" }}>
        <Typography>Output</Typography>
        <Divider sx={{ my: "1rem" }} />
        <Stack sx={{ overflow: "auto" }}>
          {codeResult.res.map((line, i) => (
            <Typography
              key={i}
              sx={{
                fontFamily: "monospace",
                whiteSpace: "pre",
                maxWidth: "100%",
              }}
            >
              {line}
            </Typography>
          ))}
          {codeResult.pass === true && (
            <Alert sx={{ mt: 2 }} color="success">
              <Typography>Well Done!</Typography>
            </Alert>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};
