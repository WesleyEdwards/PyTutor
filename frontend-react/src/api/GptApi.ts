import { GptFunctionRes } from "../types";
import { AiApi } from "./AiApi";

const isFunctionRes = (x: any): x is GptFunctionRes => {
  return typeof x.def === "string" && typeof x.code === "string";
};

export class GptApi implements AiApi {
  name = "real";
  private token = import.meta.env.VITE_API_KEY;
  private backendUrl = import.meta.env.VITE_BACKEND_URL;

  async apiCall(params: {
    body: { [key: string]: unknown };
    method: "POST" | "GET";
    path: string;
  }): Promise<string> {
    const { body, method, path } = params;
    const response = await fetch(`${this.backendUrl}/${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(body),
    });

    const json = await response.json();
    return json;
  }

  async getGptFunction(explanation: string): Promise<GptFunctionRes> {
    const functionResJson = await this.apiCall({
      body: { explanation },
      method: "POST",
      path: "gpt/function",
    });
    if (!isFunctionRes(functionResJson)) {
      throw new Error("Invalid response from server");
    }
    return functionResJson;
  }

  async getGptMockFunction(explanation: string): Promise<GptFunctionRes> {
    const functionResJson = await this.apiCall({
      body: { explanation },
      method: "POST",
      path: "gpt/mock-function",
    });

    if (!isFunctionRes(functionResJson)) {
      throw new Error("Invalid response from server");
    }
    return functionResJson;
  }
}
