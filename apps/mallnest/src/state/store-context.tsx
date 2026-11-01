import { createContext, useContext } from 'react';

import { type Store } from '@mallnest/core';

/** Tienda activa dentro de las pantallas de /store/[storeId]. */
export const StoreContext = createContext<Store | null>(null);

export function useStore(): Store {
  const store = useContext(StoreContext);
  if (!store) throw new Error('useStore debe usarse dentro de una tienda');
  return store;
}
