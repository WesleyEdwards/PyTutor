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
        overflow: "auto",
      }}
    >
      <Stack>
        <Typography sx={{ mb: 1 }}>Output</Typography>
        <Divider />
        <Stack>
          {codeResult.map((line, i) => (
            <Typography
              sx={{
                fontFamily: "monospace",
                whiteSpace: "pre",
                overflowX: "auto",
                maxWidth: "100%",
              }}
              key={i}
            >
              {line}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};
