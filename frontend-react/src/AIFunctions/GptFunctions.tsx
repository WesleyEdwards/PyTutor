import {
  AccordionGroup,
  Typography,
  accordionDetailsClasses,
  accordionSummaryClasses,
} from "@mui/joy";
import { FC, useState } from "react";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { FunctionDef } from "./FunctionDef";
import { TestModal } from "./TestModal";
import { GptFunction } from "../types";
import { DeletingModal } from "./DeletingModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";

export type ModalType = "implement" | "delete";

export const GptFunctions: FC = () => {
  const { gptFunctions, updateFuns } = usePyIOContext();

  const [actionFun, setActionFun] = useState<{
    fun: GptFunction;
    action: ModalType;
  } | null>(null);

  if (gptFunctions.length === 0) return null;

  const closeModal = () => setActionFun(null);

  return (
    <>
      <Typography level="h4">My Functions</Typography>
      <AccordionGroup
        variant="outlined"
        transition="0.2s"
        sx={{
          borderRadius: "lg",
          [`& .${accordionSummaryClasses.button}:hover`]: {
            bgcolor: "transparent",
          },
          [`& .${accordionDetailsClasses.content}`]: {
            boxShadow: (theme) => `inset 0 1px ${theme.vars.palette.divider}`,
            [`&.${accordionDetailsClasses.expanded}`]: {
              paddingBlock: "0.75rem",
            },
          },
        }}
      >
        <DragDropContext
          onDragEnd={({ draggableId, destination }) => {
            if (destination?.index) {
              updateFuns("reorder", {
                fun: draggableId,
                destination: destination.index,
              });
            }
          }}
        >
          <StrictModeDroppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {gptFunctions.map((item) => (
                  <FunctionDef
                    key={item._id}
                    gptFun={item}
                    setActionFun={(action) =>
                      setActionFun({ fun: item, action })
                    }
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </AccordionGroup>
      <TestModal
        fun={actionFun?.action === "implement" ? actionFun.fun : null}
        closeModal={closeModal}
      />
      <DeletingModal
        fun={actionFun?.action === "delete" ? actionFun.fun : null}
        closeModal={closeModal}
      />
    </>
  );
};
