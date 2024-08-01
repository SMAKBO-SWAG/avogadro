import { Injectable } from '@nestjs/common';
import { Order } from '../../interfaces/orders.interface';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class OrdersService {
  constructor(private databaseService: DatabaseService) {}

  private supabase = this.databaseService.getClient();

  async createOrder(order: Order) {
    const { data, error } = await this.supabase.from('orders').insert(order);

    return order;
  }

  async getAllOrder() {
    const { data, error } = await this.supabase.from('orders').select('*');

    return data;
  }
}
