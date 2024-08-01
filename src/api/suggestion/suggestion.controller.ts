import { Controller, Get, Post, Body } from '@nestjs/common';
import { SuggestionService } from './suggestion.service';

@Controller('/suggestions')
export class SuggestionController {
  constructor(private readonly suggestionService: SuggestionService) {}

  @Post()
  inputSuggestion(@Body() suggestion: string[]): string[] {
    console.log(suggestion);
    return this.suggestionService.inputSuggestion(suggestion);
  }

  @Get()
  getAllSuggestion(): string[][] {
    return this.suggestionService.getAllSuggestion();
  }
}
