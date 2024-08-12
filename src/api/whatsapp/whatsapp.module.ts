// src/whatsapp/whatsapp.module.ts

import { Module } from '@nestjs/common';
import { WhatsAppService } from './whatsapp.service';

@Module({
  providers: [WhatsAppService],
  exports: [WhatsAppService], // Export the service so it can be used in other modules
})
export class WhatsAppModule {}
