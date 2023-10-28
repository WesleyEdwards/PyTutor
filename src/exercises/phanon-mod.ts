import { Exercise } from "./Exercises";

export const exercisesMod: Exercise[] = [
  {
    id: "10488",
    instructions:
      "Press the run button. The following will be printed to the screen:\n\n```\nHello world\n```\n\nChange the program to print\n\n```\nHello world!\n```\n\n*Hint: Add an exclamation mark after the `d`.*",
    starterCode: 'print("Hello world!")\n\n',
    testResult: (res) => {
      if (res.length > 1) return "You're code is doing too much. Simplify it.";
      if (res[0] !== "Hello world!") return "Incorrect";
      return null;
    },
  },
  {
    id: "10521",
    instructions:
      "Press the run button. The following will be printed to the screen:\n\n```\nHello world!\n```\n\nChange the program to print\n\n```\nHello World!\n```\n\n*Hint: Make the ```w``` uppercase.*",
    starterCode: 'print("Hello World!")',
    testResult: (res) => {
      return null;
    },
  },
  {
    id: "10554",
    instructions:
      "We write code to create programs. Change the following code to print\n\n```\nGoodbye Alien!\n```",
    starterCode: 'print("Goodbye Alien!")',
    testResult: (res) => {
      return null;
    },
  },
  {
    id: "10585",
    instructions: "Change the program to print\n\n```\nHello Alien!\n```",
    starterCode: 'print("Hello Alien!")',
    testResult: (res) => {
      return null;
    },
  },
  {
    id: "10619",
    instructions:
      "Change the code to print\n\n```\nHello Alien!\nGoodbye Alien!\n```\n\n*Hint: Change only the second ```print``` statement.*",
    starterCode: 'print("Hello Alien!")\nprint("Goodbye Alien!")',
    testResult: (res) => {
      return null;
    },
  },
  {
    id: "10651",
    instructions:
      "Sometimes our code has errors. Run the following code to see what happens. Then add a closing quote mark to fix the problem.",
    starterCode: 'print("Hello World!")\n',
    testResult: (res) => {
      return null;
    },
  },
  {
    id: "10681",
    instructions:
      "This code has a syntax error. Run the code to see what happens then fix the problem.\n\n*Hint: it has something to do with quotes.* *Hint: if you get stuck, try looking at the previous exercise.*",
    starterCode: 'print("Hello World!")\n',
    testResult: (res) => {
      return null;
    },
  },
  {
    id: "10710",
    instructions:
      "This code has a syntax error. Run the code to see what happens then fix the problem.\n\n*Hint: A word is mispelled.*",
    starterCode: 'print("Hello World!")\n',
    testResult: (res) => {
      return null;
    },
  },
  {
    id: "10740",
    instructions: "This code has a syntax error. Fix the problem.",
    starterCode: 'print("Hello World!")\n',
    testResult: (res) => {
      return null;
    },
  },
  {
    id: "10769",
    instructions: "This code has multiple syntax errors. Fix the problems.",
    starterCode: 'print("Hello World!")\n',
    testResult: (res) => {
      return null;
    },
  },
  {
    id: "10798",
    instructions:
      "This code has a tricky syntax error. It has to do with a quote mark. You need to remove one of them.",
    starterCode: 'print("Hello World!")\n',
    testResult: (res) => {
      return null;
    },
  },
  {
    id: "10824",
    instructions:
      "Anything inside quote marks is called a string. Change the code to print\n```\nLove to cook!\n```\n\n*Hint: You'll replace `Hello World!` with `Love to cook!`*",
    starterCode: 'print("Love to cook!")\n',
    testResult: (res) => {
      return null;
    },
  },
  {
    id: "10848",
    instructions:
      "Change the second string to `Soccer`. The following should be output:\n```\nBaseball\nSoccer\n```",
    starterCode: 'print("Baseball")\nprint("Soccer")\n',
    testResult: (res) => {
      return null;
    },
  },
  {
    id: "10871",
    instructions: "Fix the error. The code should print\n```\nBaseball\n```",
    starterCode: 'print("Baseball")\n\n',
    testResult: (res) => {
      return null;
    },
  },
  {
    id: "10891",
    instructions: "Write code to output\n\n```\nHello World!\n```",
    starterCode: 'print("Hello World!")\n',
    testResult: (res) => {
      return null;
    },
  },
  {
    id: "10910",
    instructions: "Write code to output\n\n```\nHello Alien!\n```",
    starterCode: 'print("Hello Alien!")\n',
    testResult: (res) => {
      return null;
    },
  },
  {
    id: "10926",
    instructions:
      "Write code to output\n\n```\nHello World!\n```\n\n*Heads up: don't forget the parentheses!*",
    starterCode: 'print("Hello World!")\n',
    testResult: (res) => {
      return null;
    },
  },
  {
    id: "10942",
    instructions: "Write code to output\n\n```\nHello World!\n```",
    starterCode: 'print("Hello World!")\n',
    testResult: (res) => {
      return null;
    },
  },
  {
    id: "10958",
    instructions:
      "Write code to output\n\n```\nTake me out to the ballgame.\n```\n\n*Heads up: don't forget the period at the end.*",
    starterCode: 'print("Take me out to the ballgame.")\n',
    testResult: (res) => {
      return null;
    },
  },
  {
    id: "10972",
    instructions:
      "Write code to output\n\n```\nPing pong\nTennis\n```\n\n*Heads up: make sure your capitalization is correct.*",
    starterCode: 'print("Ping pong")\nprint("Tennis")\n',
    testResult: (res) => {
      return null;
    },
  },
  {
    id: "10984",
    instructions:
      "We can print things other than strings. Press run to see that the code prints 5. Change the code to print the number 6.",
    starterCode: "print(6)\n",
    testResult: (res) => {
      return null;
    },
  },
];
