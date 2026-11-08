import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';

import { StoreCard } from '@/components/store-card';
import { Screen, SearchBar, ThemeProvider, Txt } from '@mallnest/ui';
import { useAppState } from '@/state/app-state';
import { gridItem, platformTheme, radius, spacing } from '@/theme';

// Listado de tiendas con buscador (decisión 9). Usa la marca Mallnest.
// Al elegir una tienda, queda como predeterminada.
export default function StoresScreen() {
  const { stores, setDefaultStore } = useAppState();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return stores;
    return stores.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q),
    );
  }, [stores, query]);

  const openStore = (storeId: string) => {
    setDefaultStore(storeId);
    router.replace({ pathname: '/store/[storeId]', params: { storeId } });
  };

  return (
    <ThemeProvider theme={platformTheme}>
      <Screen>
        <FlatList
          data={filtered}
          keyExtractor={(s) => s.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            <View style={styles.header}>
              <Image
                source={require('../../assets/images/wordmark.png')}
                accessibilityRole="header"
                accessibilityLabel="Mallnest"
                resizeMode="contain"
                style={styles.wordmark}
              />
              <Txt variant="muted">Elegí una tienda para empezar</Txt>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push('/shopper')}
                style={[styles.shopper, { backgroundColor: platformTheme.primary }]}
              >
                <Txt variant="label" style={{ color: platformTheme.onPrimary }}>
                  ✨ Personal shopper
                </Txt>
                <Txt variant="small" style={{ color: platformTheme.onPrimary, opacity: 0.85 }}>
                  Contale qué buscás y busca por vos en todas las tiendas
                </Txt>
              </Pressable>
              <View style={{ marginTop: spacing.sm }}>
                <SearchBar value={query} onChangeText={setQuery} placeholder="Buscar tiendas o rubros" />
              </View>
            </View>
          }
          ListEmptyComponent={
            <Txt variant="muted" style={{ textAlign: 'center', marginTop: spacing.xl }}>
              No encontramos tiendas con “{query}”.
            </Txt>
          }
          renderItem={({ item }) => (
            <View style={gridItem}>
              <StoreCard store={item} onPress={() => openStore(item.id)} />
            </View>
          )}
        />
      </Screen>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.md },
  header: { gap: spacing.xs, marginBottom: spacing.sm },
  // El logotipo mide 1000 x 193.
  wordmark: { width: 150, height: 29, marginBottom: spacing.xs },
  row: { gap: spacing.md },
  shopper: { marginTop: spacing.lg, padding: spacing.lg, borderRadius: radius.lg, gap: 2 },
});
