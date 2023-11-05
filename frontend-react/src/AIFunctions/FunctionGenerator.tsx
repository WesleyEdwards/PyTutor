import {
  Alert,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Textarea,
} from "@mui/joy";
import { useState } from "react";
import { usePyIOContext } from "../pyIOContext/PyIOContext";

export const FunctionGenerator = () => {
  const [explanation, setExplanation] = useState<string>("");
  const { aiapi, addGptFunction, gptFunctions } = usePyIOContext();

  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(false);

  const generateFunction = async () => {
    setError("");

    if (!explanation) return setError("Please enter an explanation.");
    if (
      gptFunctions.find((f) => f.explanation === explanation) &&
      aiapi.name !== "mock"
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

      addGptFunction({ ...gptFun, explanation, _id: crypto.randomUUID() });
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
