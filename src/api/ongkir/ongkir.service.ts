import { Injectable } from '@nestjs/common';
import { Order } from '../../interfaces/orders.interface';
import { DatabaseService } from '../../database/database.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OngkirService {
  constructor(private configService: ConfigService) {}

  async getOngkir(city: string) {
    const provinceUrl = `${this.configService.get<string>('ONGKIR_URL')}/cost`;

    const data = {
      origin: 78, // Kabupaten Bogor
      destination: city,
      weight: 500,
      courier: 'jne',
    };

    const response = await fetch(provinceUrl, {
      method: 'POST',
      headers: {
        Key: this.configService.get<string>('ONGKIR_API_KEY'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    const { origin_details, destination_details, results } = result.rajaongkir;

    const from = `${origin_details.type} ${origin_details.city_name}`;
    const to = `${destination_details.type} ${destination_details.city_name}`;

    const expeditions = results.find((service) => service.code === 'jne');

    if (!expeditions) {
      return { from, to, service: 'Custom', cost: 10000 };
    }

    const serviceOptions =
      expeditions.costs.find((exp) => exp.service === 'OKE') ||
      expeditions.costs.find((exp) => exp.service === 'REG');

    if (!serviceOptions) {
      return { from, to, service: 'Custom', cost: 10000};
    }

    const { service, cost } = serviceOptions;

    return { from, to, service, cost: cost[0].value };
  }

  async getProvince() {
    const provinceUrl =
      this.configService.get<string>('ONGKIR_URL') + '/province';
    const response = await fetch(provinceUrl, {
      method: 'GET',
      headers: {
        Key: this.configService.get<string>('ONGKIR_API_KEY'),
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    const provinces = result.rajaongkir.results;

    return provinces;
  }

  async getCity(province: string) {
    const provinceUrl =
      this.configService.get<string>('ONGKIR_URL') +
      '/city?province=' +
      province;
    const response = await fetch(provinceUrl, {
      method: 'GET',
      headers: {
        Key: this.configService.get<string>('ONGKIR_API_KEY'),
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    const cities = result.rajaongkir.results.map((city: any) => {
      return {
        city_id: city.city_id,
        city_name: `${city.type} ${city.city_name}`,
      };
    });

    return cities;
  }
}
