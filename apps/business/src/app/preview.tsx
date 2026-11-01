import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PageHeader } from '@/components/business-ui';
import { Screen, StoreHome, StoreLogo, ThemeProvider, Txt, useAsync } from '@mallnest/ui';
import { getMerchantCollections, getMerchantProducts } from '@/services/catalog';
import { useMerchant } from '@/state/merchant-state';
import { radius, spacing, storeTheme } from '@/theme';

// Vista previa: la tienda tal como la ve el cliente en Mallnest.
// Usa el mismo componente StoreHome que la app cliente
// (hoy copiado; en el monorepo vivirá en packages/ui).
export default function PreviewScreen() {
  const { store } = useMerchant();
  const theme = useMemo(() => storeTheme(store.brand), [store.brand]);
  const { data: collections = [] } = useAsync(() => getMerchantCollections(), []);
  const { data: products = [] } = useAsync(() => getMerchantProducts(), []);

  return (
    <Screen>
      <PageHeader title="Vista previa" subtitle="Así la ven tus clientes" />
      <View style={styles.frameWrap}>
        <ThemeProvider theme={theme}>
          <View style={[styles.frame, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <View style={styles.fakeHeader}>
              <StoreLogo brand={store.brand} size={36} />
              <Txt variant="label" numberOfLines={1} style={{ flex: 1 }}>
                {store.name}
              </Txt>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: spacing.xl }}>
              <StoreHome store={store} collections={collections} products={products} />
            </ScrollView>
          </View>
        </ThemeProvider>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  frameWrap: { flex: 1, paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },
  frame: { flex: 1, borderWidth: 1, borderRadius: radius.lg * 1.5, overflow: 'hidden' },
  fakeHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, padding: spacing.md },
});
