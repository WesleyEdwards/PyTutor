import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Stack,
  Textarea,
} from "@mui/joy";
import { useState } from "react";
import { usePyIOContext } from "../pyIOContext/PyIOContext";
import { GptFunctionRes } from "../api/GptApi";

export const FunctionGenerator = () => {
  const [explanation, setExplanation] = useState<string>("");
  const { gptApi, addGptFunction } = usePyIOContext();

  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(false);
  const [mockEndpoint, setMockEndpoint] = useState(
    import.meta.env.MODE === "development"
  );

  const generateFunction = async () => {
    setError("");
    const promise: Promise<GptFunctionRes> = mockEndpoint
      ? gptApi.getGptMockFunction(explanation)
      : gptApi.getGptFunction(explanation);

    try {
      setFetching(true);
      const gptFun = await promise;
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
      {import.meta.env.MODE === "development" && (
        <Checkbox
          label="Mock endpoint"
          checked={mockEndpoint}
          onChange={(e) => setMockEndpoint(e.target.checked)}
        />
      )}
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
