import { GptFunctionRes } from "../../types";

const mockFunctions: GptFunctionRes[] = [
  {
    def: "def multiply_numbers(a, b):",
    code: "\ndef multiply_numbers(a, b):\n    return a * b\n",
    raw: {
      index: 0,
      message: {
        role: "assistant",
        content:
          "# Start\ndef multiply_numbers(a, b):\n    return a * b\n# End",
      },
      finish_reason: "stop",
    },
  },
];

export const getRandomMockFunction = (): GptFunctionRes => {
  return mockFunctions[Math.floor(Math.random() * mockFunctions.length)];
};
