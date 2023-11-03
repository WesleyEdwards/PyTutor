import {
  Alert,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Textarea,
} from "@mui/joy";
import { useState } from "react";
import { usePyIOContext } from "./pyIOContext/PyIOContext";

export const FunctionGenerator = () => {
  const [explanation, setExplanation] = useState<string>("");
  const { gptApi, addGptFunction } = usePyIOContext();

  const [error, setError] = useState("");

  const generateFunction = () => {
    setError("");
    gptApi
      .getGptFunction(explanation)
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
