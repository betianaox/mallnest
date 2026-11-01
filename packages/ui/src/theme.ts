import type { StoreBrand } from '@mallnest/core';

// Sistema de temas (decisión: todo el diseño sale de un tema central).
// - Cada app define su platformTheme (la marca Mallnest o Mallnest Business).
// - storeTheme(): convierte la marca de cada tienda en un tema completo.
// Ningún componente usa colores fijos: todos leen el tema activo.

export interface Theme {
  primary: string;
  onPrimary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
}

/**
 * Tema base: el que usa un componente fuera de cualquier ThemeProvider. Cada
 * app define su propio `platformTheme` y lo pone en la raíz.
 */
export const baseTheme: Theme = {
  primary: '#5B3FD6',
  onPrimary: '#FFFFFF',
  secondary: '#EEEAFD',
  background: '#FAFAFC',
  surface: '#FFFFFF',
  text: '#16131F',
  textMuted: '#6B6778',
  border: '#E6E3EE',
};

export function storeTheme(brand: StoreBrand): Theme {
  return {
    primary: brand.primary,
    onPrimary: '#FFFFFF',
    secondary: brand.secondary,
    background: brand.background,
    surface: '#FFFFFF',
    text: brand.text,
    textMuted: withAlpha(brand.text, 0.62),
    border: withAlpha(brand.text, 0.1),
  };
}

/** Agrega transparencia a un color hex (#RRGGBB). */
export function withAlpha(hex: string, alpha: number): string {
  const a = Math.round(Math.min(1, Math.max(0, alpha)) * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex}${a}`;
}

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;
export const radius = { sm: 8, md: 12, lg: 18, pill: 999 } as const;
export const font = { small: 13, body: 15, title: 20, hero: 26 } as const;

/** Celda de una grilla de 2 columnas: evita que el último elemento impar ocupe todo el ancho. */
export const gridItem = { flex: 1, maxWidth: '48.5%' } as const;
