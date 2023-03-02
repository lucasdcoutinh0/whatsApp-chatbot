import { Message } from "whatsapp-web.js";
import { recognizeTextType } from "../nlp/question-recognition";
import { getTextCompletion } from "../openIA/getTextCompletion";
import { getImage } from "../openIA/getImage";
import { getMath } from "../openIA/getMath";

export async function requestManager(msg: Message) {
  const prompt = msg.body;
  const type = await recognizeTextType(prompt);

  if (type === "greeting") {
    console.log("Greeting recieved");
    return `Hey, ${(await msg.getContact()).pushname}, how can i help you ?`;
  } else if (type === "question") {
    console.log("Question recieved");
    const answer = await getTextCompletion({
      prompt: `Question: ${prompt}\nAnswer:`,
      temperature: 0.5,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return msg.reply(answer || "Sorry, i don't know the answer this question");
  } else if (type === "text") {
    console.log("Text recieved");
    const text = await getTextCompletion({
      prompt: prompt,
      temperature: 1,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return msg.reply(text || "Sorry, i don't know the answer this command");
  } else if (type === "image") {
    console.log("Image recieved");
    const image = await getImage(prompt);
    return msg.reply(
      `Here is your image: ${image}` ||
        "Sorry, i don't know how to generate this image"
    );
  } else if (type === "math") {
    console.log("Math recieved");
    const math = await getMath(prompt);
    return msg.reply(math);
  } else {
    console.log("Unknown type recieved");
    const anyText = await getTextCompletion({
        prompt: prompt,
        temperature: 1,
        max_tokens: 300,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    return msg.reply(anyText || "Sorry, i don't know the answer this command");
  }
}
