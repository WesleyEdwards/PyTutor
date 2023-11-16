import {
  Alert,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Stack,
  Textarea,
} from "@mui/joy";
import { FC, useState } from "react";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { getInitialValuesFromDef } from "../utils";
import { Explanation, GenError } from "./GenerateFunModal";
import { GptFunction } from "../types";
import { useToast } from "../contexts/Toaster";
import { useMediaQuery } from "@mui/material";

export const BasicExplanation: FC<{
  setError: (error?: GenError) => void;
  createFun: (fun: GptFunction) => void;
  explanation: Explanation;
  setExplanation: React.Dispatch<React.SetStateAction<Explanation>>;
  moreExplanation: boolean;
}> = ({
  setError,
  createFun,
  explanation,
  setExplanation,
  moreExplanation,
}) => {
  const { aiapi, gptFunctions } = usePyIOContext();
  const toast = useToast();
  const smallScreen = useMediaQuery("(max-width: 700px)");

  const [fetching, setFetching] = useState(false);

  const checkRepeatEx = aiapi.name !== "mock";

  const processExplanation = () => {
    const { general, input, output } = explanation;
    if (input || output) {
      return `${general}\n\nInput Specifications:\n${input}\n\nOutput Specifications:\n${output}`;
    }
    return general;
  };

  const generateFunction = async () => {
    const { general } = explanation;
    setError(undefined);

    if (!general && checkRepeatEx) return setError("noExplanation");
    if (gptFunctions.find((f) => f.explanation === general) && checkRepeatEx) {
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
      {moreExplanation && (
        <Alert color="primary">
          To help the AI generate the correct function, specify the input and
          expected output of the function. Try being specific, using examples,
          and refining your explanation.
        </Alert>
      )}
      <FormControl>
        <FormLabel>Explanation</FormLabel>
        <Textarea
          minRows={6}
          value={explanation.general}
          onChange={(e) =>
            setExplanation((prev) => ({ ...prev, general: e.target.value }))
          }
          placeholder="Write a function that..."
        />
      </FormControl>
      {moreExplanation && (
        <>
          <Divider />
          <Stack direction={smallScreen ? "column" : "row"} gap="1rem">
            <FormControl sx={{ width: "100%" }}>
              <FormLabel>Input</FormLabel>
              <Textarea
                minRows={6}
                value={explanation.input}
                onChange={(e) =>
                  setExplanation((prev) => ({ ...prev, input: e.target.value }))
                }
                placeholder="The parameters to the function are..."
              />
            </FormControl>
            <FormControl sx={{ width: "100%" }}>
              <FormLabel>Output</FormLabel>
              <Textarea
                minRows={6}
                value={explanation.output}
                onChange={(e) =>
                  setExplanation((prev) => ({
                    ...prev,
                    output: e.target.value,
                  }))
                }
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
