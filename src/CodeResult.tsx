import { Card, Divider, Stack, Typography } from "@mui/joy";
import { FC } from "react";
import { usePyIOContext } from "./pyIOContext/PyIOContext";

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
      <Stack sx={{ maxHeight: "500px", minHeight: "500px" }}>
        <Typography>Output</Typography>
        <Divider sx={{ my: "1rem" }} />
        <Stack sx={{ overflow: "auto" }}>
          {(() => {
            if (codeResult.error) {
              return (
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    whiteSpace: "pre",
                    maxWidth: "100%",
                    color: "#d10000",
                  }}
                >
                  {codeResult.error.error.message}
                </Typography>
              );
            }

            return codeResult.res?.map((line, i) => (
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
            ));
          })()}
        </Stack>
      </Stack>
    </Card>
  );
};
