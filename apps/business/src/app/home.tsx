import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ActionTile, Card, StatusPill } from '@/components/business-ui';
import { Button, Screen, StoreLogo, Txt } from '@mallnest/ui';
import { useMerchant } from '@/state/merchant-state';
import { spacing } from '@/theme';

// Inicio del comerciante: estado de su tienda y accesos rápidos.
export default function HomeScreen() {
  const { user, store, shopifyDomain, publishStatus, signOut } = useMerchant();

  const statusText = {
    draft: 'Completá el alta para enviar tu tienda a revisión.',
    pending: 'Estamos revisando tu tienda. Mientras tanto podés seguir personalizándola.',
    approved: 'Tu tienda ya aparece en Mallnest.',
  }[publishStatus];

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.top}>
          <View style={{ flex: 1 }}>
            <Txt variant="small">Hola, {user?.email}</Txt>
            <Txt variant="hero">Tu local</Txt>
          </View>
        </View>

        <Card>
          <View style={styles.storeRow}>
            <StoreLogo brand={store.brand} size={52} />
            <View style={{ flex: 1, gap: 2 }}>
              <Txt variant="title" numberOfLines={1}>
                {store.name}
              </Txt>
              <Txt variant="small" numberOfLines={1}>
                {shopifyDomain ?? 'Shopify sin conectar'}
              </Txt>
            </View>
          </View>
          <StatusPill status={publishStatus} />
          <Txt variant="muted">{statusText}</Txt>
        </Card>

        <View style={styles.grid}>
          <ActionTile
            title="Marca"
            description="Logo, colores y nombre"
            onPress={() => router.push('/brand')}
          />
          <ActionTile
            title="Vitrina"
            description="Banners y colecciones"
            onPress={() => router.push('/vitrina')}
          />
        </View>
        <View style={styles.grid}>
          <ActionTile
            title="Vista previa"
            description="Tu tienda como la ven tus clientes"
            onPress={() => router.push('/preview')}
          />
          <ActionTile
            title="Compartir"
            description="Link y QR de tu tienda"
            onPress={() => router.push('/share')}
          />
        </View>

        {user?.isAdmin ? (
          <Card>
            <Txt variant="label">Administración</Txt>
            <Txt variant="small">Aprobar las tiendas que se registran en Mallnest.</Txt>
            <Button
              title="Abrir panel de aprobación"
              variant="secondary"
              onPress={() => router.push('/admin')}
            />
          </Card>
        ) : null}

        <Txt variant="small" style={{ textAlign: 'center' }}>
          Productos, precios, stock y pedidos se siguen gestionando en Shopify.
        </Txt>
        <Button
          title="Cerrar sesión"
          variant="ghost"
          onPress={() => {
            signOut();
            router.replace('/login');
          }}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  top: { flexDirection: 'row', alignItems: 'center' },
  storeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  grid: { flexDirection: 'row', gap: spacing.md },
});
