import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import NewRecipeScreen from './src/screens/NewRecipeScreen';
import StepsScreen from './src/screens/StepsScreen';
import IngredientsScreen from './src/screens/IngredientsScreen';
import PreparationModeScreen from './src/screens/PreparationModeScreen';
import RecipeDetailsScreen from './src/screens/RecipeDetailsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { MaterialIcons } from '@expo/vector-icons';
import i18n from 'i18n-js';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: 'transparent',
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Roboto_900Black',
            color: '#37426B',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerTitle: `${i18n.t('my_recipes')}` }}
        />
        <Stack.Screen
          name="NewRecipe"
          component={NewRecipeScreen}
          options={{
            headerTitle: `${i18n.t('new_recipe')}`,
            ...backButton,
          }}
        />
        <Stack.Screen
          name="Steps"
          component={StepsScreen}
          options={{ headerTitle: `${i18n.t('recipe_steps')}`, ...backButton }}
        />
        <Stack.Screen
          name="Ingredients"
          component={IngredientsScreen}
          options={{
            headerTitle: `${i18n.t('recipe_ingredients')}`,
            ...backButton,
          }}
        />
        <Stack.Screen
          name="PreparationMode"
          component={PreparationModeScreen}
          options={{
            headerTitle: `${i18n.t('recipe_preparation_mode')}`,
            ...backButton,
          }}
        />
        <Stack.Screen
          name="RecipeDetails"
          component={RecipeDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerTitle: `${i18n.t('settings')}`,
            ...backButton,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const backButton = {
  headerBackTitle: ' ',
  // eslint-disable-next-line react/display-name
  headerBackImage: () => (
    <MaterialIcons
      style={{ marginLeft: 20 }}
      name="keyboard-backspace"
      size={30}
      color="#37426B"
    />
  ),
};

export default Routes;
