import { type Theme } from '@mallnest/ui';

// Tema de Mallnest Business. El sistema de temas (tokens, storeTheme y ThemeProvider)
// vive en @mallnest/ui; acá solo está la marca propia de esta app.
export { font, gridItem, radius, spacing, storeTheme, withAlpha, type Theme } from '@mallnest/ui';

export const platformTheme: Theme = {
  primary: '#3B2A9E',
  onPrimary: '#FFFFFF',
  secondary: '#E9E6F8',
  background: '#F7F6FB',
  surface: '#FFFFFF',
  text: '#16131F',
  textMuted: '#6B6778',
  border: '#E6E3EE',
};
