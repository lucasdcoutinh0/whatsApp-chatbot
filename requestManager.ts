import { Message } from 'whatsapp-web.js';
import { recognizeTextType } from './nlp/question-recognition';
import { getAnswer } from './openIA/getAnswer';
import { getText } from './openIA/getText';
import { getImage } from './openIA/getImage';
import { getMath } from './openIA/getMath';

export async function requestManager(msg: Message) {
    const prompt = msg.body;
    const type = await recognizeTextType(prompt);

    if(type === 'question') {
        console.log('Question recieved');
        return getAnswer(prompt);
    }
    else if(type === 'text'){
        console.log('Text recieved');
        return getText(prompt);
    }
    else if(type === 'image'){
        console.log('Image recieved');
        return `Here is your image ${await getImage(prompt)}}`;
    }
    else if(type === 'greeting'){
        console.log('Greeting recieved');
        return`Hey, ${(await msg.getContact()).pushname}, how can i help you ?`;
    }
    else if(type === 'math'){
        console.log('Math recieved');
        return getMath(prompt);
    }
    else{
        return console.log("This is a other");
    }
}