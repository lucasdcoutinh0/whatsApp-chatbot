import { Client, LocalAuth } from 'whatsapp-web.js';
// @ts-ignore
import qrcode from "qrcode-terminal";


const client = new Client(
    {
        authStrategy: new LocalAuth(),
    },
);

client.on('qr', (qr: string) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();
