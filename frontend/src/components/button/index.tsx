import React, {forwardRef} from "react";
import {View, Pressable, type PressableProps, Text} from 'react-native';
import { style } from "./styles";


type Props = PressableProps & {
  text?: string,
  onPress: () => void;
  variant?: 'default' | 'textButton' | 'logoffButton';
}

export const Button = forwardRef<View, Props>(({ text, onPress, variant= 'default', ...rest }, ref) => {
    let containerStyle;
    let labelStyle;
    let viewStyle;

    switch (variant) {
        case 'textButton':
            containerStyle = style.textButton;
            labelStyle = style.textButtonText;
            viewStyle = style.textButtonView;
        break;

        case 'logoffButton':
            containerStyle = style.textButton;
            labelStyle = style.logoffButtonText;
            viewStyle = style.textButtonView;
        break;

        default:
            containerStyle = style.button;
            labelStyle = style.buttonText;
            viewStyle = style.view;
    }

  return(
    <View style={viewStyle}>
    <Pressable style={containerStyle} onPress={onPress}>
      <Text style={labelStyle}>{text}</Text>
    </Pressable>
    </View>
  )
});
