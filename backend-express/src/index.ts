import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import { gptController } from "./controller/gptController";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/", function (req, res) {
  res.send("Hello! welcome to the root of the server");
});

gptController(app, openai);

app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});
