export type Exercise = {
  id: string;
  starterCode: string;
  instructions: string;
  // hint: string;
  testResult: (res: string[]) => null | string;
};

export const exercises: Exercise[] = [
  {
    id: "print-hello-world",
    starterCode: 'print("Hello world!")\n\n',
    instructions: "Print hello world",
    testResult: (res) => {
      if (res.length > 1) return "You're code is doing too much. Simplify it.";
      if (res[0] !== "Hello world!") return "Incorrect";
      return null;
    },
  },
];
