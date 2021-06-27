import React, { 
    createContext,
    useContext,
    useState,
    ReactNode
} from 'react';

import * as AuthSession from 'expo-auth-session';

//pegando das variaveis dde ambiente
const { REDIRECT_URI } = process.env;
const { SCOPE } = process.env;
const { RESPONSE_TYPE } = process.env;
const { CLIENT_ID } = process.env;
const { CDN_IMAGE } = process.env;

import { api } from '../services/api';

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
                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`
                setUser({
                    ...userInfo.data,
                    firstName,
                    token: params.access_token
                })
            }

        } catch (error) {
            throw new Error('Não foi possível autenticar');
            console.log(error)
            //finaly = se der bom ou ruim voce faz isso
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            loading
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