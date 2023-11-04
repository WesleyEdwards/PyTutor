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
  const { aiapi, addGptFunction } = usePyIOContext();

  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(false);

  const generateFunction = async () => {
    setError("");

    try {
      setFetching(true);
      const gptFun = await aiapi.getGptMockFunction(explanation);
      addGptFunction({
        ...gptFun,
        _id: crypto.randomUUID(),
        explanation: explanation,
      });
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
          onChange={(event) => setExplanation(event.target.value)}
          placeholder="Explanation"
        />
      </FormControl>
      <Button
        disabled={!explanation}
        onClick={generateFunction}
        loading={fetching}
      >
        Generate
      </Button>
      {error && <Alert color="warning">{error}</Alert>}
    </Stack>
  );
};
