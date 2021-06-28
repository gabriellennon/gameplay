import React, { 
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect
} from 'react';

import * as AuthSession from 'expo-auth-session';
import {  
    REDIRECT_URI,
    SCOPE,
    RESPONSE_TYPE,
    CLIENT_ID,
    CDN_IMAGE
} from '../configs';

//pegando das variaveis dde ambiente
// const { REDIRECT_URI } = process.env;
// const { SCOPE } = process.env;
// const { RESPONSE_TYPE } = process.env;
// const { CLIENT_ID } = process.env;
// const { CDN_IMAGE } = process.env;


import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_USER } from '../configs/database';

type User = {
    id: string;
    username: string;
    firstName: string;
    avatar: string;
    email: string;
    token: string;
}

type AuthContextData = {
    user: User;
    signIn: () => Promise<void>;
    loading: boolean;
    signOut:  () => Promise<void>;
}

type AuthProviderProps = {
    children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params: {
        access_token?: string;
        error?: string;
    }
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<User>({
        //caso eu queira fazer dados mocados
        // id: '1',
        // username: 'Gabrie',
        // firstName: 'Gabriel',
        // avatar: 'gabriel.png',
        // email: 'gabriel@email.com',
        // token: '2222'
    } as User)

    const [loading, setLoading] = useState(false);

    async function signIn() {
        try {
            setLoading(true);
            
            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

            const { type, params } = await AuthSession
            //pra onde o usuario tem que ir quando comecar a autenticacao
            .startAsync({ authUrl }) as AuthorizationResponse;

            if(type === 'success' && !params.error){
                api.defaults.headers.authorization = `Bearer ${params.access_token}`;

                const userInfo = await api.get('/users/@me');
                const firstName = userInfo.data.username.split(' ')[0];
                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

                const userData = {
                    ...userInfo.data,
                    firstName,
                    token: params.access_token
                }

                await AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(userData));
                setUser(userData);
            }

        } catch (error) {
            throw new Error('Não foi possível autenticar');
            console.log(error)
            //finaly = se der bom ou ruim voce faz isso
        } finally {
            setLoading(false);
        }
    }

    async function signOut() {
        setUser({} as User);
        await AsyncStorage.removeItem(COLLECTION_USER);
    }
    
    async function loadUserStorageData() {
        const storage = await AsyncStorage.getItem(COLLECTION_USER);

        if(storage){
            const userLogged = JSON.parse(storage) as User;
            //inserindo o token no cabeçalho
            api.defaults.headers.authorization = `Bearer ${userLogged.token}`;

            setUser(userLogged);
        }
    }

    useEffect(() => {
        loadUserStorageData();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            loading,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

//Criando nosso proprio Hook
function useAuth(){
    const context = useContext(AuthContext);

    return context;
}

export {
    AuthProvider,
    useAuth
}