import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { Order } from 'src/interfaces/orders.interface';

@Injectable()
export class PaymentService {
  constructor(private configService: ConfigService) {}

  async getToken(order: Order) {
    const midtransClient = require('midtrans-client');

    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';
    
    const serverKey = isProduction
      ? this.configService.get<string>('MIDTRANS_SERVER_KEY')
      : this.configService.get<string>('MIDTRANS_SERVER_KEY_DEV');

    let snap = new midtransClient.Snap({
      isProduction: isProduction,
      serverKey: serverKey,
    });

    const uuid = randomUUID();

    let parameter = {
      transaction_details: {
        order_id: uuid,
        gross_amount: order.totalPrice,
      },
      customer_details: {
        first_name: order.name,
        phone: order.number,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return transaction;
  }
}
