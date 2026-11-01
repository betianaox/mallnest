import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BrandEditor } from '@/components/brand-editor';
import { Card, Field, StepIndicator } from '@/components/business-ui';
import { Button, Screen, StoreLogo, Txt } from '@mallnest/ui';
import { useMerchant } from '@/state/merchant-state';
import { spacing } from '@/theme';

const STEPS = ['Conectar', 'Personalizar', 'Publicar'];

// Alta de tienda en 3 pasos (decisión 18).
export default function OnboardingScreen() {
  const { shopifyDomain, connectShopify, store, submitForApproval } = useMerchant();
  const [step, setStep] = useState(shopifyDomain ? 1 : 0);
  const [domain, setDomain] = useState(shopifyDomain ?? '');
  const [connecting, setConnecting] = useState(false);

  const normalizedDomain = domain.trim().toLowerCase();
  const validDomain = /^[a-z0-9-]+(\.myshopify\.com)?$/.test(normalizedDomain) && normalizedDomain.length > 2;

  // Simula la autorización de Shopify (OAuth). Más adelante abre la pantalla de Shopify
  // y el backend guarda el token de acceso.
  const connect = () => {
    setConnecting(true);
    setTimeout(() => {
      const full = normalizedDomain.endsWith('.myshopify.com')
        ? normalizedDomain
        : `${normalizedDomain}.myshopify.com`;
      connectShopify(full);
      setConnecting(false);
      setStep(1);
    }, 900);
  };

  const publish = () => {
    submitForApproval();
    router.replace('/home');
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={{ gap: spacing.xs }}>
          <Txt variant="hero">Creá tu local en Mallnest</Txt>
          <Txt variant="muted">Tres pasos y queda listo para revisión.</Txt>
        </View>
        <StepIndicator steps={STEPS} current={step} />

        {step === 0 ? (
          <Card>
            <Txt variant="title">1. Conectá tu tienda Shopify</Txt>
            <Txt variant="muted">
              Mallnest usa tus productos, stock y checkout de Shopify. Vas a autorizar el acceso desde la
              pantalla de Shopify.
            </Txt>
            <Field
              label="Dirección de tu tienda"
              value={domain}
              onChangeText={setDomain}
              placeholder="mitienda.myshopify.com"
              autoCapitalize="none"
              keyboardType="url"
            />
            <Button
              title={connecting ? 'Conectando…' : 'Conectar con Shopify'}
              onPress={connect}
              disabled={!validDomain || connecting}
            />
          </Card>
        ) : null}

        {step === 1 ? (
          <Card>
            <Txt variant="title">2. Personalizá tu local</Txt>
            <Txt variant="small">Conectada: {shopifyDomain}</Txt>
            <BrandEditor />
            <Button title="Continuar" onPress={() => setStep(2)} disabled={!store.name.trim()} />
          </Card>
        ) : null}

        {step === 2 ? (
          <Card>
            <Txt variant="title">3. Publicá</Txt>
            <View style={styles.summary}>
              <StoreLogo brand={store.brand} size={48} />
              <View style={{ flex: 1 }}>
                <Txt variant="label">{store.name}</Txt>
                <Txt variant="small">{store.category}</Txt>
              </View>
            </View>
            <Txt variant="muted">
              Revisamos cada tienda antes de que aparezca en Mallnest. Puede demorar un poco: te vamos a
              avisar cuando esté publicada.
            </Txt>
            <Button title="Enviar a aprobación" onPress={publish} />
            <Button title="Volver a personalizar" variant="ghost" onPress={() => setStep(1)} />
          </Card>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.xl, paddingBottom: spacing.xxl },
  summary: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
});
