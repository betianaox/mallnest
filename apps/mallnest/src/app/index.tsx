import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { useAppState } from '@/state/app-state';
import { platformTheme } from '@/theme';

// Lógica al abrir la app (documento, sección 3.1):
// 1. Si hay una sola tienda aprobada → entra directo.
// 2. Si el cliente ya eligió una predeterminada → entra directo.
// 3. Si no → listado de tiendas.
// (El acceso por link/QR entra por la ruta /t/[slug].)
export default function Entry() {
  const { ready, stores, defaultStoreId } = useAppState();

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: platformTheme.background,
        }}
      >
        <ActivityIndicator color={platformTheme.primary} />
      </View>
    );
  }

  if (stores.length === 1) {
    return <Redirect href={{ pathname: '/store/[storeId]', params: { storeId: stores[0].id } }} />;
  }

  if (defaultStoreId && stores.some((s) => s.id === defaultStoreId)) {
    return <Redirect href={{ pathname: '/store/[storeId]', params: { storeId: defaultStoreId } }} />;
  }

  return <Redirect href="/stores" />;
}
