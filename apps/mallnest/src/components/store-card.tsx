import { Pressable, StyleSheet, View } from 'react-native';

import { DemoBadge, FeaturedBadge, StoreLogo, Txt, useTheme } from '@mallnest/ui';
import { radius, spacing } from '@/theme';
import { type Store } from '@mallnest/core';

/** Miniatura de una tienda en el listado. */
export function StoreCard({ store, onPress }: { store: Store; onPress: () => void }) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Entrar a ${store.name}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border, opacity: pressed ? 0.85 : 1 },
      ]}
    >
      <View style={[styles.cover, { backgroundColor: store.brand.background }]}>
        <StoreLogo brand={store.brand} size={56} />
      </View>
      <View style={styles.body}>
        <View style={styles.badges}>
          {store.featured ? <FeaturedBadge /> : null}
          {store.isDemo ? <DemoBadge /> : null}
        </View>
        <Txt variant="label" numberOfLines={1}>
          {store.name}
        </Txt>
        <Txt variant="small" numberOfLines={2}>
          {store.tagline}
        </Txt>
        <Txt variant="small" style={{ marginTop: spacing.xs }}>
          {store.category}
        </Txt>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, borderRadius: radius.lg, borderWidth: 1, overflow: 'hidden' },
  cover: { height: 110, alignItems: 'center', justifyContent: 'center' },
  body: { padding: spacing.md, gap: 4 },
  badges: { flexDirection: 'row', gap: spacing.xs, minHeight: 0 },
});
