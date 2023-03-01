import dotenv from "dotenv";
import {Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function getAnswer(question: string): Promise<string | undefined> {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Question: ${question}\nAnswer:`,
      temperature: 0.5,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export {getAnswer};
