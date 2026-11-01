import { router } from 'expo-router';
import { ScrollView } from 'react-native';

import { StoreHeader } from '@/components/store-header';
import { Button, Screen, StoreHome, useAsync } from '@mallnest/ui';
import { getCollections, getProducts } from '@/services/catalog';
import { useStore } from '@/state/store-context';
import { spacing } from '@/theme';

// Inicio de la tienda: logo, colores, banners y colecciones del comerciante.
export default function StoreHomeScreen() {
  const store = useStore();
  const { data: collections = [] } = useAsync(() => getCollections(store.id), [store.id]);
  const { data: products = [] } = useAsync(() => getProducts(store.id), [store.id]);

  return (
    <Screen>
      <StoreHeader />
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxl, gap: spacing.xl }}>
        <StoreHome
          store={store}
          collections={collections}
          products={products}
          onOpenCollection={(collectionId) =>
            router.push({ pathname: '/store/[storeId]/catalog', params: { storeId: store.id, collectionId } })
          }
          onOpenProduct={(productId) =>
            router.push({
              pathname: '/store/[storeId]/product/[productId]',
              params: { storeId: store.id, productId },
            })
          }
        />
        <Button
          title="Ver todo el catálogo"
          variant="secondary"
          style={{ marginHorizontal: spacing.lg }}
          onPress={() => router.push({ pathname: '/store/[storeId]/catalog', params: { storeId: store.id } })}
        />
      </ScrollView>
    </Screen>
  );
}
