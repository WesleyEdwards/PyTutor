import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";
import { FC } from "react";
import { usePyIOContext } from "../pyIOContext/PyIOContext";
import CopyAll from "@mui/icons-material/CopyAll";
import { FunctionDef } from "./FunctionDef";

export const GptFunctions: FC = () => {
  const { gptFunctions } = usePyIOContext();
  if (gptFunctions.length === 0) {
    return null;
  }

  return (
    <AccordionGroup>
      <Typography level="h4">GPT Functions</Typography>
      {gptFunctions.map((gptFunction) => (
        <Stack direction="row" paddingY="1rem" key={gptFunction._id}>
          <IconButton
            onClick={() => {
              navigator.clipboard.writeText(
                gptFunction.def.split("(")[0].replace("def ", "")
              );
            }}
            sx={{ alignSelf: "flex-start", p: "3px" }}
          >
            <CopyAll />
          </IconButton>
          <Accordion sx={{ flex: 1 }}>
            <AccordionSummary>{gptFunction.def}</AccordionSummary>
            <AccordionDetails>
              <FunctionDef gptFun={gptFunction} />
            </AccordionDetails>
          </Accordion>
        </Stack>
      ))}
    </AccordionGroup>
  );
};
