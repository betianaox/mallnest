import { ScrollView } from 'react-native';

import { BrandEditor } from '@/components/brand-editor';
import { PageHeader } from '@/components/business-ui';
import { Screen, Txt } from '@mallnest/ui';
import { spacing } from '@/theme';

// Marca: logo, colores, nombre y miniatura del listado. Los cambios se ven al instante.
export default function BrandScreen() {
  return (
    <Screen>
      <PageHeader title="Marca" subtitle="Así se ve tu tienda en Mallnest" />
      <ScrollView
        contentContainerStyle={{ padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl }}
      >
        <BrandEditor />
        <Txt variant="small">Los cambios se guardan automáticamente.</Txt>
      </ScrollView>
    </Screen>
  );
}
