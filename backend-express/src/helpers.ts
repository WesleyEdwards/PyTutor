import { ChatCompletion } from "openai/resources";

type ProcessedChoice = {
  def: string;
  code: string;
  raw: ChatCompletion.Choice;
};

export function getFunctionFromGPT(
  gptRes: ChatCompletion.Choice
): ProcessedChoice | string {
  const afterStart = gptRes.message.content?.split("# Start").at(1);
  const codeContent = afterStart?.split("# End").at(0);

  if (codeContent === undefined) {
    return "No function found with # Start and # End comments";
  }

  const codeDef = codeContent.split("\n").find((line) => line.includes("def"));

  if (!codeDef) return "Unable to find the function definition";

  return {
    def: codeDef,
    code: codeContent,
    raw: gptRes,
  };
}

export function generateInstructions(text: string): string {
  const lines = [
    "Write a function in python with the following specifications:",
    `- ${text}`,
    "- Directly above the function definition, write the following comment: # Start",
    "- At the very end of the function, write the following comment: # End",
    "- Don't give me any explanation, just the function definition and the code inside the function.",
  ];
  return lines.join("\n");
}
