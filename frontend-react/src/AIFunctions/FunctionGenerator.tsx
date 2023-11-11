import {
  Alert,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Textarea,
} from "@mui/joy";
import { FC, useState } from "react";
import { usePyIOContext } from "../hooks/usePyIOContext";
import { extractFunctionName } from "../utils";

export const FunctionGenerator: FC<{ handleClose: () => void }> = ({
  handleClose,
}) => {
  const [explanation, setExplanation] = useState<string>("");
  const { aiapi, addGptFunction, gptFunctions } = usePyIOContext();

  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(false);

  const checkRepeatEx = aiapi.name !== "mock";

  const generateFunction = async () => {
    setError("");

    if (!explanation && checkRepeatEx)
      return setError("Please enter an explanation.");
    if (
      gptFunctions.find((f) => f.explanation === explanation) &&
      checkRepeatEx
    ) {
      return setError("You've already generated a function for that.");
    }

    try {
      setFetching(true);
      const gptFun = await aiapi.getGptFunction(explanation);
      if (gptFunctions.find((f) => f.def === gptFun.def)) {
        setFetching(false);
        return setError("You've already generated a function for that.");
      }

      addGptFunction({
        ...gptFun,
        _id: crypto.randomUUID(),
        implementation: `${gptFun.def}\n    return False`,
        implemented: false,
        test: `def test_${extractFunctionName(
          gptFun.def
        )}():\n    return False`,
      });

      handleClose();
    } catch (e) {
      setError(
        "Sorry, we couldn't generate a function for that. Please try again."
      );
    }
    setFetching(false);
  };

  return (
    <Stack spacing={2}>
      <FormControl>
        <FormLabel>Write a function that...</FormLabel>
        <Textarea
          minRows={6}
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          placeholder="Explanation"
        />
      </FormControl>
      <Button onClick={generateFunction} loading={fetching}>
        Generate
      </Button>
      {error && <Alert color="warning">{error}</Alert>}
    </Stack>
  );
};
