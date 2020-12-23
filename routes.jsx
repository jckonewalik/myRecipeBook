import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import NewRecipeScreen from './src/screens/NewRecipeScreen';
import StepsScreen from './src/screens/StepsScreen';
import IngredientsScreen from './src/screens/IngredientsScreen';
import PreparationModeScreen from './src/screens/PreparationModeScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HeaderBackButton } from '@react-navigation/stack';
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
          options={{ headerTitle: 'Minhas Receitas' }}
        />
        <Stack.Screen
          name="NewRecipe"
          component={NewRecipeScreen}
          options={{
            headerTitle: 'Nova Receita',
            ...backButton,
          }}
        />
        <Stack.Screen
          name="Steps"
          component={StepsScreen}
          options={{ headerTitle: 'Processos', ...backButton }}
        />
        <Stack.Screen
          name="Ingredients"
          component={IngredientsScreen}
          options={{ headerTitle: 'Ingredientes', ...backButton }}
        />
        <Stack.Screen
          name="PreparationMode"
          component={PreparationModeScreen}
          options={{ headerTitle: 'Modo de Preparo', ...backButton }}
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
