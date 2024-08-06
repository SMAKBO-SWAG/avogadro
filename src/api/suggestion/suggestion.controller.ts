import { Controller, Get, Post, Body } from '@nestjs/common';
import { SuggestionService } from './suggestion.service';

@Controller('/suggestions')
export class SuggestionController {
  constructor(private readonly suggestionService: SuggestionService) {}

  @Post()
  inputSuggestion(@Body() suggestion: string[]) {
    return this.suggestionService.inputSuggestion(suggestion);
  }

  @Get()
  getAllSuggestion() {
    return this.suggestionService.getAllSuggestion();
  }
}
