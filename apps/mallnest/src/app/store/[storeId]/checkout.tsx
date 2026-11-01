import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { StoreHeader } from '@/components/store-header';
import { Button, Screen, Txt, useTheme } from '@mallnest/ui';
import { useAppState } from '@/state/app-state';
import { useStore } from '@/state/store-context';
import { radius, spacing } from '@/theme';

// Checkout simulado.
// Más adelante: se crea el carrito en la Storefront API de Shopify y se abre
// su checkoutUrl con Shopify Checkout Kit para React Native (pago como invitado).
// Pagos, envíos, impuestos y mails los resuelve el Shopify del comerciante.
export default function CheckoutScreen() {
  const store = useStore();
  const theme = useTheme();
  const { clearCart } = useAppState();

  const finish = () => {
    clearCart(store.id);
    router.dismissTo({ pathname: '/store/[storeId]', params: { storeId: store.id } });
  };

  return (
    <Screen>
      <StoreHeader title="Checkout" showBack />
      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Txt variant="title">Checkout de Shopify</Txt>
          <Txt variant="muted">
            Acá se va a abrir el checkout de {store.name} en Shopify, dentro de la app: datos de envío, medio
            de pago y confirmación.
          </Txt>
          {store.isDemo ? (
            <Txt variant="small">Esta es una tienda de demostración: no se realizan compras reales.</Txt>
          ) : null}
        </View>
        <Button title="Simular compra completada" onPress={finish} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  card: { padding: spacing.lg, borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm },
});
