// src/whatsapp/whatsapp.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';

@Injectable()
export class WhatsAppService implements OnModuleInit {
  private client: Client;

  async onModuleInit() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
      },
    });

    this.client.on('qr', (qr) => {
      console.log('QR RECEIVED', qr);
    });

    this.client.on('ready', () => {
      console.log('Client is ready!');
    });

    this.client.initialize();
  }

  sendMessage(number: string, message: string): void {
    const chatId = `${number}@c.us`;
    this.client.sendMessage(chatId, message);
  }

}
