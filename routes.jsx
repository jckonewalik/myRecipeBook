import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import NewRecipeScreen from './src/screens/NewRecipeScreen';
import StepsScreen from './src/screens/StepsScreen';
import IngredientsScreen from './src/screens/IngredientsScreen';
import PreparationModeScreen from './src/screens/PreparationModeScreen';
const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NewRecipe" component={NewRecipeScreen} />
        <Stack.Screen name="Steps" component={StepsScreen} />
        <Stack.Screen name="Ingredients" component={IngredientsScreen} />
        <Stack.Screen
          name="PreparationMode"
          component={PreparationModeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
