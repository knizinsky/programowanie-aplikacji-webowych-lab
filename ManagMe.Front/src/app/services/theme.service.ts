import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly themeKey = 'user-theme';
  isDarkTheme = false;

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
    localStorage.setItem(this.themeKey, this.isDarkTheme ? 'dark' : 'light');
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey);

    if (savedTheme) {
      this.isDarkTheme = savedTheme === 'dark';
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.isDarkTheme = prefersDark;
    }

    document.body.classList.toggle('dark-theme', this.isDarkTheme);
  }
}
