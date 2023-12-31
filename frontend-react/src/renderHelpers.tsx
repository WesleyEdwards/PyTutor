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

export function highlightVariables(def: string): React.ReactNode {
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

export function highlightFunSignature(
  fun: GptFunction,
  def?: boolean
): React.ReactNode {
  return (
    <Typography>
      {def === false ? "" : highlightedText("def", "keyword")}{" "}
      {highlightedText(extractFunctionName(fun.def) ?? "", "function")}
      {highlightedText("(", "punctuation")}
      {highlightVariables(fun.def)}
      {highlightedText(")", "punctuation")}
    </Typography>
  );
}

export function highlightTextInstructions(fun: GptFunction): React.ReactNode {
  return (
    <>
      {highlightFunSignature(fun)}
      <Typography overflow="auto">
        AI created the function{" "}
        {highlightedText(extractFunctionName(fun.def) ?? "", "function")}. To
        ensure it behaves as intended, write a test. You can use the{" "}
        {highlightedText("print", "function")}
        {highlightedText("()", "punctuation")} function to help.
      </Typography>
    </>
  );
}
