import { ScrollView, StyleSheet, View } from 'react-native';

import { AISuggestions } from '@/components/ai-suggestions';
import { Card, Field, PageHeader } from '@/components/business-ui';
import { Button, Chip, IconButton, Screen, Txt, useAsync } from '@mallnest/ui';
import { suggestBannerTitles } from '@/services/ai';
import { getMerchantCollections } from '@/services/catalog';
import { useMerchant } from '@/state/merchant-state';
import { spacing } from '@/theme';
import { type Banner } from '@mallnest/core';

// Vitrina: banners y colecciones que aparecen en el inicio de la tienda, y su orden.
export default function VitrinaScreen() {
  const { store, updateStore } = useMerchant();
  const { data: collections = [] } = useAsync(() => getMerchantCollections(), []);
  const { banners, featuredCollectionIds } = store.vitrina;

  const setVitrina = (changes: Partial<typeof store.vitrina>) =>
    updateStore({ vitrina: { ...store.vitrina, ...changes } });

  const updateBanner = (id: string, changes: Partial<Banner>) =>
    setVitrina({ banners: banners.map((b) => (b.id === id ? { ...b, ...changes } : b)) });

  const addBanner = () =>
    setVitrina({
      banners: [...banners, { id: `banner-${Date.now()}`, title: 'Nuevo banner', subtitle: '' }],
    });

  const removeBanner = (id: string) => setVitrina({ banners: banners.filter((b) => b.id !== id) });

  const toggleCollection = (id: string) =>
    setVitrina({
      featuredCollectionIds: featuredCollectionIds.includes(id)
        ? featuredCollectionIds.filter((c) => c !== id)
        : [...featuredCollectionIds, id],
    });

  const move = (index: number, delta: number) => {
    const next = [...featuredCollectionIds];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setVitrina({ featuredCollectionIds: next });
  };

  return (
    <Screen>
      <PageHeader title="Vitrina" subtitle="El inicio de tu tienda" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Txt variant="title">Banners</Txt>
        {banners.map((banner) => (
          <Card key={banner.id}>
            <Field
              label="Título"
              value={banner.title}
              onChangeText={(title) => updateBanner(banner.id, { title })}
              maxLength={40}
            />
            <AISuggestions
              load={() =>
                suggestBannerTitles(store, collections.find((c) => c.id === banner.collectionId)?.title)
              }
              onPick={(title) => updateBanner(banner.id, { title })}
            />
            <Field
              label="Subtítulo"
              value={banner.subtitle ?? ''}
              onChangeText={(subtitle) => updateBanner(banner.id, { subtitle })}
              maxLength={40}
            />
            <View style={{ gap: spacing.sm }}>
              <Txt variant="label">Lleva a la colección</Txt>
              <View style={styles.wrap}>
                {collections.map((c) => (
                  <Chip
                    key={c.id}
                    label={c.title}
                    selected={banner.collectionId === c.id}
                    onPress={() => updateBanner(banner.id, { collectionId: c.id })}
                  />
                ))}
              </View>
            </View>
            <Button title="Quitar banner" variant="ghost" onPress={() => removeBanner(banner.id)} />
          </Card>
        ))}
        <Button title="Agregar banner" variant="secondary" onPress={addBanner} />

        <Txt variant="title" style={{ marginTop: spacing.md }}>
          Colecciones en el inicio
        </Txt>
        <Txt variant="small">Vienen de tu Shopify. Elegí cuáles mostrar y en qué orden.</Txt>
        <View style={styles.wrap}>
          {collections.map((c) => (
            <Chip
              key={c.id}
              label={c.title}
              selected={featuredCollectionIds.includes(c.id)}
              onPress={() => toggleCollection(c.id)}
            />
          ))}
        </View>
        <Card>
          {featuredCollectionIds.length === 0 ? (
            <Txt variant="muted">No hay colecciones seleccionadas.</Txt>
          ) : null}
          {featuredCollectionIds.map((id, index) => (
            <View key={id} style={styles.orderRow}>
              <Txt variant="label" style={{ flex: 1 }}>
                {index + 1}. {collections.find((c) => c.id === id)?.title ?? id}
              </Txt>
              <IconButton label="↑" accessibilityLabel="Subir" onPress={() => move(index, -1)} />
              <IconButton label="↓" accessibilityLabel="Bajar" onPress={() => move(index, 1)} />
            </View>
          ))}
        </Card>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  orderRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
});
