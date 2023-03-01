import { Client, LocalAuth, Message } from 'whatsapp-web.js';
// @ts-ignore
import qrcode from "qrcode-terminal";
import { requestManager } from './requestManager';

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

client.on('disconnected', (reason: string) => {
    console.log(`Client was disconnected: ${reason}`);
});

client.initialize();

client.on('message', async (msg: Message) => {
    const repply = await requestManager(msg) || 'Sorry, seems like I am not able to answer this question.';
    msg.reply(repply);
})


