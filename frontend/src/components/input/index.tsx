import React, {forwardRef, Fragment} from "react";
import { View, Text, TextInput, type TextInputProps, TextInput as RNTextInput} from "react-native";
import { style } from "./styles";

type Props = TextInputProps & {
  title?: string,
  placeholder?: string,
  value?: string;
  onChangeText?: (text: string) => void;
  variant?: 'default' | 'mainScreen';
}

export const Input = forwardRef<RNTextInput, Props>(({ title, placeholder, variant= 'default', ...rest }, ref) => {
  const textStyle = variant === 'mainScreen' 
  ? style.mainScreenTitleInput 
  : style.titleInput;

  const viewStyle = variant === 'mainScreen' 
  ? style.mainScreenFragment 
  : style.fragment;

  return (
    <>
    <View style={viewStyle}>
      <Text style={textStyle}>{title}</Text>
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