import { Module } from '@nestjs/common';
import { SuggestionController } from './suggestion.controller';
import { SuggestionService } from './suggestion.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SuggestionController],
  providers: [SuggestionService],
})
export class SuggestionModule {}
