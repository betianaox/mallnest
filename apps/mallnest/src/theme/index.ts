import { type Theme } from '@mallnest/ui';

// Tema de Mallnest. El sistema de temas (tokens, storeTheme y ThemeProvider)
// vive en @mallnest/ui; acá solo está la marca propia de esta app.
export { font, gridItem, radius, spacing, storeTheme, withAlpha, type Theme } from '@mallnest/ui';

export const platformTheme: Theme = {
  primary: '#5B3FD6',
  onPrimary: '#FFFFFF',
  secondary: '#EEEAFD',
  background: '#FAFAFC',
  surface: '#FFFFFF',
  text: '#16131F',
  textMuted: '#6B6778',
  border: '#E6E3EE',
};
