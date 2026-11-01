import { Text, View } from 'react-native';

import type { StoreBrand } from '@mallnest/core';

/** Logo de la tienda. Hoy es texto sobre su color; después, la imagen subida a S3. */
export function StoreLogo({ brand, size = 48 }: { brand: StoreBrand; size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        backgroundColor: brand.primary,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: '#FFFFFF',
          fontWeight: '800',
          fontSize: brand.logoText.length > 1 ? size * 0.3 : size * 0.45,
        }}
      >
        {brand.logoText}
      </Text>
    </View>
  );
}
