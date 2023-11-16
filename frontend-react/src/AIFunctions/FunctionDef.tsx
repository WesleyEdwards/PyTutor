import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/joy";
import { FC, useState } from "react";
import { GptFunction } from "../types";
import {
  CopyAll,
  DragIndicator,
  PublishedWithChanges,
} from "@mui/icons-material";
import { highlightFunSignature } from "../renderHelpers";
import { ModalType } from "./GptFunctions";
import { ImplementFun } from "./ImplementFun";
import { DefActionSpace } from "./DefActionSpace";
import { Draggable } from "react-beautiful-dnd";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { extractFunctionName } from "../utils";
import { useToast } from "../contexts/Toaster";

export const FunctionDef: FC<{
  fun: GptFunction;
  setActionFun: (action: ModalType) => void;
}> = ({ fun, setActionFun }) => {
  const showToast = useToast();
  const { gptFunctions, updateFuns } = usePyIOContext();

  const [hovering, setHovering] = useState(false);

  const funName = extractFunctionName(fun.def) ?? "";

  return (
    <Draggable
      key={fun._id}
      draggableId={fun._id}
      index={gptFunctions.indexOf(fun)}
    >
      {(provided) => (
        <Accordion
          ref={provided.innerRef}
          {...provided.draggableProps}
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
                <div {...provided.dragHandleProps}>
                  <DragIndicator sx={{ cursor: "grab" }} />
                </div>
                <Typography level="body-sm">
                  {highlightFunSignature(fun, false)}
                </Typography>
                <IconButton
                  size="sm"
                  sx={{ visibility: hovering ? "visible" : "hidden" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(funName);
                    showToast({
                      message: `Copied '${funName}' to clipboard`,
                      color: "success",
                    });
                  }}
                >
                  <CopyAll />
                </IconButton>
              </Stack>
              <Stack direction="row" alignItems="center">
                <DefActionSpace
                  setActionFun={setActionFun}
                  hovering={hovering}
                />
                <Tooltip
                  size="sm"
                  variant="soft"
                  title={fun.implemented ? "Implemented" : "Implement"}
                >
                  <IconButton
                    size="sm"
                    onClick={(e) => {
                      setHovering(false);
                      e.stopPropagation();
                      showToast({
                        message: fun.implemented
                          ? `AI functionality restored for ${funName}!`
                          : "Function implemented!",
                        color: "success",
                      });
                      updateFuns("modify", {
                        id: fun._id,
                        mod: { implemented: !fun.implemented },
                      });
                    }}
                  >
                    <PublishedWithChanges
                      width="2rem"
                      color={fun.implemented ? "success" : "disabled"}
                      sx={{ opacity: fun.implemented ? 1 : 0.5 }}
                    />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <ImplementFun fun={fun} />
          </AccordionDetails>
        </Accordion>
      )}
    </Draggable>
  );
};
