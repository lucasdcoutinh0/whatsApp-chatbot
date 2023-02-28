import { Client, LocalAuth, Message } from 'whatsapp-web.js';
// @ts-ignore
import qrcode from "qrcode-terminal";
import { getAnswer } from './openIA/getAnswer';
import {recognizeTextType} from './nlp/question-recognition'

console.log('Application started')

const client = new Client(
    {
        authStrategy: new LocalAuth(),
    },
);

client.on('qr', (qr: string) => {
    console.log("Scan this QR cod with whatsapp")
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

client.on('message', async (msg: Message) => {
    const textType = await recognizeTextType(msg.body);
    if(textType === 'question') {
        msg.reply(
            await getAnswer(msg.body) || "Sorry i dont know the answer for this question."
        )
    }
    else if(textType === 'greetings'){
        msg.reply('Hi, Im a chatbot that uses ia, make a question and i gonna answer you')
    }
    else{
        msg.reply('Sorry i didnt understand what you say, but no worries im working on that')
    }
})


