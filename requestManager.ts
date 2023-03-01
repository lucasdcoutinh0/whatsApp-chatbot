import { Message } from 'whatsapp-web.js';
import { recognizeTextType } from './nlp/question-recognition';
import { getTextCompletion } from './openIA/getTextCompletion';
import { getImage } from './openIA/getImage';
import { getMath } from './openIA/getMath';

export async function requestManager(msg: Message) {
    const prompt = msg.body;
    const type = await recognizeTextType(prompt);

    if(type === 'greeting'){
        console.log('Greeting recieved');
        return`Hey, ${(await msg.getContact()).pushname}, how can i help you ?`;
    }
    else if(type === 'question') {
        console.log('Question recieved');
        return getTextCompletion({
          prompt: `Question: ${prompt}\nAnswer:`,
          temperature: 0.5,
          max_tokens: 100,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
    }
    else if(type === 'text'){
        console.log('Text recieved');
        return getTextCompletion({
            prompt: prompt,
            temperature: 1,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
    }
    else if(type === 'image'){
        console.log('Image recieved');
        return `Here is your image ${await getImage(prompt)}}`;
    }
    else if(type === 'math'){
        console.log('Math recieved');
        return getMath(prompt);
    }
    else{
        return getTextCompletion({
            prompt: prompt,
            temperature: 1,
            max_tokens: 300,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
    }
}