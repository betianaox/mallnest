import type { ComponentProps, ReactNode } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type ImageSourcePropType,
  type ImageStyle,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { font, radius, spacing, withAlpha } from '../theme';
import { useTheme } from '../theme-context';
import type { ImageRef, StoreBrand } from '@mallnest/core';

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
/** Convierte una ImageRef (URL o recurso empaquetado) en la fuente de <Image>. */
export function imageSource(ref: ImageRef): ImageSourcePropType {
  return typeof ref === 'string' ? { uri: ref } : ref;
}

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

function hashText(text: string): number {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Imagen de un producto. Si hay foto (`image`, que vendrá de Shopify) la muestra;
 * si no, dibuja una ilustración: el icono del producto sobre un fondo con los
 * colores de la tienda y dos formas suaves que cambian según el producto, para
 * que una grilla no se vea repetida. Sin icono, usa la inicial.
 */
export function ProductArt({
  label,
  icon,
  image,
  brand,
  height = 140,
  compact = false,
  style,
}: {
  label: string;
  icon?: string;
  image?: ImageRef;
  /** Colores de otra tienda (en el buscador de Mallnest, que usa el tema de la plataforma). */
  brand?: Pick<StoreBrand, 'primary' | 'secondary'>;
  height?: number;
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  const primary = brand?.primary ?? theme.primary;
  const secondary = brand?.secondary ?? theme.secondary;
  if (image) {
    return (
      <Image
        source={imageSource(image)}
        resizeMode="cover"
        accessibilityLabel={label}
        style={[styles.placeholder, { width: '100%', height, backgroundColor: secondary }, style as StyleProp<ImageStyle>]}
      />
    );
  }
  const h = hashText(label);
  const big = height * (compact ? 0.9 : 1.05);
  const small = height * (compact ? 0.45 : 0.55);
  const flip = h % 2 === 0;
  const glyph = icon && icon in MaterialCommunityIcons.glyphMap ? (icon as IconName) : null;
  return (
    <View
      accessible
      accessibilityLabel={label}
      style={[styles.placeholder, { height, backgroundColor: secondary, overflow: 'hidden' }, style]}
    >
      <View
        style={{
          position: 'absolute',
          width: big,
          height: big,
          borderRadius: big / 2,
          backgroundColor: withAlpha(primary, 0.1),
          top: -big * (0.25 + (h % 7) / 40),
          [flip ? 'right' : 'left']: -big * 0.3,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: small,
          height: small,
          borderRadius: small / 2,
          backgroundColor: withAlpha('#FFFFFF', 0.55),
          bottom: -small * 0.3,
          [flip ? 'left' : 'right']: -small * (0.1 + (h % 5) / 20),
        }}
      />
      {glyph ? (
        <MaterialCommunityIcons name={glyph} size={Math.round(height * (compact ? 0.5 : 0.44))} color={primary} />
      ) : (
        <Text style={{ color: primary, fontWeight: '700', fontSize: Math.round(height * 0.24), opacity: 0.7 }}>
          {label.slice(0, 1).toUpperCase()}
        </Text>
      )}
    </View>
  );
}

/** Ilustración grande y translúcida para el fondo de un banner. */
export function BannerArt({ icon, color }: { icon?: string; color: string }) {
  if (!icon || !(icon in MaterialCommunityIcons.glyphMap)) return null;
  return (
    <View pointerEvents="none" style={styles.bannerArt}>
      <MaterialCommunityIcons name={icon as IconName} size={150} color={withAlpha(color, 0.22)} />
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
  bannerArt: { position: 'absolute', right: -18, top: -10 },
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
