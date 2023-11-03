import OpenAI from "openai";
import { generateInstructions, getFunctionFromGPT } from "../helpers";
import { getMockProcessedFunction } from "../mocks";
import { Request, Response } from "express";

type GPTReq = (aiClient: OpenAI) => (req: Request, res: Response) => void;

export const gptRaw: GPTReq = (aiClient) => async (req, res) => {
  const text = req.body.text;

  if (typeof text !== "string") {
    res.status(400).send("Invalid input");
    return;
  }
  try {
    const completion = await aiClient.chat.completions.create({
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
};

export const gptFunction: GPTReq = (aiClient) => async (req, res) => {
  const text = req.body.text;

  if (typeof text !== "string" || !text) {
    res.status(400).send("Invalid input");
    return;
  }

  const instructions = generateInstructions(text);

  try {
    const completion = await aiClient.chat.completions.create({
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
};
export const gptMockFunction: GPTReq = () => async (req, res) => {
  const text = req.body.text;

  if (typeof text !== "string" || !text) {
    res.status(400).send("Invalid input");
    return;
  }

  res.send(getMockProcessedFunction());
};
