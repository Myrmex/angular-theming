import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent implements OnInit {
  isDarkMode = false;

  constructor(private themeService: ThemeService) {}

  public ngOnInit() {
    this.themeService.initializeTheme();
    // set initial theme
    this.updateThemeMode();
  }

  public toggleTheme() {
    this.themeService.toggleTheme();
    this.updateThemeMode();
  }

  private updateThemeMode() {
    this.isDarkMode = this.themeService.getCurrentTheme() === 'dark';
  }
}
