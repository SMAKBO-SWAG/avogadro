import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OngkirService } from './ongkir.service';

@Controller('/ongkir')
export class OngkirController {
  constructor(private readonly ongkirService: OngkirService) {}

  @Get("/get-ongkir/:city")
  getOngkir(@Param() params : any) {
    return this.ongkirService.getOngkir(params.city);
  }

  @Get("/get-province")
  getProvince() {
    return this.ongkirService.getProvince();
  }

  @Get("/get-city/:province")
  getCity(@Param() params : any) {
    return this.ongkirService.getCity(params.province);
  }
}
