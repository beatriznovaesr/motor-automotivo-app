import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { style } from './style';

interface TextoLinkProps {
  texto: string;
  onPress: () => void;
}

export default function TextoLink({ texto, onPress }: TextoLinkProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style.linkText}>{texto}</Text>
    </TouchableOpacity>
  );
}
