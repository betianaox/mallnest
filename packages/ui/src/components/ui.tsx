import type { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { font, radius, spacing, withAlpha } from '../theme';
import { useTheme } from '../theme-context';

// Componentes base. Todos toman los colores del tema activo
// (Mallnest en el listado, la marca de la tienda dentro de una tienda).

export function Screen({
  children,
  edges = ['top', 'left', 'right'],
  style,
}: {
  children: ReactNode;
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  return (
    <SafeAreaView edges={edges} style={[{ flex: 1, backgroundColor: theme.background }, style]}>
      {children}
    </SafeAreaView>
  );
}

type TxtVariant = 'hero' | 'title' | 'body' | 'muted' | 'small' | 'label';

export function Txt({
  children,
  variant = 'body',
  style,
  numberOfLines,
}: {
  children: ReactNode;
  variant?: TxtVariant;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}) {
  const theme = useTheme();
  const variants: Record<TxtVariant, TextStyle> = {
    hero: { fontSize: font.hero, fontWeight: '700', color: theme.text },
    title: { fontSize: font.title, fontWeight: '700', color: theme.text },
    body: { fontSize: font.body, color: theme.text },
    muted: { fontSize: font.body, color: theme.textMuted },
    small: { fontSize: font.small, color: theme.textMuted },
    label: { fontSize: font.small, fontWeight: '600', color: theme.text, letterSpacing: 0.3 },
  };
  return (
    <Text numberOfLines={numberOfLines} style={[variants[variant], style]}>
      {children}
    </Text>
  );
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled,
  style,
}: {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  const bg =
    variant === 'primary' ? theme.primary : variant === 'secondary' ? theme.secondary : 'transparent';
  const color = variant === 'primary' ? theme.onPrimary : theme.primary;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: bg, opacity: disabled ? 0.4 : pressed ? 0.8 : 1 },
        style,
      ]}
    >
      <Text style={[styles.buttonText, { color }]}>{title}</Text>
    </Pressable>
  );
}

export function SearchBar({
  value,
  onChangeText,
  placeholder,
  autoFocus,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  autoFocus?: boolean;
}) {
  const theme = useTheme();
  return (
    <View style={[styles.search, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <Text style={{ color: theme.textMuted, fontSize: 16 }}>⌕</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textMuted}
        autoFocus={autoFocus}
        style={[styles.searchInput, { color: theme.text }]}
        returnKeyType="search"
      />
    </View>
  );
}

export function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: selected ? theme.primary : theme.surface,
          borderColor: selected ? theme.primary : theme.border,
        },
      ]}
    >
      <Text
        style={{ color: selected ? theme.onPrimary : theme.text, fontSize: font.small, fontWeight: '600' }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

/** Etiqueta que identifica las tiendas de ejemplo (decisión 17). */
export function DemoBadge() {
  const theme = useTheme();
  return (
    <View style={[styles.badge, { backgroundColor: withAlpha(theme.text, 0.08) }]}>
      <Text style={{ color: theme.textMuted, fontSize: 11, fontWeight: '700' }}>DEMO</Text>
    </View>
  );
}

/** Marcador para tiendas destacadas, cuando exista la monetización por posición. */
export function FeaturedBadge() {
  const theme = useTheme();
  return (
    <View style={[styles.badge, { backgroundColor: theme.secondary }]}>
      <Text style={{ color: theme.primary, fontSize: 11, fontWeight: '700' }}>Destacada</Text>
    </View>
  );
}

/** Reemplaza las fotos mientras no haya imágenes reales de Shopify. */
export function ImagePlaceholder({
  label,
  height = 140,
  style,
}: {
  label: string;
  height?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  return (
    <View style={[styles.placeholder, { height, backgroundColor: theme.secondary }, style]}>
      <Text style={{ color: theme.primary, fontWeight: '700', fontSize: 28, opacity: 0.55 }}>
        {label.slice(0, 1).toUpperCase()}
      </Text>
    </View>
  );
}

export function IconButton({
  label,
  onPress,
  accessibilityLabel,
  badge,
}: {
  label: string;
  onPress?: () => void;
  accessibilityLabel: string;
  badge?: number;
}) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [styles.iconButton, { opacity: pressed ? 0.6 : 1 }]}
    >
      <Text style={{ color: theme.text, fontSize: 20 }}>{label}</Text>
      {badge ? (
        <View style={[styles.iconBadge, { backgroundColor: theme.primary }]}>
          <Text style={{ color: theme.onPrimary, fontSize: 10, fontWeight: '700' }}>{badge}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { fontSize: font.body, fontWeight: '700' },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    height: 46,
  },
  searchInput: { flex: 1, fontSize: font.body, paddingVertical: 0 },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.pill, alignSelf: 'flex-start' },
  placeholder: { borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  iconButton: { padding: spacing.xs, minWidth: 32, alignItems: 'center' },
  iconBadge: {
    position: 'absolute',
    top: -2,
    right: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
});
