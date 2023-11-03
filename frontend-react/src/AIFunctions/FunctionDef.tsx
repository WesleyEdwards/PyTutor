import { Button, FormControl, FormLabel, Textarea } from "@mui/joy";
import { FC, useState } from "react";
import { GptFunction } from "../pyIOContext/PythonIOProvider";

export const FunctionDef: FC<{ gptFun: GptFunction }> = ({ gptFun }) => {
  const [implementation, setImplementation] = useState<string>();

  return (
    <>
      {implementation !== undefined ? (
        <FormControl>
          <FormLabel>Your own code goes here...</FormLabel>
          <Textarea
            minRows={6}
            value={implementation}
            onChange={(event) => setImplementation(event.target.value)}
            placeholder="Explanation"
          />
        </FormControl>
      ) : (
        <Button
          sx={{ m: "1rem", width: "50%", alignSelf: "center" }}
          onClick={() => setImplementation(gptFun.def)}
        >
          Implement
        </Button>
      )}
    </>
  );
};
