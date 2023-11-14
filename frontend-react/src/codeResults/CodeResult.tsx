import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Card,
  Divider,
  Stack,
  Typography,
} from "@mui/joy";
import { FC } from "react";
import { CodeOutput } from "../types";

export const CodeResult: FC<{
  codeOutput: CodeOutput;
  height: string;
  defaultExpanded?: boolean;
  title?: string;
  expandable?: boolean;
}> = ({
  codeOutput,
  height,
  defaultExpanded = true,
  expandable = true,
  title = "Output",
}) => {
  const { error, res } = codeOutput;

  if (expandable) {
    return (
      <Card variant="soft" sx={{ width: "100%", p: 1, borderRadius: 10 }}>
        <AccordionGroup>
          <Accordion defaultExpanded={defaultExpanded}>
            <AccordionSummary>
              <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack sx={{ height }}>
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
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
      </Card>
    );
  }

  return (
    <Card
      variant="soft"
      sx={{ width: "100%", height, minWidth: "400px", p: 1, borderRadius: 10 }}
    >
      <Typography>{title}</Typography>
      <Divider sx={{ my: "1rem" }} />
      <Stack sx={{ overflow: "auto" }}>
        <Typography
          sx={{
            fontFamily: "monospace",
            whiteSpace: "pre",
            maxWidth: "100%",
            // color: codeOutput.error ? "#d10000" : undefined,
          }}
        >
          {error ? error : res}
        </Typography>
      </Stack>
    </Card>
  );
};
