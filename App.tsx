import React from 'react';
//hoock para carregar fontes
import { useFonts } from 'expo-font';
//importando as fontes
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';
import AppLoading from 'expo-app-loading';

import { SignIn } from './src/screens/SignIn';

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  })

  //enquanto as fontes nao carregarem, deixa e tela de splash
  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <SignIn />
  );
}
