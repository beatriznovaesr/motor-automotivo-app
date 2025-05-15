import React from 'react';
import { Image, StyleSheet, ImageStyle } from 'react-native';

interface ImagemProps {
  source: any; // pode ser uma imagem local (require) ou remota (URL)
  width?: number;
  height?: number;
  borderRadius?: number;
  style?: ImageStyle;
}

export default function Imagem({ source, width = 100, height = 100, borderRadius = 0, style }: ImagemProps) {
  return (
    <Image
      source={source}
      style={[
        styles.imagem,
        { width, height, borderRadius },
        style
      ]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  imagem: {
    marginBottom: 20,
  },
});
