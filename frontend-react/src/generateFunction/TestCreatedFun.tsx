import { FC } from "react";
import { GptFunction } from "../types";
import { Typography } from "@mui/joy";

export const TestCreatedFun: FC<{ fun: GptFunction }> = ({ fun }) => {
  return (
    <>
      <Typography>
        Write a test for the function to make sure it works as intended
      </Typography>
    </>
  );
};
