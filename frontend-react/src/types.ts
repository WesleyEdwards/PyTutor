export type GptFunctionRes = {
  def: string;
  code: string;
  explanation: string;
  raw: any;
};

export type GptFunction = {
  _id: string;
  def: string;
  code: string;
  implementation: string;
  implemented: boolean;
  explanation: string;
  test: string;
};

export type CodeOutput = {
  res: string;
  error?: string;
};
