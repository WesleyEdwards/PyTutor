import { Sheet, Stack, Typography } from "@mui/joy";
import { FC } from "react";

export const CodeResult: FC<{ codeResult: string }> = ({ codeResult }) => {
  console.log(codeResult.split("\n"));
  return (
    <Sheet variant="solid" sx={{ width: "100%", p: "1rem" }}>
      <Stack>
        <Typography sx={{mb: "1rem"}}>Output</Typography>
        {codeResult.split("\n").map((line, i) => (
          <Typography key={i}>{line}</Typography>
        ))}
      </Stack>
    </Sheet>
  );
};
