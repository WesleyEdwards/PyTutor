import { Typography } from "@mui/joy";
import { FC, useState } from "react";
import { usePyIOContext } from "../pyIOContext/PyIOContext";
import { FunctionDef } from "./FunctionDef";
import { GptFunction } from "../pyIOContext/PythonIOProvider";
import { ImplementModal } from "./ImplementModal";

export const GptFunctions: FC = () => {
  const { gptFunctions } = usePyIOContext();

  const [editingFun, setEditingFun] = useState<GptFunction | null>(null);

  if (gptFunctions.length === 0) return null;

  return (
    <>
      <Typography level="h4">GPT Functions</Typography>
      {gptFunctions.map((gptFunction) => (
        <FunctionDef
          key={gptFunction._id}
          gptFun={gptFunction}
          setEditing={() => setEditingFun(gptFunction)}
        />
      ))}
      <ImplementModal fun={editingFun} closeModal={() => setEditingFun(null)} />
    </>
  );
};
