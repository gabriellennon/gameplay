import React from 'react';
//hoock para carregar fontes
import { useFonts } from 'expo-font';
//importando as fontes
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';
import AppLoading from 'expo-app-loading';

import { StatusBar, LogBox } from 'react-native';
import { Background } from './src/components/Background';
import { Routes } from './src/routes';
import { AuthProvider } from './src/hooks/auth';

LogBox.ignoreLogs(['You are not currently signed in to Expo on your development machine.'])

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  })

  //enquanto as fontes nao carregarem, deixa e tela de splash
  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {/* Falando que todas os meus componentes tem acesso ao meu contexto */}
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ Background>
  );
}
