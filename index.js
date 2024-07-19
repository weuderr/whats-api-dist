const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('message', async message => {
    let hello_msg = "Mensagem padrão";
    let msg = message.body.toLowerCase().trim();
    let sender = message.from; // Obtém o remetente da mensagem

    console.log(`Mensagem recebida de ${sender}: ${msg}`);

    if (msg.includes("teste")) {
        if (msg.startsWith('teste ')) {
            const parametro = msg.slice(6).trim();
            let resposta = `Exemplo de resposta para ${parametro}`;
            await message.reply(resposta);
        } else {
            await message.reply(hello_msg);
        }
    } else {
        await message.reply(hello_msg);
    }
});

client.initialize();
