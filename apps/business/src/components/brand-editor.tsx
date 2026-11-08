import { Pressable, StyleSheet, View } from 'react-native';

import { AISuggestions } from '@/components/ai-suggestions';
import { Field } from '@/components/business-ui';
import { Chip, StoreLogo, Txt } from '@mallnest/ui';
import { BRAND_PALETTE } from '@/data/merchant';
import { suggestTaglines } from '@/services/ai';
import { useMerchant } from '@/state/merchant-state';
import { radius, spacing } from '@/theme';
import { type StoreCategory } from '@mallnest/core';

const CATEGORIES: StoreCategory[] = ['Moda', 'Cafetería', 'Pastelería', 'Deco', 'Mascotas', 'Otros'];

/**
 * Edición de la marca: nombre, frase, rubro, logo y color.
 * Se usa en el paso 2 del alta y en la pantalla "Marca".
 */
export function BrandEditor() {
  const { store, updateStore } = useMerchant();

  return (
    <View style={{ gap: spacing.lg }}>
      <View style={[styles.preview, { backgroundColor: store.brand.background }]}>
        <StoreLogo brand={store.brand} size={56} />
        <View style={{ flex: 1 }}>
          <Txt variant="label" style={{ color: store.brand.text }} numberOfLines={1}>
            {store.name || 'Nombre de tu tienda'}
          </Txt>
          <Txt variant="small" style={{ color: store.brand.text, opacity: 0.7 }} numberOfLines={2}>
            {store.tagline}
          </Txt>
        </View>
      </View>

      <Field
        label="Nombre de la tienda"
        value={store.name}
        onChangeText={(name) => updateStore({ name })}
        maxLength={40}
      />
      <Field
        label="Frase corta"
        value={store.tagline}
        onChangeText={(tagline) => updateStore({ tagline })}
        hint="Aparece en el listado de tiendas de Mallnest."
        maxLength={60}
      />
      <AISuggestions load={() => suggestTaglines(store)} onPick={(tagline) => updateStore({ tagline })} />

      <View style={{ gap: spacing.sm }}>
        <Txt variant="label">Rubro</Txt>
        <View style={styles.wrap}>
          {CATEGORIES.map((category) => (
            <Chip
              key={category}
              label={category}
              selected={store.category === category}
              onPress={() => updateStore({ category })}
            />
          ))}
        </View>
      </View>

      <Field
        label="Logo"
        value={store.brand.logoText}
        onChangeText={(logoText) =>
          updateStore({ brand: { ...store.brand, logoText: logoText.toUpperCase() } })
        }
        hint="Por ahora, una o dos letras. Después vas a poder subir tu imagen."
        autoCapitalize="characters"
        maxLength={3}
      />

      <View style={{ gap: spacing.sm }}>
        <Txt variant="label">Color principal</Txt>
        <View style={styles.wrap}>
          {BRAND_PALETTE.map((palette) => {
            const selected = palette.primary === store.brand.primary;
            return (
              <Pressable
                key={palette.primary}
                accessibilityRole="button"
                accessibilityLabel={`Color ${palette.primary}`}
                accessibilityState={{ selected }}
                onPress={() => updateStore({ brand: { ...store.brand, ...palette } })}
                style={[
                  styles.swatch,
                  { backgroundColor: palette.primary, borderColor: selected ? '#16131F' : 'transparent' },
                ]}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  preview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
  },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  swatch: { width: 40, height: 40, borderRadius: 20, borderWidth: 3 },
});
