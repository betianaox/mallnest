import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { StoreHeader } from '@/components/store-header';
import { Button, Chip, ProductArt, Screen, Txt, useAsync, useTheme } from '@mallnest/ui';
import { formatPrice, getProduct } from '@/services/catalog';
import { useAppState } from '@/state/app-state';
import { useStore } from '@/state/store-context';
import { spacing } from '@/theme';

// Detalle de producto: fotos, precio, descripción y variantes.
export default function ProductScreen() {
  const store = useStore();
  const theme = useTheme();
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const { addToCart } = useAppState();
  const { data: product, loading } = useAsync(() => getProduct(productId), [productId]);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelected(Object.fromEntries(product.options.map((o) => [o.name, o.values[0]])));
    }
  }, [product]);

  if (loading)
    return (
      <Screen>
        <StoreHeader showBack title="" />
      </Screen>
    );
  if (!product) {
    return (
      <Screen>
        <StoreHeader showBack title="Producto" />
        <Txt variant="muted" style={{ padding: spacing.lg }}>
          Este producto no está disponible.
        </Txt>
      </Screen>
    );
  }

  const add = () => {
    addToCart(store.id, {
      productId: product.id,
      title: product.title,
      price: product.price,
      currency: product.currency,
      quantity: 1,
      selectedOptions: selected,
      icon: product.icon,
      image: product.image,
    });
    setAdded(true);
  };

  return (
    <Screen>
      <StoreHeader showBack title="" />
      <ScrollView contentContainerStyle={styles.content}>
        <ProductArt label={product.title} icon={product.icon} image={product.image} height={300} />
        <View style={{ gap: spacing.xs }}>
          <Txt variant="hero">{product.title}</Txt>
          <Txt variant="title" style={{ color: theme.primary }}>
            {formatPrice(product.price, product.currency)}
          </Txt>
        </View>
        <Txt variant="muted">{product.description}</Txt>

        {product.options.map((option) => (
          <View key={option.name} style={{ gap: spacing.sm }}>
            <Txt variant="label">{option.name}</Txt>
            <View style={styles.chips}>
              {option.values.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  selected={selected[option.name] === value}
                  onPress={() => {
                    setSelected((prev) => ({ ...prev, [option.name]: value }));
                    setAdded(false);
                  }}
                />
              ))}
            </View>
          </View>
        ))}

        <Button title={added ? 'Agregado al carrito ✓' : 'Agregar al carrito'} onPress={add} />
        {added ? (
          <Button
            title="Ir al carrito"
            variant="secondary"
            onPress={() => router.push({ pathname: '/store/[storeId]/cart', params: { storeId: store.id } })}
          />
        ) : null}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
