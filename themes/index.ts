import { darkTheme } from './dark';
import { lightTheme } from './light';

export type Theme = typeof darkTheme;
export type ThemeId = string;

export const themeRegistry: Record<string, Theme> = {
  dark: darkTheme,
  light: lightTheme,
};

export const defaultUnlockedThemes: ThemeId[] = ['dark', 'light'];
export { darkTheme, lightTheme };
