import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); 

async function getAnswer(question: string): Promise<string | undefined> {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/engines/davinci-codex/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      data: {
        'prompt': `Question: ${question}\nAnswer:`,
        'max_tokens': 100,
        'temperature': 0.5,
        'n': 1,
        'stop': '\n'
      }
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export {getAnswer};
