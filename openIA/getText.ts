import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const getText = async (text: string): Promise<string | undefined> => {
  try {
    const response = await axios({
      method: "POST",
      url: "https://api.openai.com/v1/engines/davinci-codex/completions",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      data: {
        prompt,
        max_tokens: 200,
        n: 0.8,
        stop: ["\n"],
      },
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

  export {getText};