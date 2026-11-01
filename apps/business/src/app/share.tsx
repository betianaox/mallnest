import { useMemo } from 'react';
import { ScrollView, Share, StyleSheet, View } from 'react-native';

import { Card, PageHeader } from '@/components/business-ui';
import { Button, Screen, Txt, useTheme } from '@mallnest/ui';
import { useMerchant } from '@/state/merchant-state';
import { radius, spacing } from '@/theme';

// Compartir: link y QR de la tienda (decisión 14, acceso directo adicional).
export default function ShareScreen() {
  const theme = useTheme();
  const { store, publishStatus } = useMerchant();
  const link = `https://mallnest.app/t/${store.slug}`;

  const share = () =>
    Share.share({ message: `Comprá en ${store.name} desde Mallnest: ${link}` }).catch(() => undefined);

  return (
    <Screen>
      <PageHeader title="Compartir" subtitle="Llevá a tus clientes directo a tu tienda" />
      <ScrollView contentContainerStyle={styles.content}>
        {publishStatus !== 'approved' ? (
          <Card style={{ backgroundColor: theme.secondary }}>
            <Txt variant="small">El link va a funcionar cuando tu tienda esté publicada.</Txt>
          </Card>
        ) : null}

        <Card style={{ alignItems: 'center' }}>
          <FakeQr seed={store.slug} color={theme.text} />
          <Txt variant="small">QR de ejemplo (se generará con el link real)</Txt>
        </Card>

        <Card>
          <Txt variant="label">Tu link</Txt>
          <View style={[styles.link, { borderColor: theme.border }]}>
            <Txt variant="body" numberOfLines={1}>
              {link}
            </Txt>
          </View>
          <Button title="Compartir link" onPress={share} />
        </Card>

        <Txt variant="small">
          Ideas: ponelo en la bio de Instagram, mandalo por WhatsApp o imprimí el QR para el mostrador.
        </Txt>
      </ScrollView>
    </Screen>
  );
}

/** Dibujo de QR decorativo para el mock. Se reemplaza por un QR real del link. */
function FakeQr({ seed, color }: { seed: string; color: string }) {
  const size = 21;
  const cells = useMemo(() => {
    let h = 0;
    for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const out: boolean[] = [];
    for (let i = 0; i < size * size; i++) {
      h = (h * 1103515245 + 12345) >>> 0;
      const x = i % size;
      const y = Math.floor(i / size);
      const inFinder = (fx: number, fy: number) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7;
      if (inFinder(0, 0) || inFinder(size - 7, 0) || inFinder(0, size - 7)) {
        const lx = inFinder(0, 0) ? x : inFinder(size - 7, 0) ? x - (size - 7) : x;
        const ly = inFinder(0, size - 7) ? y - (size - 7) : y;
        const ring = lx === 0 || lx === 6 || ly === 0 || ly === 6;
        const core = lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4;
        out.push(ring || core);
      } else {
        out.push((h >>> 16) % 2 === 0);
      }
    }
    return out;
  }, [seed]);

  const cell = 8;
  return (
    <View
      style={{ width: size * cell, height: size * cell, flexDirection: 'row', flexWrap: 'wrap', padding: 0 }}
    >
      {cells.map((on, i) => (
        <View key={i} style={{ width: cell, height: cell, backgroundColor: on ? color : 'transparent' }} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  link: { borderWidth: 1, borderRadius: radius.md, padding: spacing.md },
});
