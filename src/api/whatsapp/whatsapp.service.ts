// src/whatsapp/whatsapp.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';

var qrcode = require('qrcode-terminal');

@Injectable()
export class WhatsAppService implements OnModuleInit {
  private client: Client;

  async onModuleInit() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      },
    });

    this.client.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      console.log('Client is ready!');
    });

    this.client.initialize();
  }

  sendMessage(number: string, message: string): void {
    const chatId = `${number}@c.us`;
    this.client.initialize().then(() => {
        this.client.sendMessage(chatId, message)
            .then(response => console.log('Message sent', response))
            .catch(error => console.error('Send message error:', error));
    });
  }
}