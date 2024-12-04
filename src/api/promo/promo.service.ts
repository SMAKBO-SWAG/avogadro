import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class PromoService {
  constructor(
    private databaseService: DatabaseService
  ) {}

  private supabase = this.databaseService.getClient();

  async checkPromo(promo: String) {
    const { data, error } = await this.supabase
        .from('promo')
        .select('available')
        .eq('name', promo)
        .single();

    if (error) {
      return error;
    }

    return data;
  }
}
