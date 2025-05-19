import React from "react";
import { Image, ImageStyle, StyleProp } from "react-native";

type Props = {
    source: any;
    style?: StyleProp<ImageStyle>;
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
};

export const LogoImage = ({ source, style, resizeMode = 'contain'}: Props) => {
    return (
        <Image
            source= {source}
            style= {style}
            resizeMode= {resizeMode}
        />
    );
};