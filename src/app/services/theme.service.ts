import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const THEME_KEY = 'app-theme-preference';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _htmlElement?: HTMLHtmlElement;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // ensure we only access document/window in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this._htmlElement = document.documentElement as HTMLHtmlElement;
    }
  }

  /**
   * Initialize theme on app startup
   */
  public initializeTheme() {
    if (!isPlatformBrowser(this.platformId)) return;
    const savedTheme = this.getSavedTheme();
    const systemTheme = this.getSystemTheme();

    // Prefer saved theme, fall back to system theme
    const initialTheme = savedTheme || systemTheme;
    this.setTheme(initialTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (!this.getSavedTheme()) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  /**
   * Toggle between light and dark themes
   */
  public toggleTheme(): 'light' | 'dark' | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    return newTheme;
  }

  /**
   * Set a specific theme.
   * @param theme 'light' or 'dark'.
   */
  public setTheme(theme: 'light' | 'dark') {
    if (!isPlatformBrowser(this.platformId)) return;

    console.log('Setting theme:', theme);

    // Save theme preference
    localStorage.setItem(THEME_KEY, theme);

    // Set color-scheme on html element
    this._htmlElement?.setAttribute('color-scheme', theme);

    // Toggle theme-specific classes
    if (theme === 'dark') {
      console.log('Adding dark-theme class');
      this._htmlElement?.classList.add('dark-theme');
      this._htmlElement?.classList.remove('light-theme');
    } else {
      console.log('Adding light-theme class');
      this._htmlElement?.classList.add('light-theme');
      this._htmlElement?.classList.remove('dark-theme');
    }
  }
  /**
   * Get the current active theme
   * @returns 'light' or 'dark'.
   */
  public getCurrentTheme(): 'light' | 'dark' {
    if (!isPlatformBrowser(this.platformId)) return 'light';

    return this._htmlElement?.getAttribute('color-scheme') as 'light' | 'dark';
  }

  private getSystemTheme(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  /**
   * Get saved theme preference from localStorage
   * @returns Saved theme or null.
   */
  private getSavedTheme(): 'light' | 'dark' | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const savedTheme = localStorage.getItem(THEME_KEY);
    return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : null;
  }

  /**
   * Set theme based on system preference
   */
  public setThemeFromSystemPreference() {
    if (!isPlatformBrowser(this.platformId)) return;

    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const initialTheme = prefersDarkScheme.matches ? 'dark' : 'light';
    this.setTheme(initialTheme);

    // Use addEventListener instead of deprecated addListener
    prefersDarkScheme.addEventListener('change', (e) => {
      // Only change if no saved preference exists
      if (!this.getSavedTheme()) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}
