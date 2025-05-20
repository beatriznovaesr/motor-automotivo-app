import React, {forwardRef, useState} from "react";
import { View, Text, TextInput, type TextInputProps, TextInput as RNTextInput, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { style } from "./styles";

type Props = TextInputProps & {
  title?: string,
  placeholder?: string,
  value?: string;
  showVisibilityToggle?: boolean,
  secureTextEntry?:Boolean,
  onChangeText?: (text: string) => void;
  variant?: 'default' | 'mainScreen';
}

export const Input = forwardRef<RNTextInput, Props>(({ title, placeholder, secureTextEntry, showVisibilityToggle, variant= 'default', ...rest }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const shouldHideText = showVisibilityToggle ? !isVisible : secureTextEntry;

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
        {showVisibilityToggle && (
          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            <MaterialCommunityIcons
              name={isVisible ? 'eye-outline' : 'eye-off-outline'}
              size={24}
              color="#000000"
              style={style.icon}
            />
          </TouchableOpacity>
        )}
    </View>
    </>
  )

})