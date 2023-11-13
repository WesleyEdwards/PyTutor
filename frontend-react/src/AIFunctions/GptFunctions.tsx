import { Typography } from "@mui/joy";
import { FC, useState } from "react";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { FunctionDef } from "./FunctionDef";
import { ImplementModal } from "./ImplementModal";
import { GptFunction } from "../types";
import { DeletingModal } from "./DeletingModal";
import { RestoreModal } from "./RestoreModal";

export const GptFunctions: FC = () => {
  const { gptFunctions } = usePyIOContext();

  const [actionFun, setActionFun] = useState<{
    fun: GptFunction;
    action: "implement" | "delete" | "restore";
  } | null>(null);

  if (gptFunctions.length === 0) return null;

  const closeModal = () => setActionFun(null);

  return (
    <>
      <Typography level="h4">My Functions</Typography>
      {gptFunctions.map((gptFunction) => (
        <FunctionDef
          key={gptFunction._id}
          gptFun={gptFunction}
          setActionFun={(action) => setActionFun({ fun: gptFunction, action })}
        />
      ))}
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
