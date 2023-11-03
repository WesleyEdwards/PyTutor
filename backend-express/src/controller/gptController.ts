import express, { RequestHandler, Express } from "express";
import OpenAI from "openai";
import { gptFunction, gptMockFunction, gptRaw } from "./gptFunctions";

type Route = {
  path: string;
  method: "post" | "put" | "get" | "delete";
  endpointBuilder: (aiClient: OpenAI) => RequestHandler;
};

export const controller =
  (name: string, routes: Route[]) => (app: Express, aiClient: OpenAI) => {
    const router = express.Router();
    routes.forEach((route) => {
      router.use(route.path, (req, res, next) => {
        if (req.method.toLowerCase() === route.method) {
          if (
            req.headers.authorization?.split(" ")[1] !== process.env.AUTH_TOKEN
          ) {
            return res.status(401).send("Unauthorized");
          }

          next();
        }
      });
      router[route.method](route.path, route.endpointBuilder(aiClient));
    });
    app.use(`/${name}`, router);
  };

export const gptController = controller("gpt", [
  {
    path: "/raw",
    method: "post",
    endpointBuilder: gptRaw,
  },
  {
    path: "/function",
    method: "post",
    endpointBuilder: gptFunction,
  },
  {
    path: "/mock-function",
    method: "post",
    endpointBuilder: gptMockFunction,
  },
]);
