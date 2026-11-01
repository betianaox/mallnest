import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import { Chip, ProductCard, Screen, Txt, useAsync } from '@mallnest/ui';
import { StoreHeader } from '@/components/store-header';
import { getCollections, getProducts } from '@/services/catalog';
import { useStore } from '@/state/store-context';
import { gridItem, spacing } from '@/theme';

// Catálogo: colecciones (como filtros) y listado de productos.
export default function CatalogScreen() {
  const store = useStore();
  const params = useLocalSearchParams<{ collectionId?: string }>();
  const [collectionId, setCollectionId] = useState<string | undefined>(params.collectionId);

  const { data: collections = [] } = useAsync(() => getCollections(store.id), [store.id]);
  const { data: products = [], loading } = useAsync(
    () => getProducts(store.id, collectionId),
    [store.id, collectionId],
  );

  return (
    <Screen>
      <StoreHeader title="Catálogo" showBack />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        contentContainerStyle={styles.chips}
      >
        <Chip label="Todo" selected={!collectionId} onPress={() => setCollectionId(undefined)} />
        {collections.map((c) => (
          <Chip
            key={c.id}
            label={c.title}
            selected={collectionId === c.id}
            onPress={() => setCollectionId(c.id)}
          />
        ))}
      </ScrollView>
      <FlatList
        data={products}
        keyExtractor={(p) => p.id}
        numColumns={2}
        columnWrapperStyle={{ gap: spacing.md }}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          loading ? undefined : <Txt variant="muted">No hay productos en esta colección.</Txt>
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
  chips: { paddingHorizontal: spacing.lg, gap: spacing.sm, paddingBottom: spacing.md },
  list: { padding: spacing.lg, paddingTop: spacing.sm, gap: spacing.md },
});
