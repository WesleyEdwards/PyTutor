import { Button, FormControl, FormLabel, Stack, Textarea } from "@mui/joy";
import { FC, useState } from "react";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { extractFunctionName } from "../utils";
import { GenError } from "./GenerateFunModal";
import { GptFunction } from "../types";

export const BasicExplanation: FC<{
  setError: (error?: GenError) => void;
  createFun: (fun: GptFunction) => void;
}> = ({ setError, createFun }) => {
  const [explanation, setExplanation] = useState<string>("");
  const { aiapi, gptFunctions } = usePyIOContext();

  const [fetching, setFetching] = useState(false);

  const checkRepeatEx = aiapi.name !== "mock";

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
      const gptFun = await aiapi.getGptFunction(explanation);
      if (gptFunctions.find((f) => f.def === gptFun.def)) {
        setFetching(false);
        return setError("repeatName");
      }

      createFun({
        ...gptFun,
        _id: crypto.randomUUID(),
        implementation: `${gptFun.def}\n    return False`,
        implemented: false,
        test: `def test_${extractFunctionName(
          gptFun.def
        )}():\n    return False`,
      });
    } catch (e) {
      setError("unableToGenerate");
    }
    setFetching(false);
  };

  return (
    <Stack spacing={2}>
      <FormControl>
        <FormLabel>Explanation</FormLabel>
        <Textarea
          minRows={6}
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          placeholder="Write a function that..."
        />
      </FormControl>
      <Button onClick={generateFunction} loading={fetching}>
        Generate
      </Button>
    </Stack>
  );
};
