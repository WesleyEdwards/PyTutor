import {
  AccordionGroup,
  Divider,
  accordionDetailsClasses,
  accordionSummaryClasses,
} from "@mui/joy";
import { FC, useState } from "react";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { FunctionDef } from "./FunctionDef";
import { TestModal } from "./TestModal";
import { GptFunction } from "../types";
import { DeletingModal } from "./DeletingModal";
import { DragDropContext } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { RenameModal } from "./RenameModal";

export type ModalType = "test" | "delete" | "rename";

export const GptFunctions: FC = () => {
  const { gptFunctions, updateFuns } = usePyIOContext();

  const [actionFun, setActionFun] = useState<{
    fun: GptFunction;
    action: ModalType;
  } | null>(null);

  const closeModal = () => setActionFun(null);

  if (gptFunctions.length === 0) return <Divider />;

  return (
    <>
      <AccordionGroup
        variant="outlined"
        transition="0.2s"
        sx={{
          borderRadius: "sm",
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
            if (
              destination?.index !== undefined &&
              destination?.index !== null
            ) {
              updateFuns("reorder", {
                id: draggableId,
                destination: destination.index,
              });
            }
          }}
        >
          <StrictModeDroppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {gptFunctions.map((fun) => (
                  <FunctionDef
                    key={fun._id}
                    fun={fun}
                    setActionFun={(action) => setActionFun({ fun, action })}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </AccordionGroup>
      <TestModal
        fun={actionFun?.action === "test" ? actionFun.fun : null}
        closeModal={closeModal}
      />
      <DeletingModal
        fun={actionFun?.action === "delete" ? actionFun.fun : null}
        closeModal={closeModal}
      />
      <RenameModal
        fun={actionFun?.action === "rename" ? actionFun.fun : null}
        closeModal={closeModal}
      />
    </>
  );
};
