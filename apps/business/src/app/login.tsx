import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from 'react-native';

import { Field } from '@/components/business-ui';
import { Button, Screen, Txt, useTheme } from '@mallnest/ui';
import { useMerchant } from '@/state/merchant-state';
import { spacing } from '@/theme';

// Registro / login simulado. Más adelante: Cognito con mail o Google.
export default function LoginScreen() {
  const theme = useTheme();
  const { signIn } = useMerchant();
  const [email, setEmail] = useState('');
  const validEmail = /\S+@\S+\.\S+/.test(email);

  const enter = (isAdmin = false) => {
    signIn({ email: isAdmin ? 'admin@mallnest.app' : email || 'comercio@ejemplo.com', isAdmin });
    router.replace('/');
  };

  return (
    <Screen edges={['top', 'bottom', 'left', 'right']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <View style={{ gap: spacing.sm }}>
          <Txt variant="small" style={{ color: theme.primary, fontWeight: '700' }}>
            MALLNEST BUSINESS
          </Txt>
          <Txt variant="hero">Tu tienda Shopify, también en Mallnest</Txt>
          <Txt variant="muted">
            Un local más para tu marca, dentro de un shopping de tiendas. Gratis y desde el celular.
          </Txt>
        </View>

        <View style={{ gap: spacing.md }}>
          <Field
            label="Mail"
            value={email}
            onChangeText={setEmail}
            placeholder="tu@comercio.com"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Button title="Continuar con mail" onPress={() => enter()} disabled={!validEmail} />
          <Button title="Continuar con Google" variant="secondary" onPress={() => enter()} />
        </View>

        <Pressable onPress={() => enter(true)} hitSlop={8} style={{ alignSelf: 'center' }}>
          <Txt variant="small">Entrar como administradora (demo)</Txt>
        </Pressable>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.xl, justifyContent: 'space-between', gap: spacing.xl },
});
