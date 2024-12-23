import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [
    // RouterOutlet,
    ThemeToggleComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public onClick(event: MouseEvent): void {
    console.log('Button click', event);
  }
}
