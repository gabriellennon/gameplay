import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { View, Image, Text } from 'react-native';
import { styles } from './styles';

interface Props {
    title: string;
    onPress: () => void;
}

export function Button({ title, onPress, ...rest }: Props){
    return(
        <RectButton style={styles.container} activeOpacity={.7} onPress={onPress}>
            <Text style={styles.title}>
                {title}
            </Text>
        </RectButton>
    );
}