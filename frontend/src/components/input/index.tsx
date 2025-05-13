import React, {forwardRef, Fragment} from "react";
import { View, Text, TextInput, type TextInputProps, TextInput as RNTextInput} from "react-native";
import { style } from "./styles";

type Props = TextInputProps & {
  title?: string,
  placeholder?: string,
  value?: string;
  onChangeText?: (text: string) => void;
}

export const Input = forwardRef<RNTextInput, Props>(({ title, placeholder, ...rest }, ref) => {
  return (
    <>
    <View style={style.fragment}>
      <Text style={style.titleInput}>{title}</Text>
    </View>
      <View style={style.boxInput}>
        <TextInput
          ref={ref}
          style={style.input}
          placeholder={placeholder}
          placeholderTextColor='#A6A6A6'
          {...rest}
        />
    </View>
    </>
  )

})