import { ChatCompletion } from "openai/resources";

export function getFunctionFromGPT(
  gptRes: ChatCompletion.Choice
): { def: string; code: string } | string {
  let codeContent = gptRes.message.content?.split("# Start").at(1);
  codeContent = codeContent?.split("# End").at(0);

  if (codeContent === undefined) {
    return "No function found with # Start and # End comments";
  }

  const codeString = codeContent;
  // get the first line of the code
  const codeLines = codeContent.split("\n");

  const codeDef = codeLines.find((line) => line.includes("def"));

  if (!codeDef || !codeString) {
    return "Unable to find the function definition";
  }

  return {
    def: codeDef,
    code: codeString,
  };
}

export function generateInstructions(text: string): string {
  const string = `Write a function in python with the following specifications: \n- ${text}. \n- Directly above the function definition, write the following comment: # Start\n- At the very end of the function, write the following comment: # End\n- Don't give me any explanation, just the function definition and the code inside the function.`;
  return string;
}
