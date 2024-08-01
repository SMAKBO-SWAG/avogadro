import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Order } from 'src/interfaces/orders.interface';

@Controller('/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  getToken(@Body() order: Order) {
    return this.paymentService.getToken(order);
  }
}
