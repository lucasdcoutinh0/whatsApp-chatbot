import axios from "axios";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
const openai = new OpenAIApi(configuration);

type Props = {
    prompt: string;
    temperature: number;
    max_tokens: number;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
};

const getTextCompletion = async (props: Props) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: props.prompt,
            temperature: props.temperature,
            max_tokens: props.max_tokens,
            top_p: props.top_p,
            frequency_penalty: props.frequency_penalty,
            presence_penalty: props.presence_penalty,
        });
        return response.data.choices[0].text;
    } catch (error: any) {
      console.error(error.response.data);
      return undefined;
    }
};

export { getTextCompletion };