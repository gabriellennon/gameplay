import React, {useEffect} from 'react';
import { useState } from 'react';
import { 
    View,
    FlatList
} from 'react-native';
import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { Load } from '../../components/Load';
import { api } from '../../services/api';

import { styles } from './styles';

type Props = {
    handleGuildSelect: (guild: GuildProps) => void;
}

export function Guilds({ handleGuildSelect }: Props){
    const [guilds, setGuilds] = useState<GuildProps[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchGuild(){
        const response = await api.get('/users/@me/guilds')

        setGuilds(response.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchGuild();
    }, []);

    return (
      <View style={styles.container}>
          {
              loading ? <Load /> :

                <FlatList 
                data={guilds}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Guild 
                        data={item}
                        onPress={() => handleGuildSelect(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <ListDivider isCenter />}
                contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
                ListHeaderComponent={() => <ListDivider isCenter />}
                style={styles.guilds}
            />
          }
      </View>
    );
}