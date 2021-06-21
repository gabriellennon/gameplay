import React from 'react';

import { View, Image, TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import DiscordImg from '../../assets/discord.png';
import { styles } from './styles';

interface Props {
    title: string
}

export function ButtonIcon({ title, ...rest }: Props){
    return(
        <TouchableOpacity style={styles.container} activeOpacity={.7}>
            <View style={styles.iconWrapper}>
                <Image source={DiscordImg} style={styles.icon}  />
            </View>

            <Text style={styles.title}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}