import React, { useState, useCallback } from 'react';

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
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { Load } from '../../components/Load';


export function Home(){
    const [category,  setCategory] = useState('');
    const navigation = useNavigation();
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
    const [loading, setLoading] = useState(true);


    function handleCategorySelect(categoryId: string ){
        //se category id ja tiver marcado ele desmarca (bolinha do card )
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails(guildSelected: AppointmentProps){
        navigation.navigate('AppointmentDetails', { guildSelected })
    }

    function handleAppointmentCrate(){
        navigation.navigate('AppointmentCreate')
    }

    async function loadAppointments(){
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

        //se tiver categoria selecionada
        if(category){
            setAppointments(storage.filter(item => item.category === category));
        }else{
            setAppointments(storage)
        }

        setLoading(false);
    }

    //quando eu voltar pra tela home ele recarregar ela
    useFocusEffect(useCallback(() => {
        loadAppointments();
        //colocando o category, pq toda vez que eu selecionar um nova categoria eu quero que recarregue a listagem
    }, [category]))

    return(
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd 
                    onPress={handleAppointmentCrate}
                />
            </View>

                <CategorySelect 
                    CategorySelected={category}
                    setCategory={handleCategorySelect}
                />

                {
                    loading ? <Load /> :
                    <>
                        <ListHeader 
                            title="Partidas agendadas"
                            subtitle={`Total ${appointments.length}`}
                        />

                        <FlatList 
                            data={appointments}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                    <Appointment 
                                        data={item} 
                                        onPress={() => handleAppointmentDetails(item)}
                                    />
                            )}
                            ItemSeparatorComponent={() => <ListDivider />}
                            contentContainerStyle={{ paddingBottom: 69 }}
                            style={styles.matches}
                            showsVerticalScrollIndicator={false}
                        />
                    </>
                }

        </Background>
    );
}