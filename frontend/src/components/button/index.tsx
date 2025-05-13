import React, {forwardRef} from "react";
import {View, Pressable, type PressableProps, Text} from 'react-native';
import { style } from "./styles";


type Props = PressableProps & {
  text?: string,
  onPress: () => void;
}

export const Button = forwardRef<View, Props>(({ text, onPress, ...rest }, ref) => {
  return(
    <View style={style.view}>
    <Pressable style={style.button} onPress={onPress}>
      <Text style={style.buttonText}>{text}</Text>
    </Pressable>
    </View>
  )
});
