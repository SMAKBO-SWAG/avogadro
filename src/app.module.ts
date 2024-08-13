import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { OrdersModule } from './api/orders/orders.module';
import { PaymentModule } from './api/payment/payment.module';
import { DatabaseModule } from './database/database.module';
import { SuggestionModule } from './api/suggestion/suggestion.module';
import { OngkirModule } from './api/ongkir/ongkir.module';
import { WhatsAppModule } from './api/whatsapp/whatsapp.module';

import { ConfigModule } from '@nestjs/config';
import { WhatsAppService } from './api/whatsapp/whatsapp.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    OrdersModule,
    PaymentModule,
    SuggestionModule,
    OngkirModule,
    WhatsAppModule
  ],
  controllers: [AppController],
  providers: [AppService, WhatsAppService],
})
export class AppModule {}
