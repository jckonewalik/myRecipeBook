import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Routes from './routes';
import { Provider } from './src/contexts/Recipes/RecipesContext';
import { AppLoading } from 'expo';
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_900Black,
} from '@expo-google-fonts/roboto';
import { createTable } from './src/database/repository/RecipesRepository';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import * as en from './src/translations/en.json';
import * as pt from './src/translations/pt.json';

i18n.translations = {
  en,
  pt,
};

i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default function App() {
  React.useEffect(() => {
    createTable();
  }, []);

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
