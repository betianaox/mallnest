import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Chip, ProductCard, Screen, SearchBar, Txt, useTheme } from '@mallnest/ui';
import { StoreHeader } from '@/components/store-header';
import { personalShopper } from '@/services/ai';
import { searchProducts } from '@/services/catalog';
import { useStore } from '@/state/store-context';
import { gridItem, radius, spacing } from '@/theme';
import { type Product } from '@mallnest/core';

// Búsqueda dentro de la tienda.
// - Inteligente: el personal shopper en "modo tienda" (entiende "algo para regalar hasta 20.000").
// - Común: busca por palabras. Es también el respaldo si la IA no está disponible.
export default function SearchScreen() {
  const store = useStore();
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [smart, setSmart] = useState(true);
  const [results, setResults] = useState<Product[]>([]);
  const [explanation, setExplanation] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const handle = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        setExplanation(null);
        return;
      }
      if (smart) {
        const ai = await personalShopper(query, store.id);
        if (!active) return;
        if (ai) {
          setResults(ai.products);
          setExplanation(ai.explanation);
          return;
        }
      }
      const plain = await searchProducts(store.id, query);
      if (!active) return;
      setResults(plain);
      setExplanation(smart ? 'La búsqueda inteligente no está disponible: usé la búsqueda común.' : null);
    }, 300);
    return () => {
      active = false;
      clearTimeout(handle);
    };
  }, [query, smart, store.id]);

  return (
    <Screen>
      <StoreHeader title="Buscar" showBack />
      <View style={styles.controls}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder={smart ? 'Ej: algo para regalar hasta 20.000' : `Buscar en ${store.name}`}
          autoFocus
        />
        <View style={styles.modes}>
          <Chip label="✨ Inteligente" selected={smart} onPress={() => setSmart(true)} />
          <Chip label="Común" selected={!smart} onPress={() => setSmart(false)} />
        </View>
        {explanation ? (
          <View style={[styles.explanation, { backgroundColor: theme.secondary }]}>
            <Txt variant="small" style={{ color: theme.text }}>
              {explanation}
            </Txt>
          </View>
        ) : null}
      </View>
      <FlatList
        data={results}
        keyExtractor={(p) => p.id}
        numColumns={2}
        columnWrapperStyle={{ gap: spacing.md }}
        contentContainerStyle={{ padding: spacing.lg, gap: spacing.md }}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Txt variant="muted" style={{ textAlign: 'center', marginTop: spacing.xl }}>
            {query.trim()
              ? `Sin resultados para “${query}”.`
              : smart
                ? 'Contanos qué buscás, con tus palabras.'
                : 'Escribí el nombre de un producto.'}
          </Txt>
        }
        renderItem={({ item }) => (
          <View style={gridItem}>
            <ProductCard
              product={item}
              onPress={() =>
                router.push({
                  pathname: '/store/[storeId]/product/[productId]',
                  params: { storeId: store.id, productId: item.id },
                })
              }
            />
          </View>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  controls: { paddingHorizontal: spacing.lg, gap: spacing.sm },
  modes: { flexDirection: 'row', gap: spacing.sm },
  explanation: { padding: spacing.md, borderRadius: radius.md },
});
