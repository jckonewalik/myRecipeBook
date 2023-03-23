import {
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_900Black,
  useFonts,
} from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from './routes';
import { Provider } from './src/contexts/Recipes/RecipesContext';
import { createTable } from './src/database/repository/RecipesRepository';
import './src/translations';

export default function App() {
  React.useEffect(() => {
    createTable();
  }, []);

  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_900Black,
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <Provider>
        <StatusBar style="dark" />
        <Routes />
      </Provider>
    </GestureHandlerRootView>
  );
}
