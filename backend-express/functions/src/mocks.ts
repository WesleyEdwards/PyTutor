import { ChatCompletion } from "openai/resources";
import { getFunctionFromGPT } from "./helpers";

const mockCompletes: ChatCompletion.Choice[] = [
  {
    index: 0,
    message: {
      role: "assistant",
      content: "# Start\ndef subtract_numbers(a, b):\n    return a - b\n# End",
    },
    finish_reason: "stop",
  },
  {
    index: 0,
    message: {
      role: "assistant",
      content: "# Start\ndef add_numbers(a, b):\n    return a + b\n# End",
    },
    finish_reason: "stop",
  },
  {
    index: 0,
    message: {
      role: "assistant",
      content: "# Start\ndef multiply_numbers(a, b):\n    return a * b\n# End",
    },
    finish_reason: "stop",
  },
];

export const getMockProcessedFunction = (): {
  def: string;
  code: string;
  explanation: string;
} => {
  const randomCompletion =
    mockCompletes[Math.floor(Math.random() * mockCompletes.length)];
  const generated = getFunctionFromGPT(randomCompletion);
  if (typeof generated === "string") {
    throw new Error("Invalid mock completion");
  }
  return {...generated, explanation: "¯\_(ツ)_/¯",};
};
