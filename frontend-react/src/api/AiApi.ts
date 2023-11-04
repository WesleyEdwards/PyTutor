import { GptFunctionRes } from "../types";

export interface AiApi {
  name: string;
  getGptFunction(specs: string): Promise<GptFunctionRes>;
  getGptMockFunction(specs: string): Promise<GptFunctionRes>;
}
