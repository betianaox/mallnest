import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from 'react-native';

import {
  Button,
  IconButton,
  ImagePlaceholder,
  Screen,
  SearchBar,
  StoreLogo,
  ThemeProvider,
  Txt,
} from '@mallnest/ui';
import { personalShopper } from '@/services/ai';
import { formatPrice } from '@/services/catalog';
import { useAppState } from '@/state/app-state';
import { platformTheme, radius, spacing } from '@/theme';
import { type Product } from '@mallnest/core';

const EXAMPLES = [
  'Algo para regalar hasta 20.000',
  'Café para filtro',
  'Deco para el living',
  'Buzo abrigado',
];

// Personal shopper general: busca en TODAS las tiendas de Mallnest.
// Si la IA no está disponible, lo avisa y ofrece explorar las tiendas.
export default function ShopperScreen() {
  const { stores } = useAppState();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [asked, setAsked] = useState<string | null>(null);
  const [results, setResults] = useState<Product[]>([]);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  const ask = async (text: string) => {
    if (!text.trim()) return;
    setQuery(text);
    setLoading(true);
    setAsked(text);
    const response = await personalShopper(text);
    setLoading(false);
    if (!response) {
      setUnavailable(true);
      setResults([]);
      setExplanation(null);
      return;
    }
    setUnavailable(false);
    setResults(response.products);
    setExplanation(response.explanation);
  };

  return (
    <ThemeProvider theme={platformTheme}>
      <Screen>
        <View style={styles.header}>
          <IconButton label="←" accessibilityLabel="Volver" onPress={() => router.back()} />
          <View style={{ flex: 1 }}>
            <Txt variant="title">✨ Personal shopper</Txt>
            <Txt variant="small">Busco por vos en todas las tiendas</Txt>
          </View>
        </View>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <FlatList
            data={results}
            keyExtractor={(p) => p.id}
            contentContainerStyle={styles.list}
            keyboardShouldPersistTaps="handled"
            ListHeaderComponent={
              <View style={{ gap: spacing.md }}>
                {asked ? (
                  <View style={[styles.bubbleUser, { backgroundColor: platformTheme.primary }]}>
                    <Txt variant="body" style={{ color: platformTheme.onPrimary }}>
                      {asked}
                    </Txt>
                  </View>
                ) : (
                  <View style={{ gap: spacing.sm }}>
                    <Txt variant="muted">Contame qué buscás, con tus palabras. Por ejemplo:</Txt>
                    <View style={styles.examples}>
                      {EXAMPLES.map((e) => (
                        <Pressable
                          key={e}
                          onPress={() => ask(e)}
                          style={[
                            styles.example,
                            { borderColor: platformTheme.border, backgroundColor: platformTheme.surface },
                          ]}
                        >
                          <Txt variant="small" style={{ color: platformTheme.text }}>
                            {e}
                          </Txt>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                )}
                {loading ? <Txt variant="muted">Buscando en las tiendas…</Txt> : null}
                {!loading && explanation ? (
                  <View style={[styles.bubbleAi, { backgroundColor: platformTheme.secondary }]}>
                    <Txt variant="body">
                      {explanation}{' '}
                      {results.length
                        ? `Encontré ${results.length} opción${results.length === 1 ? '' : 'es'}.`
                        : 'No encontré coincidencias; probá con otras palabras.'}
                    </Txt>
                  </View>
                ) : null}
                {!loading && unavailable ? (
                  <View style={[styles.bubbleAi, { backgroundColor: platformTheme.secondary }]}>
                    <Txt variant="body">
                      El personal shopper no está disponible ahora. Podés explorar las tiendas.
                    </Txt>
                    <Button title="Ver tiendas" variant="ghost" onPress={() => router.back()} />
                  </View>
                ) : null}
              </View>
            }
            renderItem={({ item }) => {
              const store = stores.find((s) => s.id === item.storeId);
              return (
                <Pressable
                  accessibilityRole="button"
                  onPress={() =>
                    router.push({
                      pathname: '/store/[storeId]/product/[productId]',
                      params: { storeId: item.storeId, productId: item.id },
                    })
                  }
                  style={[
                    styles.result,
                    { backgroundColor: platformTheme.surface, borderColor: platformTheme.border },
                  ]}
                >
                  <ImagePlaceholder label={item.title} height={64} style={{ width: 64 }} />
                  <View style={{ flex: 1, gap: 2 }}>
                    <Txt variant="label" numberOfLines={1}>
                      {item.title}
                    </Txt>
                    <Txt variant="body" style={{ color: platformTheme.primary, fontWeight: '700' }}>
                      {formatPrice(item.price, item.currency)}
                    </Txt>
                    {store ? (
                      <View style={styles.storeRow}>
                        <StoreLogo brand={store.brand} size={18} />
                        <Txt variant="small" numberOfLines={1}>
                          {store.name}
                        </Txt>
                      </View>
                    ) : null}
                  </View>
                </Pressable>
              );
            }}
          />
          <View
            style={[
              styles.inputBar,
              { borderColor: platformTheme.border, backgroundColor: platformTheme.background },
            ]}
          >
            <View style={{ flex: 1 }}>
              <SearchBar value={query} onChangeText={setQuery} placeholder="¿Qué estás buscando?" />
            </View>
            <Button
              title="Buscar"
              onPress={() => ask(query)}
              disabled={!query.trim() || loading}
              style={{ paddingHorizontal: spacing.lg }}
            />
          </View>
        </KeyboardAvoidingView>
      </Screen>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  list: { padding: spacing.lg, gap: spacing.md },
  examples: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  example: {
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  bubbleUser: { alignSelf: 'flex-end', maxWidth: '85%', padding: spacing.md, borderRadius: radius.lg },
  bubbleAi: {
    alignSelf: 'flex-start',
    maxWidth: '92%',
    padding: spacing.md,
    borderRadius: radius.lg,
    gap: spacing.sm,
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  storeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  inputBar: {
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.md,
    borderTopWidth: 1,
    alignItems: 'center',
  },
});
