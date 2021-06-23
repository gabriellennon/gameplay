import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { SignIn } from '../screens/SignIn';


const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes(){
    return (
        <Navigator
            //tirando titulo que aparecce por padrao
            headerMode="none"
            //tirando o estilo deault que ele coloca
            screenOptions={{
                cardStyle: {
                    backgroundColor: 'transparent'
                }
            }}
        >
            <Screen 
                name="SignIn"
                component={SignIn}
            />
            <Screen 
                name="Home"
                component={Home}
            />
        </Navigator>
    );
}