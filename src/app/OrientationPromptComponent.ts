// orientation-prompt.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orientation-prompt',
  template: `
    <div *ngIf="isPortrait()" class="orientation-prompt">
      Please rotate your device to landscape mode for a better experience.
    </div>
  `,
  styles: [`
    .orientation-prompt {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: #f00; /* You can customize the styling */
      color: #fff;
      text-align: center;
      padding: 10px;
      z-index: 9999;
    }
  `]
})
export class OrientationPromptComponent implements OnInit {

  isPortrait(): boolean {
    return window.innerWidth < window.innerHeight;
  }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      if (!this.isPortrait()) {
        this.removePrompt();
      }
    });
  }

  removePrompt(): void {
    const prompt = document.querySelector('.orientation-prompt') as HTMLElement;
    if (prompt) {
      prompt.remove();
    }
  }
}
