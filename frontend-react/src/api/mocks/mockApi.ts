import { GptFunctionRes } from "../../types";
import { AiApi } from "../AiApi";
import { getRandomMockFunction } from "./mockGptRes";

export class MockApi implements AiApi {
  name = "mock";
  alreadyGenerated: GptFunctionRes[] = [];

  async getGptFunction(): Promise<GptFunctionRes> {
    const randomMockFunction = getRandomMockFunction(this.alreadyGenerated);
    if (!randomMockFunction) return Promise.reject();
    this.alreadyGenerated.push(randomMockFunction);
    return Promise.resolve(randomMockFunction);
  }

  async getGptMockFunction(): Promise<GptFunctionRes> {
    return Promise.reject();
  }
}
