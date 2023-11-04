import { GptFunctionRes } from "../../types";

const mockFunctions: GptFunctionRes[] = [
  {
    def: "def multiply_numbers(a, b):",
    code: "\ndef multiply_numbers(a, b):\n    return a * b\n",
    explanation: "A function that multiplies two numbers",
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
    explanation: "A function that adds two numbers together",
    raw: {
      message: {
        content: "# Start\ndef add_numbers(a, b):\n    return a + b\n# End",
      },
    },
  },
  {
    def: "def subtract_numbers(a, b):",
    code: "\ndef subtract_numbers(a, b):\n    return a - b\n",
    explanation: "Write a function that subtracts two numbers",
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
    explanation: "A function that divides two numbers",
    raw: {
      message: {
        content: "# Start\ndef divide_numbers(a, b):\n    return a / b\n# End",
      },
    },
  },
  {
    def: "def split_sentence(sentence):",
    code: '\ndef split_sentence(sentence):\n    words = sentence.split(" ")\n    return words\n',
    explanation:
      "A function that splits a sentence into words, given a sentence as input and returning a list of words",
    raw: {
      message: {
        content:
          '# Start\ndef split_sentence(sentence):\n    words = sentence.split(" ")\n    return words\n# End',
      },
    },
  },
  {
    def: "def print_words(words):",
    code: '\ndef print_words(words):\n    print(" ".join(words))\n',
    explanation:
      "A function that prints a list of words, given a list of words as input and returning nothing",
    raw: {
      message: {
        content:
          '# Start\ndef print_words(words):\n    print(" ".join(words))\n# End',
      },
    },
  },
  {
    def: "def longest_word(words):",
    code: "\ndef longest_word(words):\n    longest = ''\n    for word in words:\n        if len(word) > len(longest):\n            longest = word\n    print(longest)\n",
    raw: {
      index: 0,
      message: {
        content:
          "# Start\ndef longest_word(words):\n    longest = ''\n    for word in words:\n        if len(word) > len(longest):\n            longest = word\n    print(longest)\n# End",
      },
    },
    explanation:
      "a function that prints out the longest word in an array of words",
  },
];

export const getRandomMockFunction = (): GptFunctionRes => {
  return mockFunctions[Math.floor(Math.random() * mockFunctions.length)];
};
