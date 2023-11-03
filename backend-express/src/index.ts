import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import { generateInstructions, getFunctionFromGPT } from "./helpers";
import { ChatCompletion } from "openai/resources";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", function (req, res) {
  res.send("Hello! welcome to the root of the server");
});

app.post("/gpt-raw", async function (req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  if (token !== process.env.AUTH_TOKEN) {
    res.status(401).send("Unauthorized");
    return;
  }

  const text = req.body.text;

  if (typeof text !== "string") {
    res.status(400).send("Invalid input");
    return;
  }
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: text }],
      model: "gpt-3.5-turbo",
    });
    if (completion.choices.length === 0) {
      res.status(400).send("Error from ChatGPT");
      return;
    }
    res.send(completion.choices[0]);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

app.post("/gpt-function", async function (req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  if (token !== process.env.AUTH_TOKEN) {
    res.status(401).send("Unauthorized");
    return;
  }

  const text = req.body.text;

  if (typeof text !== "string" || !text) {
    res.status(400).send("Invalid input");
    return;
  }

  const instructions = generateInstructions(text);

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: instructions }],
      model: "gpt-3.5-turbo",
    });
    if (completion.choices.length === 0) {
      res.status(400).send("No choices from ChatGPT");
      return;
    }
    const pyFunction = getFunctionFromGPT(completion.choices[0]);
    if (typeof pyFunction === "string") {
      res.status(400).send({
        error: pyFunction,
        raw: completion.choices[0],
      });
      return;
    }
    res.send({ ...pyFunction, raw: completion.choices[0] });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

app.post("/gpt-mock-function", async function (req, res) {
  if (req.headers.authorization?.split(" ")[1] !== process.env.AUTH_TOKEN) {
    return res.status(401).send("Unauthorized");
  }

  const text = req.body.text;

  if (typeof text !== "string" || !text) {
    res.status(400).send("Invalid input");
    return;
  }

  const mockCompletionChoices: ChatCompletion.Choice[] = [
    {
      index: 0,
      message: {
        role: "assistant",
        content:
          "# Start\ndef subtract_numbers(a, b):\n    return a - b\n# End",
      },
      finish_reason: "stop",
    },
    {
      index: 0,
      message: {
        role: "assistant",
        content:
          "# Start\ndef add_numbers(a, b):\n    return a + b\n# End",
      },
      finish_reason: "stop",
    },
    {
      index: 0,
      message: {
        role: "assistant",
        content:
          "# Start\ndef multiply_numbers(a, b):\n    return a * b\n# End",
      },
      finish_reason: "stop",
    },
  ];

  const mockCompletion =
    mockCompletionChoices[
      Math.floor(Math.random() * mockCompletionChoices.length)
    ];


  const pyFunction = getFunctionFromGPT(mockCompletion);

  if (typeof pyFunction === "string") {
    res.status(400).send({
      error: pyFunction,
      raw: mockCompletion,
    });
    return;
  }
  res.send({ ...pyFunction, raw: mockCompletion });
});

app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});
