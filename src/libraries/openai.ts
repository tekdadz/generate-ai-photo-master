import { Configuration, OpenAIApi } from "openai";

export const GPT_MODEL = 'text-davinci-003';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export default openai;