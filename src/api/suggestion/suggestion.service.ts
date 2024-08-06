import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SuggestionService {
  constructor(private databaseService: DatabaseService) {}

  supabase = this.databaseService.getClient();

  async inputSuggestion(suggestion: string[]) {
    const { data, error } = await this.supabase.from('suggestions').insert({suggestion});

    return suggestion;
  }

  async getAllSuggestion() {

    const { data, error } = await this.supabase.from('suggestions').select('*');

    return data;
  }
}
