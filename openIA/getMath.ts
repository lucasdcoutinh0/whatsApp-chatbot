import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.WOLFRAM_API_KEY;

export const getMath = async (math: string) => {
    try{
        const response = await axios.get('http://api.wolframalpha.com/v2/query', {
            params: {
              input: math,
              appid: apiKey,
              output: 'json'
            }
          })
        return response.data.queryresult.pods[1].subpods[0].plaintext;
    }
    catch(error: any){
        console.error(error.response.data);
    }
}