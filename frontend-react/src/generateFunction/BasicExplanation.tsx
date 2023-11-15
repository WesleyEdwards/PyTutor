import {
  Alert,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import { FC, useState } from "react";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { getInitialValuesFromDef } from "../utils";
import { GenError } from "./GenerateFunModal";
import { GptFunction } from "../types";
import { useToast } from "../contexts/Toaster";

export const BasicExplanation: FC<{
  setError: (error?: GenError) => void;
  createFun: (fun: GptFunction) => void;
  moreExplanation?: string;
}> = ({ setError, createFun, moreExplanation }) => {
  const [explanation, setExplanation] = useState<string>(moreExplanation ?? "");
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const { aiapi, gptFunctions } = usePyIOContext();
  const toast = useToast();

  const [fetching, setFetching] = useState(false);

  const checkRepeatEx = aiapi.name !== "mock";

  const processExplanation = () => {
    if (input || output) {
      return `${explanation}\n\nInput Specifications:\n${input}\n\nOutput Specifications:\n${output}`;
    }
    return explanation;
  };

  const generateFunction = async () => {
    setError(undefined);

    if (!explanation && checkRepeatEx) return setError("noExplanation");
    if (
      gptFunctions.find((f) => f.explanation === explanation) &&
      checkRepeatEx
    ) {
      return setError("repeatName");
    }

    try {
      setFetching(true);
      const gptFun = await aiapi.getGptFunction(processExplanation());
      if (gptFunctions.find((f) => f.def === gptFun.def)) {
        setFetching(false);
        return setError("repeatName");
      }

      createFun({
        _id: crypto.randomUUID(),
        ...gptFun,
        ...getInitialValuesFromDef(gptFun.def),
      });
      if (aiapi.name === "mock") {
        toast(
          aiapi.name === "mock"
            ? {
                message: "The generated function was created using MOCK data.",
                color: "warning",
              }
            : {
                message: `AI successfully generated ${gptFun.def}.`,
                color: "success",
              }
        );
      }
    } catch (e) {
      setError("unableToGenerate");
    }
    setFetching(false);
  };

  return (
    <Stack spacing={2} sx={{ my: "10px" }}>
      <Alert color="primary">
        To help the AI generate the correct function, specify the input and
        expected output of the function. Try being specific, using examples, and
        refining your explanation.
      </Alert>
      <FormControl>
        <FormLabel>Explanation</FormLabel>
        <Textarea
          minRows={6}
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          placeholder="Write a function that..."
        />
      </FormControl>
      {moreExplanation && (
        <>
          <Divider />
          <Stack direction="row" gap="1rem">
            <FormControl sx={{ width: "100%" }}>
              <FormLabel>Input</FormLabel>
              <Textarea
                minRows={6}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="The parameters to the function are..."
              />
            </FormControl>
            <FormControl sx={{ width: "100%" }}>
              <FormLabel>Output</FormLabel>
              <Textarea
                minRows={6}
                value={output}
                onChange={(e) => setOutput(e.target.value)}
                placeholder="The function should return..."
              />
            </FormControl>
          </Stack>
        </>
      )}
      <Button
        onClick={generateFunction}
        loading={fetching}
        sx={{ alignSelf: "flex-end" }}
      >
        Generate
      </Button>
    </Stack>
  );
};
