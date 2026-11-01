import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { getApprovedStores } from '@/services/stores';
import { type CartLine, type Store } from '@mallnest/core';

// Estado global de la app cliente.
// - stores: listado de tiendas aprobadas.
// - defaultStoreId: tienda predeterminada del cliente (decisión 9).
//   Hoy vive en memoria; después se guarda en el dispositivo (AsyncStorage o similar).
// - carts: un carrito por tienda, porque en Shopify cada carrito pertenece a una tienda.

interface AppState {
  ready: boolean;
  stores: Store[];
  defaultStoreId: string | null;
  setDefaultStore: (storeId: string) => void;
  clearDefaultStore: () => void;
  getCart: (storeId: string) => CartLine[];
  addToCart: (storeId: string, line: CartLine) => void;
  updateQuantity: (storeId: string, index: number, quantity: number) => void;
  clearCart: (storeId: string) => void;
}

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [stores, setStores] = useState<Store[]>([]);
  const [defaultStoreId, setDefaultStoreId] = useState<string | null>(null);
  const [carts, setCarts] = useState<Record<string, CartLine[]>>({});

  useEffect(() => {
    getApprovedStores().then((list) => {
      setStores(list);
      setReady(true);
    });
  }, []);

  const getCart = useCallback((storeId: string) => carts[storeId] ?? [], [carts]);

  const addToCart = useCallback((storeId: string, line: CartLine) => {
    setCarts((prev) => {
      const current = prev[storeId] ?? [];
      const sameKey = (l: CartLine) =>
        l.productId === line.productId &&
        JSON.stringify(l.selectedOptions) === JSON.stringify(line.selectedOptions);
      const existing = current.findIndex(sameKey);
      const next =
        existing >= 0
          ? current.map((l, i) => (i === existing ? { ...l, quantity: l.quantity + line.quantity } : l))
          : [...current, line];
      return { ...prev, [storeId]: next };
    });
  }, []);

  const updateQuantity = useCallback((storeId: string, index: number, quantity: number) => {
    setCarts((prev) => {
      const current = prev[storeId] ?? [];
      const next =
        quantity <= 0
          ? current.filter((_, i) => i !== index)
          : current.map((l, i) => (i === index ? { ...l, quantity } : l));
      return { ...prev, [storeId]: next };
    });
  }, []);

  const clearCart = useCallback((storeId: string) => {
    setCarts((prev) => ({ ...prev, [storeId]: [] }));
  }, []);

  const value = useMemo<AppState>(
    () => ({
      ready,
      stores,
      defaultStoreId,
      setDefaultStore: setDefaultStoreId,
      clearDefaultStore: () => setDefaultStoreId(null),
      getCart,
      addToCart,
      updateQuantity,
      clearCart,
    }),
    [ready, stores, defaultStoreId, getCart, addToCart, updateQuantity, clearCart],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppState {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState debe usarse dentro de AppStateProvider');
  return ctx;
}
