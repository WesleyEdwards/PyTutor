import { PythonError } from "client-side-python-runner";
import { GptFunction } from "./types";
import { TestFunction } from "./AIFunctions/WriteTest";

export const testCode = ["for i in range(40):", '\tprint("Time:", i)'].join(
  "\n"
);

export const starterCode = `\n\ndef main():\n    initialSpeech = "This umm I guess is umm my thrilling umm speech I guess I will give"\n\n    print("TODO: read assignment description")\n\nmain()`;
// export const starterCode = `\n\ndef main():\n    print("Your code goes here")\n\n\n\nmain()`;

function offsetErrorLineNumber(
  errorMessage: string,
  newLineNumber: number
): string {
  const regex = /line (\d+)/;
  const match = errorMessage.match(regex);

  if (!match) return errorMessage;

  const oldLineNumber = parseInt(match[1], 10);
  const updatedLineNumber = oldLineNumber - newLineNumber;
  const updatedMessage = errorMessage.replace(
    regex,
    `line ${updatedLineNumber}`
  );
  return updatedMessage;
}

export const processMainError = (
  error: PythonError | undefined,
  original: string,
  addedOnCode: string
): string | undefined => {
  if (!error) return undefined;
  const ogLines = original.split("\n").length;
  const processedLines = addedOnCode.split("\n").length;

  const diff = processedLines - ogLines;
  // For Sculpt and Brython, the error is a string, not an Error object.
  const processed = offsetErrorLineNumber(
    error.error as unknown as string,
    diff
  );

  return processed;
};

export const processTestError = (
  errorMessage: PythonError | undefined,
  functions: TestFunction[]
): string | undefined => {
  if (!errorMessage) return undefined;
  const errorString = errorMessage?.error as unknown as string;
  const regex = /line (\d+)/;
  const match: RegExpMatchArray | null = errorString.match(regex);
  const line = match ? parseInt(match[1]) : 0;

  // const implLength = impl.split("\n").length;

  let lineNum = 0;
  const funWithError = functions.reduce((acc, fun) => {
    if (typeof acc !== "number") return acc;
    if (fun.length + acc >= line) {
      lineNum = line - acc;
      return fun;
    }
    return acc + fun.length;
  }, 0 as TestFunction | number);


  if (typeof funWithError === "number") {
    return errorString.replace(regex, `line ${line - funWithError}`).concat(" (in Test)");
  }

  const updatedMessage = errorString
    .replace(regex, `line ${lineNum}`)
    .concat(` (${funWithError.def})`);

  return updatedMessage;
};

export function getOutputChopOffBool(output: string): string {
  const res = output.trim();
  if (res.endsWith("True")) {
    return res.substring(0, res.length - 4);
  }
  if (res.endsWith("False")) {
    return res.substring(0, res.length - 5);
  }
  return res;
}

export function extractFunctionName(functionDefinition: string): string | null {
  const match = functionDefinition.match(/def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/);
  return match ? match[1] : null;
}

export function getInitialValuesFromDef(
  def: string
): Pick<GptFunction, "implementation" | "implemented" | "test"> {
  return {
    implementation: `${def}\n    return\n\n\n\n\n\n\n\n`,
    implemented: false,
    test: `def test():\n    # ${def
      .replace("def ", "")
      .replace(
        ":",
        ""
      )}\n    # Return True if the function produces the correct behavior\n    return\n\n\n\n\n\n\n\n`,
  };
}
