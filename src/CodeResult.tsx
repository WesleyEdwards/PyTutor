import { Card, Divider, Stack, Typography } from "@mui/joy";
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
        <Typography sx={{ mb: 1 }}>Output</Typography>
        <Divider />
        <Stack sx={{ overflow: "auto" }}>
          {codeResult.map((line, i) => (
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
        </Stack>
      </Stack>
    </Card>
  );
};
