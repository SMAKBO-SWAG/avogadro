import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from '../../interfaces/orders.interface';

@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() order: Order) {
    return this.ordersService.createOrder(order);
  }

  @Get()
  getAllOrder() {
    return this.ordersService.getAllOrder();
  }
}
