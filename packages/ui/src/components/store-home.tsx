import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ProductCard } from './product-card';
import { BannerArt, Txt } from './ui';
import { radius, spacing, withAlpha } from '../theme';
import { useTheme } from '../theme-context';
import type { Collection, Product, Store } from '@mallnest/core';

/**
 * Contenido del inicio de una tienda: aviso demo, banners y colecciones destacadas.
 * Es un componente "puro" (recibe todo por props) para poder reutilizarlo
 * en la vista previa de Mallnest Business (más adelante, en packages/ui).
 */
export function StoreHome({
  store,
  collections,
  products,
  onOpenCollection,
  onOpenProduct,
}: {
  store: Store;
  collections: Collection[];
  products: Product[];
  onOpenCollection?: (collectionId: string) => void;
  onOpenProduct?: (productId: string) => void;
}) {
  const theme = useTheme();
  const featured = store.vitrina.featuredCollectionIds
    .map((id) => collections.find((c) => c.id === id))
    .filter((c): c is Collection => Boolean(c));

  return (
    <View style={{ gap: spacing.xl }}>
      {store.isDemo ? (
        <View style={[styles.demo, { backgroundColor: withAlpha(theme.text, 0.06) }]}>
          <Txt variant="small">Tienda de demostración: los productos y las compras son de prueba.</Txt>
        </View>
      ) : null}

      <View style={{ gap: spacing.xs, paddingHorizontal: spacing.lg }}>
        <Txt variant="hero">{store.name}</Txt>
        <Txt variant="muted">{store.tagline}</Txt>
      </View>

      {store.vitrina.banners.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: spacing.md }}
        >
          {store.vitrina.banners.map((banner) => (
            <Pressable
              key={banner.id}
              accessibilityRole="button"
              onPress={() => banner.collectionId && onOpenCollection?.(banner.collectionId)}
              style={[styles.banner, { backgroundColor: theme.primary }]}
            >
              {banner.image ? (
                <Image source={{ uri: banner.image }} style={StyleSheet.absoluteFill} />
              ) : (
                <BannerArt icon={banner.icon} color={theme.onPrimary} />
              )}
              <Txt variant="title" style={{ color: theme.onPrimary }}>
                {banner.title}
              </Txt>
              {banner.subtitle ? (
                <Txt variant="body" style={{ color: withAlpha(theme.onPrimary, 0.85) }}>
                  {banner.subtitle}
                </Txt>
              ) : null}
            </Pressable>
          ))}
        </ScrollView>
      ) : null}

      {featured.map((collection) => {
        const items = products.filter((p) => p.collectionIds.includes(collection.id)).slice(0, 6);
        return (
          <View key={collection.id} style={{ gap: spacing.md }}>
            <View style={styles.sectionHeader}>
              <Txt variant="title">{collection.title}</Txt>
              <Pressable hitSlop={8} onPress={() => onOpenCollection?.(collection.id)}>
                <Txt variant="label" style={{ color: theme.primary }}>
                  Ver todo
                </Txt>
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: spacing.md }}
            >
              {items.map((product) => (
                <View key={product.id} style={{ width: 160 }}>
                  <ProductCard product={product} onPress={() => onOpenProduct?.(product.id)} />
                </View>
              ))}
            </ScrollView>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  demo: { marginHorizontal: spacing.lg, padding: spacing.md, borderRadius: radius.md },
  banner: {
    width: 280,
    height: 140,
    borderRadius: radius.lg,
    padding: spacing.lg,
    justifyContent: 'flex-end',
    gap: 2,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
});
