import React from 'react';
import { View, Image, Text, ScrollView } from 'react-native';

import { styles } from './styles';
import { CDN_IMAGE } from '../../configs';
// const { CDN_IMAGE } = process.env;
import DiscordSvg from '../../assets/discord.svg';

type Props = {
    guildId: string;
    iconId: string | null;
}

export function GuildIcon({guildId, iconId}: Props){
    const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;
    


    return(
        <View style={styles.container}>
            {
                iconId ?
                <Image 
                    source={{ uri }}
                    style={styles.image}
                    resizeMode="cover"
                />
                :
                <DiscordSvg 
                    width={40}
                    height={40}
                />
            }
        </View>
    );
}