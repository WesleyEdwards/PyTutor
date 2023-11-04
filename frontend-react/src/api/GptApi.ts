import { GptFunctionRes } from "../types";
import { AiApi } from "./AiApi";

const isFunctionRes = (x: any): x is GptFunctionRes => {
  return typeof x.def === "string" && typeof x.code === "string";
};

export class GptApi implements AiApi {
  name = "real";
  private token = import.meta.env.VITE_API_KEY;
  private backendUrl = import.meta.env.VITE_BACKEND_URL;

  async getGptFunction(specs: string): Promise<GptFunctionRes> {
    const functionRes = await fetch(`${this.backendUrl}/gpt/function`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({ text: specs }),
    });

    const functionResJson = await functionRes.json();
    if (!isFunctionRes(functionResJson)) {
      throw new Error("Invalid response from server");
    }
    return functionResJson;
  }

  async getGptMockFunction(specs: string): Promise<GptFunctionRes> {
    const functionRes = await fetch(`${this.backendUrl}/gpt/mock-function`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({ text: specs }),
    });

    const functionResJson = await functionRes.json();
    if (!isFunctionRes(functionResJson)) {
      throw new Error("Invalid response from server");
    }
    return functionResJson;
  }
}
