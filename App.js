import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Routes from './routes';
import { Provider } from './src/contexts/NewRecipe/NewRecipeContext';
import { AppLoading } from 'expo';
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_900Black,
} from '@expo-google-fonts/roboto';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider>
      <StatusBar style="dark" />
      <Routes />
    </Provider>
  );
}
