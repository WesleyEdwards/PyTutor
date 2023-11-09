import { PythonError } from "client-side-python-runner";

export const testCode = ["for i in range(40):", '\tprint("Time:", i)'].join(
  "\n"
);

export const starterCode = `\n\ndef main():\n    print("Your code goes here")\n\n\n\nmain()`;

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

export const processErrorMessage = (
  error: PythonError | undefined,
  original: string,
  addedOnCode: string
) => {
  if (!error) return;
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