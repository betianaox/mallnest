import { router } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

import { StoreHeader } from '@/components/store-header';
import { Button, IconButton, ImagePlaceholder, Screen, Txt, useTheme } from '@mallnest/ui';
import { formatPrice } from '@/services/catalog';
import { useAppState } from '@/state/app-state';
import { useStore } from '@/state/store-context';
import { radius, spacing } from '@/theme';

// Carrito de esta tienda. En Shopify cada carrito pertenece a una tienda.
export default function CartScreen() {
  const store = useStore();
  const theme = useTheme();
  const { getCart, updateQuantity } = useAppState();
  const lines = getCart(store.id);
  const currency = lines[0]?.currency ?? 'ARS';
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);

  return (
    <Screen>
      <StoreHeader title="Carrito" showBack />
      <FlatList
        data={lines}
        keyExtractor={(l, i) => `${l.productId}-${i}`}
        contentContainerStyle={{ padding: spacing.lg, gap: spacing.md }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', gap: spacing.md, marginTop: spacing.xxl }}>
            <Txt variant="muted">Tu carrito está vacío.</Txt>
            <Button title="Ver productos" variant="secondary" onPress={() => router.back()} />
          </View>
        }
        renderItem={({ item, index }) => {
          const options = Object.entries(item.selectedOptions)
            .map(([k, v]) => `${k}: ${v}`)
            .join(' · ');
          return (
            <View style={[styles.line, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <ImagePlaceholder label={item.title} height={64} style={{ width: 64 }} />
              <View style={{ flex: 1, gap: 2 }}>
                <Txt variant="label" numberOfLines={1}>
                  {item.title}
                </Txt>
                {options ? <Txt variant="small">{options}</Txt> : null}
                <Txt variant="body" style={{ color: theme.primary, fontWeight: '700' }}>
                  {formatPrice(item.price * item.quantity, item.currency)}
                </Txt>
              </View>
              <View style={styles.qty}>
                <IconButton
                  label="−"
                  accessibilityLabel="Restar uno"
                  onPress={() => updateQuantity(store.id, index, item.quantity - 1)}
                />
                <Txt variant="label">{item.quantity}</Txt>
                <IconButton
                  label="+"
                  accessibilityLabel="Sumar uno"
                  onPress={() => updateQuantity(store.id, index, item.quantity + 1)}
                />
              </View>
            </View>
          );
        }}
      />
      {lines.length > 0 ? (
        <View style={[styles.footer, { borderColor: theme.border, backgroundColor: theme.surface }]}>
          <View style={styles.totalRow}>
            <Txt variant="muted">Subtotal</Txt>
            <Txt variant="title">{formatPrice(subtotal, currency)}</Txt>
          </View>
          <Txt variant="small">Envío e impuestos se calculan en el checkout.</Txt>
          <Button
            title="Ir a pagar"
            onPress={() =>
              router.push({ pathname: '/store/[storeId]/checkout', params: { storeId: store.id } })
            }
          />
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  qty: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  footer: { padding: spacing.lg, gap: spacing.sm, borderTopWidth: 1 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
