import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { ADMIN_STORES, createInitialStore, type AdminStoreRow } from '@/data/merchant';
import { type Store } from '@mallnest/core';

// Estado de la app del comerciante (todo simulado, sin AWS, Shopify ni login real).
// Más adelante:
// - user: Cognito (mail o Google).
// - shopifyDomain: OAuth de Shopify; el token se guarda solo en el backend.
// - store: configuración guardada en DynamoDB / imágenes en S3.
// - publishStatus: lo actualiza la aprobación de la administradora.

export type PublishStatus = 'draft' | 'pending' | 'approved';

export interface MerchantUser {
  email: string;
  isAdmin: boolean;
}

interface MerchantState {
  user: MerchantUser | null;
  signIn: (user: MerchantUser) => void;
  signOut: () => void;
  shopifyDomain: string | null;
  connectShopify: (domain: string) => void;
  store: Store;
  updateStore: (changes: Partial<Store>) => void;
  publishStatus: PublishStatus;
  submitForApproval: () => void;
  adminStores: AdminStoreRow[];
  setApproved: (storeId: string, approved: boolean) => void;
}

const MerchantContext = createContext<MerchantState | null>(null);

export function MerchantProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MerchantUser | null>(null);
  const [shopifyDomain, setShopifyDomain] = useState<string | null>(null);
  const [store, setStore] = useState<Store>(createInitialStore);
  const [publishStatus, setPublishStatus] = useState<PublishStatus>('draft');
  const [adminStores, setAdminStores] = useState<AdminStoreRow[]>(ADMIN_STORES);

  const value = useMemo<MerchantState>(
    () => ({
      user,
      signIn: setUser,
      signOut: () => {
        setUser(null);
        setShopifyDomain(null);
        setStore(createInitialStore());
        setPublishStatus('draft');
        setAdminStores(ADMIN_STORES);
      },
      shopifyDomain,
      connectShopify: setShopifyDomain,
      store,
      updateStore: (changes) => setStore((prev) => ({ ...prev, ...changes })),
      publishStatus,
      submitForApproval: () => {
        setPublishStatus('pending');
        // La tienda aparece en el panel de aprobación de la administradora.
        setAdminStores((prev) =>
          prev.some((s) => s.id === store.id)
            ? prev
            : [
                ...prev,
                { id: store.id, name: store.name, category: store.category, approved: false, isDemo: false },
              ],
        );
      },
      adminStores,
      setApproved: (storeId, approved) => {
        setAdminStores((prev) => prev.map((s) => (s.id === storeId ? { ...s, approved } : s)));
        if (storeId === store.id) setPublishStatus(approved ? 'approved' : 'pending');
      },
    }),
    [user, shopifyDomain, store, publishStatus, adminStores],
  );

  return <MerchantContext.Provider value={value}>{children}</MerchantContext.Provider>;
}

export function useMerchant(): MerchantState {
  const ctx = useContext(MerchantContext);
  if (!ctx) throw new Error('useMerchant debe usarse dentro de MerchantProvider');
  return ctx;
}
