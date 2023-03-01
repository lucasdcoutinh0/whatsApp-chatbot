import dotenv from "dotenv";
import {Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function getImage(prompt: string): Promise<string | undefined> {
    try {
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "256x256",
          });
        return response.data.data[0].url;
    }
    catch (error) {
        console.error(error);
        return undefined;
    }
}

export {getImage};