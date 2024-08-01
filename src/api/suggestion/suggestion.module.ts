import { Module } from '@nestjs/common';
import { SuggestionController } from './suggestion.controller';
import { SuggestionService } from './suggestion.service';

@Module({
  imports: [],
  controllers: [SuggestionController],
  providers: [SuggestionService],
})
export class SuggestionModule {}
