export type GptFunctionRes = {
  def: string;
  code: string;
  raw: any;
};

export type GptFunction = {
  _id: string;
  def: string;
  code: string;
  implementation?: string;
  explanation: string;
};
