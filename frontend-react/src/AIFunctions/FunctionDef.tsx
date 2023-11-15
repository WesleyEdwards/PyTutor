import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Tooltip,
  Typography,
} from "@mui/joy";
import { FC, useState } from "react";
import { GptFunction } from "../types";
import { DragIndicator, PublishedWithChanges } from "@mui/icons-material";
import { highlightFunSignature } from "../renderHelpers";
import { ModalType } from "./GptFunctions";
import { ImplementFun } from "./ImplementFun";
import { DefActionSpace } from "./DefActionSpace";
import { Draggable } from "react-beautiful-dnd";
import { usePyIOContext } from "../hooks/usePyIOContext";

export const FunctionDef: FC<{
  gptFun: GptFunction;
  setActionFun: (action: ModalType) => void;
}> = ({ gptFun, setActionFun }) => {
  const [hovering, setHovering] = useState(false);
  const { gptFunctions } = usePyIOContext();

  return (
    <Draggable
      key={gptFun._id}
      draggableId={gptFun._id}
      index={gptFunctions.indexOf(gptFun)}
    >
      {(provided) => (
        <Accordion
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <AccordionSummary>
            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              overflow="auto"
              minHeight="2.5rem"
            >
              <Stack direction="row" alignItems="center" gap="10px">
                <DragIndicator sx={{ cursor: "grab" }} />
                <Typography level="body-sm">
                  {highlightFunSignature(gptFun)}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                {hovering && (
                  <DefActionSpace
                    setActionFun={setActionFun}
                    fun={gptFun}
                    noHovering={() => setHovering(false)}
                  />
                )}
                {gptFun.implemented ? (
                  <Tooltip size="sm" variant="soft" title="Implemented">
                    <PublishedWithChanges width="2rem" color="success" />
                  </Tooltip>
                ) : (
                  <PublishedWithChanges
                    width="2rem"
                    sx={{ opacity: "100%", fill: "none" }}
                  />
                )}
              </Stack>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <ImplementFun fun={gptFun} />
          </AccordionDetails>
        </Accordion>
      )}
    </Draggable>
  );
};
