import { Card, Divider, Stack, Typography } from "@mui/joy";
import { FC } from "react";
import { usePyIOContext } from "./PyIOContext";
import Markdown from "react-markdown";
import "./Instructions.css";

export const Instructions: FC = () => {
  const { currExercise } = usePyIOContext();
  return (
    <Card
      sx={{
        width: "100%",
        p: 1,
        borderRadius: 10,
        minHeight: "300px",
      }}
    >
      <Typography>Instructions</Typography>
      <Divider sx={{ my: "1rem" }} />
      {Markdown({ children: currExercise.instructions })}
    </Card>
  );
};
