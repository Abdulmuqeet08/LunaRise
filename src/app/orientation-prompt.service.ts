// orientation-prompt.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrientationPromptService {
  private shouldDisplay = true;

  getShouldDisplay(): boolean {
    return this.shouldDisplay;
  }

  setShouldDisplay(value: boolean): void {
    this.shouldDisplay = value;
  }
}
