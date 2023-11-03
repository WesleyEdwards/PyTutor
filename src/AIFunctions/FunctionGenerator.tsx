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
  const [mockEndpoint, setMockEndpoint] = useState(false);

  const generateFunction = () => {
    setError("");
    const promise: Promise<GptFunctionRes> = mockEndpoint
      ? gptApi.getGptMockFunction(explanation)
      : gptApi.getGptFunction(explanation);

    promise
      .then((res) => {
        addGptFunction({ ...res, _id: crypto.randomUUID() });
      })
      .catch(() => {
        setError(
          "Sorry, we couldn't generate a function for that. Please try again."
        );
      });
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
      <Button onClick={generateFunction}>Generate</Button>
      {error && <Alert color="warning">{error}</Alert>}
    </Stack>
  );
};
