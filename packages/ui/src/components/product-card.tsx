import { Pressable, StyleSheet, View } from 'react-native';

import { ProductArt, Txt } from './ui';
import { formatPrice, type Product } from '@mallnest/core';
import { radius, spacing } from '../theme';
import { useTheme } from '../theme-context';

export function ProductCard({ product, onPress }: { product: Product; onPress: () => void }) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={product.title}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border, opacity: pressed ? 0.85 : 1 },
      ]}
    >
      <ProductArt label={product.title} icon={product.icon} image={product.image} height={130} />
      <View style={styles.info}>
        <Txt variant="label" numberOfLines={2}>
          {product.title}
        </Txt>
        <Txt variant="body" style={{ color: theme.primary, fontWeight: '700' }}>
          {formatPrice(product.price, product.currency)}
        </Txt>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, borderRadius: radius.lg, borderWidth: 1, padding: spacing.sm },
  info: { paddingTop: spacing.sm, paddingHorizontal: spacing.xs, gap: 4 },
});
