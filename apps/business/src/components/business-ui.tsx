import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, type StyleProp, type ViewStyle } from 'react-native';

import { IconButton, Txt, useTheme } from '@mallnest/ui';
import type { PublishStatus } from '@/state/merchant-state';
import { font, radius, spacing } from '@/theme';

// Componentes propios del panel del comerciante.

export function PageHeader({
  title,
  subtitle,
  back = true,
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
}) {
  return (
    <View style={styles.header}>
      {back ? <IconButton label="←" accessibilityLabel="Volver" onPress={() => router.back()} /> : null}
      <View style={{ flex: 1 }}>
        <Txt variant="title">{title}</Txt>
        {subtitle ? <Txt variant="small">{subtitle}</Txt> : null}
      </View>
    </View>
  );
}

export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const theme = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }, style]}>
      {children}
    </View>
  );
}

export function Field({
  label,
  value,
  onChangeText,
  placeholder,
  hint,
  autoCapitalize,
  keyboardType,
  maxLength,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  hint?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'url';
  maxLength?: number;
}) {
  const theme = useTheme();
  return (
    <View style={{ gap: spacing.xs }}>
      <Txt variant="label">{label}</Txt>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textMuted}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        maxLength={maxLength}
        style={[
          styles.input,
          { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface },
        ]}
      />
      {hint ? <Txt variant="small">{hint}</Txt> : null}
    </View>
  );
}

/** Indicador de pasos del alta de tienda (decisión 18: conectar, personalizar, publicar). */
export function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  const theme = useTheme();
  return (
    <View style={styles.steps}>
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <View key={label} style={styles.step}>
            <View
              style={[
                styles.stepDot,
                {
                  backgroundColor: done || active ? theme.primary : theme.surface,
                  borderColor: done || active ? theme.primary : theme.border,
                },
              ]}
            >
              <Text
                style={{
                  color: done || active ? theme.onPrimary : theme.textMuted,
                  fontWeight: '700',
                  fontSize: 12,
                }}
              >
                {done ? '✓' : i + 1}
              </Text>
            </View>
            <Txt
              variant="small"
              style={{ color: active ? theme.text : theme.textMuted, fontWeight: active ? '700' : '400' }}
            >
              {label}
            </Txt>
          </View>
        );
      })}
    </View>
  );
}

const STATUS_LABEL: Record<PublishStatus, string> = {
  draft: 'Borrador',
  pending: 'Pendiente de aprobación',
  approved: 'Publicada',
};

export function StatusPill({ status }: { status: PublishStatus }) {
  const colors: Record<PublishStatus, { bg: string; fg: string }> = {
    draft: { bg: '#ECEAF2', fg: '#4A4658' },
    pending: { bg: '#FDF1D6', fg: '#7A5200' },
    approved: { bg: '#DDF3E4', fg: '#14532D' },
  };
  return (
    <View style={[styles.pill, { backgroundColor: colors[status].bg }]}>
      <Text style={{ color: colors[status].fg, fontWeight: '700', fontSize: font.small }}>
        {STATUS_LABEL[status]}
      </Text>
    </View>
  );
}

export function ActionTile({
  title,
  description,
  onPress,
}: {
  title: string;
  description: string;
  onPress: () => void;
}) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        { backgroundColor: theme.surface, borderColor: theme.border, opacity: pressed ? 0.85 : 1 },
      ]}
    >
      <Txt variant="label">{title}</Txt>
      <Txt variant="small">{description}</Txt>
    </Pressable>
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
  card: { borderWidth: 1, borderRadius: radius.lg, padding: spacing.lg, gap: spacing.md },
  input: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 46,
    fontSize: font.body,
  },
  steps: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
  step: { flex: 1, alignItems: 'center', gap: spacing.xs },
  stepDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pill: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  tile: {
    flex: 1,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.xs,
    minHeight: 96,
  },
});
