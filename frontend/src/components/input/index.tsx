import React, {forwardRef, useState} from "react";
import { View, Text, TextInput, type TextInputProps, TextInput as RNTextInput, TouchableOpacity} from "react-native";
import { style } from "./styles";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type Props = TextInputProps & {
  title?: string,
  placeholder?: string,
  value?: string,
  showVisibilityToggle?: boolean,
  secureTextEntry?:Boolean,
  onChangeText?: (text: string) => void;
  variant?: 'default' | 'mainScreen';
}

export const Input = forwardRef<RNTextInput, Props>(({ title, placeholder, secureTextEntry, showVisibilityToggle, variant= 'default', ...rest }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const shouldHideText = showVisibilityToggle ? !isVisible : secureTextEntry;
  let textStyle;

  variant === 'mainScreen' ? style.mainScreenTitleInput : style.titleInput;

  return (
    <>
    <View style={style.fragment}>
      <Text style={textStyle}>{title}</Text>
    </View>
      <View style={style.boxInput}>
        <TextInput
          ref={ref}
          style={style.input}
          secureTextEntry={shouldHideText}
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