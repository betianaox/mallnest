import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemeProvider } from '@mallnest/ui';

import { AppStateProvider } from '@/state/app-state';
import { platformTheme } from '@/theme';

export default function RootLayout() {
  return (
    <ThemeProvider theme={platformTheme}>
      <AppStateProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} />
      </AppStateProvider>
    </ThemeProvider>
  );
}
