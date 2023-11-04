import { GptFunctionRes } from "../../types";

const mockFunctions: GptFunctionRes[] = [
  {
    def: "def multiply_numbers(a, b):",
    code: "\ndef multiply_numbers(a, b):\n    return a * b\n",
    raw: {
      message: {
        content:
          "# Start\ndef multiply_numbers(a, b):\n    return a * b\n# End",
      },
    },
  },
  {
    def: "def add_numbers(a, b):",
    code: "\ndef add_numbers(a, b):\n    return a + b\n",
    raw: {
      message: {
        content: "# Start\ndef add_numbers(a, b):\n    return a + b\n# End",
      },
    },
  },
  {
    def: "def subtract_numbers(a, b):",
    code: "\ndef subtract_numbers(a, b):\n    return a - b\n",
    raw: {
      message: {
        content:
          "# Start\ndef subtract_numbers(a, b):\n    return a - b\n# End",
      },
    },
  },
  {
    def: "def divide_numbers(a, b):",
    code: "\ndef divide_numbers(a, b):\n    return a / b\n",
    raw: {
      message: {
        content: "# Start\ndef divide_numbers(a, b):\n    return a / b\n# End",
      },
    },
  },
];

export const getRandomMockFunction = (): GptFunctionRes => {
  return mockFunctions[Math.floor(Math.random() * mockFunctions.length)];
};
