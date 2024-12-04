import { Controller, Get, Param } from '@nestjs/common';
import { PromoService } from './promo.service';

@Controller('/promo')
export class PromoController {
  constructor(private readonly ordersService: PromoService) {}

  @Get(':promo')
  checkPromo(@Param() params: any) {
    return this.ordersService.checkPromo(params.promo);
  }
}
