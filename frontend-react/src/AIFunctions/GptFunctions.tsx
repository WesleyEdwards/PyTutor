import {
  AccordionGroup,
  Typography,
  accordionDetailsClasses,
  accordionSummaryClasses,
} from "@mui/joy";
import { FC, useState } from "react";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { FunctionDef } from "./FunctionDef";
import { ImplementModal } from "./ImplementModal";
import { GptFunction } from "../types";
import { DeletingModal } from "./DeletingModal";
import { RestoreModal } from "./RestoreModal";

export type ModalType = "implement" | "delete" | "restore";

export const GptFunctions: FC = () => {
  const { gptFunctions } = usePyIOContext();

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
        {gptFunctions.map((gptFunction) => (
          <FunctionDef
            key={gptFunction._id}
            gptFun={gptFunction}
            setActionFun={(action) =>
              setActionFun({ fun: gptFunction, action })
            }
          />
        ))}
      </AccordionGroup>
      <ImplementModal
        fun={actionFun?.action === "implement" ? actionFun.fun : null}
        closeModal={closeModal}
      />
      <DeletingModal
        fun={actionFun?.action === "delete" ? actionFun.fun : null}
        closeModal={closeModal}
      />
      <RestoreModal
        fun={actionFun?.action === "restore" ? actionFun.fun : null}
        closeModal={closeModal}
      />
    </>
  );
};
