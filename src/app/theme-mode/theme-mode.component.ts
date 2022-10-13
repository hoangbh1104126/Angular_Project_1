import {Component, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'app-mode-switch',
    templateUrl: './theme-mode.component.html',
    styleUrls: ['./theme-mode.component.scss']
})
export class ThemeModeComponent {
  count: number = 0;

  private static readonly DARK_THEME_CLASS = 'dark-theme';
  private static readonly DARK_THEME_LIGHT = 'light';
  private static readonly DARK_THEME_DARK = 'dark';

  public theme: string;

  constructor(@Inject(DOCUMENT) private document: Document) {
      this.theme = this.document.documentElement.classList.contains(ThemeModeComponent.DARK_THEME_CLASS) ? ThemeModeComponent.DARK_THEME_DARK : ThemeModeComponent.DARK_THEME_LIGHT;
  }

  public changeTheme(): void {
    this.count = this.count + 1;
    this.count % 2 == 0 ? this.selectLightTheme() : this.selectDarkTheme();
  }

  public selectDarkTheme(): void {
      this.document.documentElement.classList.add(ThemeModeComponent.DARK_THEME_CLASS);
      this.theme = ThemeModeComponent.DARK_THEME_DARK;
  }

  public selectLightTheme(): void {
      this.document.documentElement.classList.remove(ThemeModeComponent.DARK_THEME_CLASS);
      this.theme = ThemeModeComponent.DARK_THEME_LIGHT;
  }
}
