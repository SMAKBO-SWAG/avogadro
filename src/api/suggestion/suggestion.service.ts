import { Injectable } from '@nestjs/common';

const suggestions: string[][] = [];
@Injectable()
export class SuggestionService {
  inputSuggestion(suggestion: string[]): string[] {
    suggestions.push(suggestion);
    return suggestion;
  }
  getAllSuggestion(): string[][] {
    return suggestions;
  }
}
