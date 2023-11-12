import { Typography } from "@mui/joy";

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

export const highlightedText = (text: string, color: CodeToken) => {
  return (
    <Typography
      component="span"
      sx={{ fontFamily: "monospace", color: colorsMap[color] }}
    >
      {text}
    </Typography>
  );
};
