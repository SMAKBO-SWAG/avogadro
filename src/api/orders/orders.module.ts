import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DatabaseModule } from 'src/database/database.module';
import { EmailService } from '../email/email.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrdersController],
  providers: [OrdersService, EmailService],
})
export class OrdersModule {}
