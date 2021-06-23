import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput ,
    Image,
    StatusBar
} from 'react-native';


import { styles } from './styles';
import { Background } from '../../components/Background';
import IllustrationImg from '../../assets/illustration.png';
import { ButtonIcon } from '../../components/ButtonIcon';
import { useNavigation } from '@react-navigation/native';


export function SignIn(){
    const navigation = useNavigation();

    function handleSignIn(){
        navigation.navigate('Home');
    }

    return(
        <Background>
            <View style={styles.container}>
                <Image 
                    source={IllustrationImg} 
                    style={styles.image}
                    //garantindo que a imagem fica bem ajustada ao que eu defini de tamanho
                    resizeMode="stretch"
                />

                <View
                    style={styles.content}
                >
                    <Text style={styles.title}>
                        Conecte-se {'\n'}
                        e organize suas {'\n'}
                        jogatinas
                    </Text>

                    <Text style={styles.subtitle}>
                        Crie grupos para jogar seus games {'\n'}
                        favoritos com seus amigos
                    </Text>

                    <ButtonIcon 
                        title="Entrar com Discord"
                        onPress={handleSignIn}
                    />
                </View>
            </View>
        </Background>
    );
}


//Criando um estado que começa com valor inicial vazio
// const [text, setText] = useState('');
{/* <View style={styles.container}>
            <Text>Hello NLW Together</Text>

            <TextInput 
                style={styles.input} 
                //funcao para observar o text input e toda vez que ele mudar ele guarda no estado
                onChangeText={setText}
            />

            <Text style={{ marginTop: 10 }}>
                Você digitou: { text }
            </Text>
        </View> */}