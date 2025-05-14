import React, {forwardRef} from "react";
import {View, Text, type TextProps, Text as RNText } from 'react-native';
import {style} from './style'

type Props = TextProps & {
  text?: string,
}

export const PageTitle = forwardRef<RNText, Props>(({ text, ...rest }, ref) => {
  return(
    <View style={style.view}>
      <Text style={style.title}>{text}</Text>
    </View>
  )
});
