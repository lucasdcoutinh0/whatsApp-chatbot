import { Client, LocalAuth, Message } from 'whatsapp-web.js';
// @ts-ignore
import qrcode from "qrcode-terminal";
import { checkUserState } from './auth/checkUserState';

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

client.on('ready', async () => {
    console.log('Client is ready!');
});

client.on('disconnected', (reason: string) => {
    console.log(`Client was disconnected: ${reason}`);
});

client.initialize();

client.on('message', async (msg: Message) => {
    checkUserState({msg, client})
})


