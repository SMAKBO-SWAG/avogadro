import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { OrdersModule } from './api/orders/orders.module';
import { PaymentModule } from './api/payment/payment.module';
import { DatabaseModule } from './database/database.module';
import { SuggestionModule } from './api/suggestion/suggestion.module';
import { OngkirModule } from './api/ongkir/ongkir.module';
import { PromoModule } from './api/promo/promo.module';

import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './api/email/email.module';

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
    PromoModule,
    EmailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
