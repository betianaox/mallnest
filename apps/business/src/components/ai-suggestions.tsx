import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Txt, useTheme } from '@mallnest/ui';
import { radius, spacing } from '@/theme';

/**
 * Botón "Sugerir con IA" + opciones para elegir.
 * Si la IA no está disponible (fallback agotado), avisa y el comerciante sigue a mano.
 */
export function AISuggestions({
  load,
  onPick,
}: {
  load: () => Promise<string[] | null>;
  onPick: (text: string) => void;
}) {
  const theme = useTheme();
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'unavailable'>('idle');
  const [options, setOptions] = useState<string[]>([]);

  const run = async () => {
    setState('loading');
    const result = await load();
    if (!result) {
      setState('unavailable');
      return;
    }
    setOptions(result);
    setState('done');
  };

  return (
    <View style={{ gap: spacing.sm }}>
      <Pressable
        accessibilityRole="button"
        onPress={run}
        disabled={state === 'loading'}
        style={[styles.trigger, { borderColor: theme.primary }]}
      >
        <Txt variant="label" style={{ color: theme.primary }}>
          {state === 'loading' ? 'Pensando…' : '✨ Sugerir con IA'}
        </Txt>
      </Pressable>
      {state === 'unavailable' ? (
        <Txt variant="small">La IA no está disponible en este momento. Podés escribirlo a mano.</Txt>
      ) : null}
      {state === 'done'
        ? options.map((option) => (
            <Pressable
              key={option}
              accessibilityRole="button"
              onPress={() => onPick(option)}
              style={[styles.option, { backgroundColor: theme.secondary }]}
            >
              <Txt variant="body">{option}</Txt>
            </Pressable>
          ))
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  option: { padding: spacing.md, borderRadius: radius.md },
});
