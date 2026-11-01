import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { IconButton, StoreLogo, Txt, useTheme } from '@mallnest/ui';
import { useAppState } from '@/state/app-state';
import { useStore } from '@/state/store-context';
import { spacing } from '@/theme';

/**
 * Encabezado de la tienda.
 * - En el inicio de la tienda muestra el logo y un acceso sutil "Tiendas" para volver
 *   al listado (decisión 9b). No aparece si hay una sola tienda.
 * - En el resto de las pantallas muestra "volver" y el título.
 */
export function StoreHeader({ title, showBack = false }: { title?: string; showBack?: boolean }) {
  const store = useStore();
  const theme = useTheme();
  const { stores, getCart } = useAppState();
  const cartCount = getCart(store.id).reduce((n, l) => n + l.quantity, 0);
  const canSwitchStore = stores.length > 1;

  const goToCart = () => router.push({ pathname: '/store/[storeId]/cart', params: { storeId: store.id } });
  const goToSearch = () =>
    router.push({ pathname: '/store/[storeId]/search', params: { storeId: store.id } });

  return (
    <View style={styles.container}>
      {showBack ? (
        <View style={styles.left}>
          <IconButton label="←" accessibilityLabel="Volver" onPress={() => router.back()} />
          <Txt variant="title" numberOfLines={1} style={{ flex: 1 }}>
            {title ?? store.name}
          </Txt>
        </View>
      ) : (
        <View style={styles.left}>
          <StoreLogo brand={store.brand} size={40} />
          <View style={{ flex: 1 }}>
            <Txt variant="label" numberOfLines={1}>
              {store.name}
            </Txt>
            {canSwitchStore ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Ver todas las tiendas"
                hitSlop={8}
                onPress={() => router.replace('/stores')}
              >
                <Txt variant="small" style={{ color: theme.textMuted }}>
                  ‹ Tiendas
                </Txt>
              </Pressable>
            ) : null}
          </View>
        </View>
      )}
      <View style={styles.actions}>
        <IconButton label="⌕" accessibilityLabel="Buscar productos" onPress={goToSearch} />
        <IconButton label="🛍" accessibilityLabel="Ver carrito" onPress={goToCart} badge={cartCount} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  left: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  actions: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
});
