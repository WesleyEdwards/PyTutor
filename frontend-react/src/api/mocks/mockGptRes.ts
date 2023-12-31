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
    raw: null,
  },
  {
    def: "def subtract_numbers(a, b):",
    code: "\ndef subtract_numbers(a, b):\n    return a - b\n",
    explanation: "Write a function that subtracts two numbers",
    raw: null,
  },
  {
    def: "def divide_numbers(a, b):",
    code: "\ndef divide_numbers(a, b):\n    return a / b\n",
    explanation: "A function that divides two numbers",
    raw: null,
  },
  {
    def: "def split_sentence(sentence):",
    code: '\ndef split_sentence(sentence):\n    words = sentence.split(" ")\n    return words\n',
    explanation:
      "A function that splits a sentence into words, given a sentence as input and returning a list of words",
    raw: null,
  },
  {
    def: "def print_words(words):",
    code: '\ndef print_words(words):\n    print(" ".join(words))\n',
    explanation:
      "A function that prints a list of words, given a list of words as input and returning nothing",
    raw: null,
  },
  {
    def: "def longest_word(words):",
    code: "\ndef longest_word(words):\n    longest = ''\n    for word in words:\n        if len(word) > len(longest):\n            longest = word\n    print(longest)\n",
    raw: null,
    explanation:
      "a function that prints out the longest word in an array of words",
  },
  {
    def: "def print_datetime():",
    code: "\nimport datetime\n\ndef print_datetime():\n    current_datetime = datetime.datetime.now()\n    print(current_datetime)\n",
    raw: null,
    explanation: "make a function that prints the current time and date",
  },
  {
    def: "def find_first_30_primes():",
    code: "\n\ndef find_first_30_primes():\n    primes = []\n    num = 2\n    \n    while len(primes) < 30:\n        is_prime = True\n        for i in range(2, int(num**0.5) + 1):\n            if num % i == 0:\n                is_prime = False\n                break\n        if is_prime:\n            primes.append(num)\n        num += 1\n    \n    return primes\n\n",
    raw: null,
    explanation: "Write a function that finds the first 30 prime numbers",
  },
  {
    def: "def quicksort(arr):",
    code: "\ndef quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr)//2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)\n",
    raw: null,
    explanation:
      "write a function that sorts a list of numbers using the quicksort algorithm",
  },
  {
    def: "def divisible_numbers(n):",
    code: "\ndef divisible_numbers(n):\n    numbers = []\n    i = 1\n    while len(numbers) < 10:\n        if i % n == 0:\n            numbers.append(i)\n        i += 1\n    return numbers\n",
    raw: null,
    explanation:
      "Write a function that creates a list of the first 10 numbers divisible by a number that I provide ",
  },
  {
    def: "def get_unique_letters(sentence):",
    code: '\ndef get_unique_letters(sentence):\n    return list(set(sentence.replace(" ", "")))\n',
    raw: null,
    explanation:
      "Write a function that gives a list of letters used in a sentence, without repeating them",
  },
  {
    def: "def scramble_sentence(sentence):",
    code: "\nimport random\n\ndef scramble_sentence(sentence):\n    scrambled_sentence = ' '.join(random.sample(sentence, len(sentence)))\n    return scrambled_sentence\n",
    raw: null,
    explanation:
      "takes a sentence as a list of words, and returns a string that is the same words but scrambled up",
  },
  {
    def: "def remove_punctuation(s):",
    code: '\nimport string\n\ndef remove_punctuation(s):\n    for punctuation in string.punctuation:\n        s = s.replace(punctuation, "")\n    return s\n',
    raw: null,
    explanation:
      "removes all punctuation\n\nInput Specifications:\ntakes a string\n\nOutput Specifications:\nreturns the same string but it takes out all periods, commas, question marks, and colons",
  },
  {
    def: "def get_strings_after_ATG(string):",
    code: "\ndef get_strings_after_ATG(string):\n    start_index = 0\n    result = []\n    while True:\n        atg_index = string.find('ATG', start_index)\n        if atg_index == -1:\n            break\n        next_index = atg_index + 3\n        end_index = string.find('ATG', next_index)\n        if end_index == -1:\n            result.append(string[next_index:])\n            break\n        else:\n            result.append(string[next_index:end_index])\n            start_index = end_index\n    return result\n",
    raw: null,
    explanation:
      'gets a list of string of characters that come after the char sequence "ATG." \n\nFor example, "ABTATGCAT" would return ["CAT"], and "ABTATGCATATGTHE" will return ["CAT", "THE"], and "THISATGDOGISATGINATGTHE" will return ["DOGIS", "IN", "THE"]\n\nInput Specifications:\nThe function will be provided with a single string, that may have multiple occurences of the sequence "ATG". The string can have any number of "ATG"s in it.\n\nOutput Specifications:\nIf there are multiple occurences of "ATG" in the provided string, there will be multiple strings returned from the function, in the form of a list.\n',
  },
];

export const getRandomMockFunction = (
  prevUsed: GptFunctionRes[]
): GptFunctionRes | null => {
  if (prevUsed.length === mockFunctions.length) {
    return null;
  }
  const prevDefs = prevUsed.map((p) => p.def);

  const notUsed = mockFunctions.filter((f) => !prevDefs.includes(f.def));

  const random = notUsed[Math.floor(Math.random() * notUsed.length)];

  return random;
};
