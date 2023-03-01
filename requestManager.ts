import { Message } from 'whatsapp-web.js';
import { recognizeTextType } from './nlp/question-recognition';
import { getAnswer } from './openIA/getAnswer';
import { getText } from './openIA/getText';
import { getImage } from './openIA/getImage';

export async function requestManager(msg: Message) {
    const prompt = msg.body;
    const type = await recognizeTextType(prompt);

    if(type === 'question') {
        return getAnswer(prompt);
    }
    else if(type === 'text'){
        return getText(prompt);
    }
    else if(type === 'image'){
        return `Here is your image ${await getImage(prompt)}}`;
    }
    else if(type === 'greeting'){
        return console.log("This is a greeting");
    }
    else{
        return console.log("This is a other");
    }
}