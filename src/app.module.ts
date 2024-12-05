import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { OrdersModule } from './api/orders/orders.module';
import { PaymentModule } from './api/payment/payment.module';
import { DatabaseModule } from './database/database.module';
import { OngkirModule } from './api/ongkir/ongkir.module';
import { PromoModule } from './api/promo/promo.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    OrdersModule,
    PaymentModule,
    OngkirModule,
    PromoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
