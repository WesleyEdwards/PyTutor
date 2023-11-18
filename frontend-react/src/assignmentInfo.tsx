import { Divider, Typography } from "@mui/joy";

export type AssignmentInfo = {
  key: string;
  name: string;
  starterCode: string;
  description: JSX.Element;
};

export const assignmentList: AssignmentInfo[] = [
  {
    key: "speech",
    name: "Revise Speech",
    starterCode: `\n\ndef main():\n    initialSpeech = "This umm I guess is umm my thrilling umm speech I guess I will give"\n\n    # TODO: read assignment description\n\nmain()`,
    description: (
      <>
        Write a program that revises speeches. In order to make the speech
        better, do the following:
        <ul>
          <li>Remove all usages of 'umm' and 'I guess'</li>
          <li>Add an exclamation point at the end of the speech!</li>
        </ul>
        Print the following:
        <ul>
          <li>How many times I was going to use the word 'umm'</li>
          <li>How many times I was going to use the phrase 'I guess'</li>
          <li>The speech with the modifications specified above.</li>
        </ul>
        <Divider />
        Example:
        <br />
        Initial Speech:
        <br />
        <code>
          This umm I guess is umm my thrilling umm speech I guess I will give
        </code>
        <br />
        Output:
        <br />
        -------------
        <br />
        <code>
          umm: 3<br />
          I guess: 2<br />
          This is my thrilling speech!
        </code>
        -------------
      </>
    ),
  },
  {
    key: "dna",
    name: "DNA Processing",
    starterCode: `\n\ndef main():\n    s1 = "..T.aA.DERRfDww..t.wwWWwwGC.."\n    s2 = "TTATGTTTTAAGGATGGGGCGTTAGTT"\n    s3 = "TGTGTGTATAT"\n    s4 = "TTATGTTTAAGGATGGGGCGTTAGTT"\n\n    # TODO: read assignment description\n\nmain()`,
    description: (
      <>
        Write a program that processes DNA sequences.
        <ul>
          <li>
            A sequence will be made up of letters <b>A, C, T, and G</b>. All
            others should be ignored.
          </li>
          <li>
            A DNA sequence starts after the sequence <b>ATG</b>
          </li>
          <li>Each DNA sequence is a multiple of 3.</li>
          <li>
            The gene does NOT contain any of the triplets ATG, TAG, TAA, or TGA
          </li>
        </ul>
        Print the gene followed by the gene sequence found in the DNA.
        <Divider />
        Example:
        <Typography sx={{ display: "inline", fontFamily: "monospace" }}>
          <br />
          TAATGC
          <br />
          ---
          <br />
          TTATGTTTTAAGGATGGGGCGTTAGTT
          <br />
          TTT
          <br />
          GGGCGT
          <br />
          ---
          <br />
          TGTGTGTATAT
          <br />
          no gene is found
          <br />
          ---
          <br />
          TTATGTTTAAGGATGGGGCGTTAGTT
          <br />
          GGGCGT
        </Typography>
      </>
    ),
  },

  {
    key: "numbers",
    name: "Analyze Numbers",
    starterCode: `\n\ndef main():\n    myNumbers = [34, 52, 6, 3, 89, 436, 23, 5, 60]\n\n    # TODO: read assignment description\n\nmain()`,
    description: (
      <>
        Write a program that processes a list of numbers. The program should do
        the following:
        <ul>
          <li>Print the average of the numbers</li>
          <li>Print the sum of the numbers</li>
          <li>Print the numbers in reverse order</li>
        </ul>
        <Divider />
        Example: [3, 5, 2, 6, 4] should print the following:
        <Typography sx={{ display: "inline", fontFamily: "monospace" }}>
          <br />
          Average: 4
          <br />
          Sum: 20
          <br />
          Reversed: [4, 6, 2, 5, 3]
        </Typography>
      </>
    ),
  },
];

export const currentAssignment: AssignmentInfo = (() => {
  const params = new URLSearchParams(window.location.search);
  const key = params.get("assignment");

  return assignmentList.find((a) => a.key === key) ?? assignmentList[0];
})();

export const changeAssignment = (assignment: string) => {
  window.location.search = `?assignment=${assignment}`;
};
