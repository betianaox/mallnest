import { Redirect } from 'expo-router';
import { FlatList, StyleSheet, Switch, View } from 'react-native';

import { Card, PageHeader } from '@/components/business-ui';
import { DemoBadge, Screen, Txt, useTheme } from '@mallnest/ui';
import { useMerchant } from '@/state/merchant-state';
import { spacing } from '@/theme';

// Panel de aprobación (decisión 12). Solo visible para la administradora de Mallnest.
export default function AdminScreen() {
  const theme = useTheme();
  const { user, adminStores, setApproved } = useMerchant();
  if (!user?.isAdmin) return <Redirect href="/home" />;

  const pending = adminStores.filter((s) => !s.approved).length;

  return (
    <Screen>
      <PageHeader
        title="Aprobación de tiendas"
        subtitle={`${pending} pendiente${pending === 1 ? '' : 's'}`}
      />
      <FlatList
        data={adminStores}
        keyExtractor={(s) => s.id}
        contentContainerStyle={{ padding: spacing.lg, gap: spacing.md }}
        renderItem={({ item }) => (
          <Card style={styles.row}>
            <View style={{ flex: 1, gap: 4 }}>
              <Txt variant="label">{item.name}</Txt>
              <Txt variant="small">{item.category}</Txt>
              {item.isDemo ? <DemoBadge /> : null}
            </View>
            <View style={{ alignItems: 'center', gap: 4 }}>
              <Switch
                value={item.approved}
                onValueChange={(value) => setApproved(item.id, value)}
                trackColor={{ true: theme.primary, false: theme.border }}
                accessibilityLabel={`Aprobar ${item.name}`}
              />
              <Txt variant="small">{item.approved ? 'Publicada' : 'Pendiente'}</Txt>
            </View>
          </Card>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
});
