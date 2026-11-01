import { Redirect } from 'expo-router';

import { useMerchant } from '@/state/merchant-state';

// Entrada: sin sesión → login; sin tienda publicada o enviada → alta en 3 pasos; si no → inicio.
export default function Entry() {
  const { user, publishStatus } = useMerchant();
  if (!user) return <Redirect href="/login" />;
  if (publishStatus === 'draft') return <Redirect href="/onboarding" />;
  return <Redirect href="/home" />;
}
