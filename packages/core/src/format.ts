/** Precio con el formato local (pesos argentinos por defecto, sin decimales). */
export function formatPrice(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency, maximumFractionDigits: 0 }).format(
      amount,
    );
  } catch {
    return `$ ${amount.toLocaleString('es-AR')}`;
  }
}
