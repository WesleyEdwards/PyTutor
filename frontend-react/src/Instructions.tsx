import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Card,
} from "@mui/joy";
import { FC } from "react";
import "./Instructions.css";

export const Instructions: FC = () => {
  return (
    <Card sx={{ maxWidth: "1000px" }}>
      <AccordionGroup size="lg">
        <Accordion>
          <AccordionSummary>Assignment Instructions</AccordionSummary>
          <AccordionDetails>
            Write a program that prints the numbers from 1 to 100. But for
            multiples of three print “Fizz” instead of the number and for the
            multiples of five print “Buzz”. For numbers which are multiples of
            both three and five print “FizzBuzz”.
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </Card>
  );
};
