import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from './src/constants/colors';
import CheckStepsScreen from './src/screens/CheckStepsScreen';
import HomeScreen from './src/screens/HomeScreen';
import IngredientsScreen from './src/screens/IngredientsScreen';
import NewRecipeScreen from './src/screens/NewRecipeScreen';
import PreparationModeScreen from './src/screens/PreparationModeScreen';
import RecipeDetailsScreen from './src/screens/RecipeDetailsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import StepsScreen from './src/screens/StepsScreen';
import { translate } from './src/translations';
import SettingsButton from './src/components/SettingsButton';
const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.white,
            shadowColor: 'transparent',
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Roboto_900Black',
            color: colors.primaryColor,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerTitle: `${translate('my_recipes')}`,
            headerRight: () => (
              <SettingsButton onPress={() => navigation.navigate('Settings')} />
            ),
          })}
        />
        <Stack.Screen
          name="NewRecipe"
          component={NewRecipeScreen}
          options={{
            headerTitle: `${translate('new_recipe')}`,
            ...backButton,
          }}
        />
        <Stack.Screen
          name="CheckSteps"
          component={CheckStepsScreen}
          options={{
            headerTitle: `${translate('recipe_steps')}`,
            ...backButton,
          }}
        />
        <Stack.Screen
          name="Steps"
          component={StepsScreen}
          options={{
            headerTitle: `${translate('recipe_steps')}`,
            ...backButton,
          }}
        />
        <Stack.Screen
          name="Ingredients"
          component={IngredientsScreen}
          options={{
            headerTitle: `${translate('recipe_ingredients')}`,
            ...backButton,
          }}
        />
        <Stack.Screen
          name="PreparationMode"
          component={PreparationModeScreen}
          options={{
            headerTitle: `${translate('recipe_preparation_mode')}`,
            ...backButton,
          }}
        />
        <Stack.Screen
          name="RecipeDetails"
          component={RecipeDetailsScreen}
          options={({ navigation }) => ({
            headerTitle: ``,
            ...backButton,
            // eslint-disable-next-line react/display-name
            headerRight: () => (
              <SettingsButton onPress={() => navigation.navigate('Settings')} />
            ),
          })}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerTitle: `${translate('settings')}`,
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
    <View style={styles.touchButton}>
      <MaterialIcons
        style={{ marginLeft: 20 }}
        name="keyboard-backspace"
        size={30}
        color={colors.primaryColor}
      />
    </View>
  ),
};

const styles = StyleSheet.create({
  touchButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Routes;
