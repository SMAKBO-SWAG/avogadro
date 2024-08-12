import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DatabaseModule } from 'src/database/database.module';
import { WhatsAppModule } from '../whatsapp/whatsapp.module';

@Module({
  imports: [DatabaseModule, WhatsAppModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
