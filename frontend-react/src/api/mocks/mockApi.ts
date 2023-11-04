import { GptFunctionRes } from "../../types";
import { AiApi } from "../AiApi";
import { getRandomMockFunction } from "./mockGptRes";

export class MockApi implements AiApi {
  name = "mock";
  async getGptFunction(): Promise<GptFunctionRes> {
    return Promise.resolve(getRandomMockFunction());
  }

  async getGptMockFunction(): Promise<GptFunctionRes> {
    return Promise.resolve(getRandomMockFunction());
  }
}
