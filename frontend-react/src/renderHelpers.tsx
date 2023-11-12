import { Typography } from "@mui/joy";
import { extractFunctionName } from "./utils";
import { GptFunction } from "./types";

type CodeToken =
  | "variable"
  | "keyword"
  | "function"
  | "punctuation"
  | "boolean";

const colorsMap: Record<CodeToken, string> = {
  boolean: "#d19a66",
  variable: "#e06c75",
  keyword: "#c678dd",
  function: "#61afef",
  punctuation: "#abb2bf",
};

export function highlightedText(
  text: string,
  color: CodeToken
): React.ReactNode {
  return (
    <Typography
      component="span"
      sx={{ fontFamily: "monospace", color: colorsMap[color] }}
    >
      {text}
    </Typography>
  );
}

function highlightVariables(def: string): React.ReactNode {
  const after = def.split("(")[1];
  const before = after.split(")")[0];
  const args = before.split(",").map((arg) => arg.trim());

  return args.map((arg, i) => (
    <Typography key={i}>
      {highlightedText(arg, "variable")}
      {highlightedText(i === args.length - 1 ? "" : ", ", "punctuation")}
    </Typography>
  ));
}

export function highlightTextInstructions(fun: GptFunction): React.ReactNode {
  return (
    <>
      <Typography>
        {highlightedText("def", "keyword")}{" "}
        {highlightedText(extractFunctionName(fun.def) ?? "", "function")}
        {highlightedText("(", "punctuation")}
        {highlightVariables(fun.def)}
        {highlightedText(")", "punctuation")}
      </Typography>
      <Typography overflow="auto">
        Write a test to ensure that the function{" "}
        {highlightedText(extractFunctionName(fun.def) ?? "", "function")} works
        as intended. The test should return {highlightedText("True", "boolean")}{" "}
        if the function works as intended and{" "}
        {highlightedText("False", "boolean")} otherwise. You can use the{" "}
        {highlightedText("print", "function")}
        {highlightedText("()", "punctuation")} function to print the output of
        the function and the {highlightedText("return", "keyword")} keyword to
        return the output of the function.
      </Typography>
    </>
  );
}
