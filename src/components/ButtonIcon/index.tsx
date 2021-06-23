import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { View, Image, Text } from 'react-native';
import DiscordImg from '../../assets/discord.png';
import { styles } from './styles';

interface Props {
    title: string;
    onPress: () => void;
}

export function ButtonIcon({ title, onPress, ...rest }: Props){
    return(
        <RectButton style={styles.container} activeOpacity={.7} onPress={onPress}>
            <View style={styles.iconWrapper}>
                <Image source={DiscordImg} style={styles.icon}  />
            </View>

            <Text style={styles.title}>
                {title}
            </Text>
        </RectButton>
    );
}