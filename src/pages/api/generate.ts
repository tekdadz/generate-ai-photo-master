import { properties } from '@/config';
import openai, { GPT_MODEL } from '@/libraries/openai';
import replicate, { FOREVER_MODEL } from '@/libraries/replicate';
import type { NextApiRequest, NextApiResponse } from 'next'

interface ResponseType {
  imgUrl?: string;
  message?: string;
}

const generateOppositePrompt = (original: string) => {
  let prompt = `Translate the statement '${original}' to realistic`;
  properties.forEach((property) => {
    prompt = prompt.concat(` , ${property[1]} ${property[0]}`);
  });
  prompt = prompt.concat(' statement without century mentioned');
  return prompt;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { prompt } = req.body;
  const oppositePrompt = generateOppositePrompt(prompt);
  
  try {
    const oppositeResponse = await openai.createCompletion({
      model: GPT_MODEL,
      prompt: oppositePrompt,
      max_tokens: 50,
      temperature: 0.7,
    });
    const imagePrompt = `digital photo of ${oppositeResponse.data.choices[0].text?.trim() as string}`;
    
    const imageResponse = await replicate.run(FOREVER_MODEL, {
      input: { 
        prompt: imagePrompt,
        width: 640,
        height: 640,
        seed: 1335
      },
    });

    const imgUrl = imageResponse.toString();
    res.status(200).json({ imgUrl: imgUrl })
  } catch(e) {
    res.status(500).json({ message: "error" });
  }
}
