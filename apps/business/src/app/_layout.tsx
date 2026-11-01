import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemeProvider } from '@mallnest/ui';

import { MerchantProvider } from '@/state/merchant-state';
import { platformTheme } from '@/theme';

export default function RootLayout() {
  return (
    <ThemeProvider theme={platformTheme}>
      <MerchantProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{ headerShown: false, contentStyle: { backgroundColor: platformTheme.background } }}
        />
      </MerchantProvider>
    </ThemeProvider>
  );
}
