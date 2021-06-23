import React, { useState } from 'react';

import {
    View,
    FlatList,
    Text
} from 'react-native';
import { styles } from './styles';
import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { Appointment } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';

export function Home(){
    const [category,  setCategory] = useState('');

    const appoinments = [
        {
            id: '1',
            guild: {
                id: '1',
                name: 'Lendário',
                icon: null,
                owner:  true
            },
            category: '1',
            date: '22/06 às 20:40h',
            description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
        },
        {
            id: '2',
            guild: {
                id: '1',
                name: 'Lendário',
                icon: null,
                owner:  true
            },
            category: '1',
            date: '22/06 às 20:40h',
            description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
        },
    ]

    function handleCategorySelect(categoryId: string ){
        //se category id ja tiver marcado ele desmarca (bolinha do card )
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    return(
        <View>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd />
            </View>

                <CategorySelect 
                    CategorySelected={category}
                    setCategory={handleCategorySelect}
                />

                <View style={styles.content}>
                    <ListHeader 
                        title="Partidas agendadas"
                        subtitle="Total 6"
                    />

                    <FlatList 
                        data={appoinments}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Appointment data={item} />
                        )}
                        ItemSeparatorComponent={() => <ListDivider />}
                        style={styles.matches}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
        </View>
    );
}