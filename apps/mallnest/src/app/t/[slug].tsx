import { Redirect, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { getStoreBySlug } from '@/services/stores';
import { useAppState } from '@/state/app-state';
import { platformTheme } from '@/theme';
import { type Store } from '@mallnest/core';

// Acceso directo por link o QR (decisión 14): mallnest.app/t/<slug>
// Es un acceso adicional: entra a la tienda y la deja como predeterminada.
// Hoy se puede probar con el esquema de la app: mallnest://t/aurora-studio
// Más adelante: Android App Links + Play Install Referrer (documento, sección 4.2).
export default function StoreLinkEntry() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { setDefaultStore } = useAppState();
  const [store, setStore] = useState<Store | null | undefined>(undefined);

  useEffect(() => {
    getStoreBySlug(slug ?? '').then((s) => {
      if (s && s.status === 'approved') {
        setDefaultStore(s.id);
        setStore(s);
      } else {
        setStore(null);
      }
    });
  }, [slug, setDefaultStore]);

  if (store === undefined) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: platformTheme.background,
        }}
      >
        <ActivityIndicator color={platformTheme.primary} />
      </View>
    );
  }

  if (store === null) return <Redirect href="/stores" />;

  return <Redirect href={{ pathname: '/store/[storeId]', params: { storeId: store.id } }} />;
}
