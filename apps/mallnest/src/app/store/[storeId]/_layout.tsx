import { Redirect, Stack, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';

import { useAppState } from '@/state/app-state';
import { StoreContext } from '@/state/store-context';
import { storeTheme } from '@/theme';
import { ThemeProvider } from '@mallnest/ui';

// Todas las pantallas de una tienda comparten este layout:
// carga la tienda y aplica su marca como tema (logo, colores).
export default function StoreLayout() {
  const { storeId } = useLocalSearchParams<{ storeId: string }>();
  const { stores, ready } = useAppState();
  const store = stores.find((s) => s.id === storeId);
  const theme = useMemo(() => (store ? storeTheme(store.brand) : null), [store]);

  if (ready && (!store || !theme)) return <Redirect href="/stores" />;
  if (!store || !theme) return null;

  return (
    <StoreContext.Provider value={store}>
      <ThemeProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.background } }} />
      </ThemeProvider>
    </StoreContext.Provider>
  );
}
