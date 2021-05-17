import React, { useEffect, useContext } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import i18n from 'i18n-js';
import colors from '../constants/colors';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import { Context } from '../contexts/Recipes/RecipesContext';
const HomeScreen = ({ context = Context, navigation }) => {
  const {
    state,
    newRecipe,
    loadRecipes,
    filterRecipes,
    startLoadRecipes,
    startLoadRecipe,
    recipeService,
    recipeRepository,
  } = useContext(context);

  useEffect(() => {
    startLoadRecipes();
    recipeRepository.listAll(loadRecipes);
  }, []);

  const createNewRecipe = () => {
    newRecipe(() => navigation.navigate('NewRecipe'));
  };
  const openSettings = () => {
    navigation.navigate('Settings');
  };

  const onEdit = (id) => {
    startLoadRecipe();
    navigation.navigate('NewRecipe', { recipeId: id });
  };
  const onSelectRecipe = (id) => {
    startLoadRecipe();
    navigation.navigate('RecipeDetails', { recipeId: id });
  };
  const onDelete = (id, imageUrl) =>
    Alert.alert(
      `${i18n.t('delete_recipe')}`,
      `${i18n.t('delete_confirmation')}`,
      [
        {
          text: `${i18n.t('cancel')}`,
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            recipeService.deleteRecipe({ id, imageUrl }, () => {
              startLoadRecipes();
              recipeRepository.listAll(loadRecipes);
            }),
        },
      ],
      { cancelable: false }
    );

  return (
    <View style={styles.rootContainer}>
      {state.loadingRecipes ? (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <ActivityIndicator size="large" color={colors.primaryColor} />
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {state.recipes.length > 0 ? (
            <View style={styles.body}>
              <SearchBar onSearch={filterRecipes} />
              <FlatList
                testID="recipeFlatList"
                style={{ marginTop: 10 }}
                data={state.filteredRecipes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <RecipeCard
                    onSelect={onSelectRecipe}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    recipe={item}
                  />
                )}
              />
            </View>
          ) : (
            <View testID="welcomeMessage" style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>
                {i18n.t('welcome_message')}
              </Text>
            </View>
          )}
        </TouchableWithoutFeedback>
      )}
      <View style={styles.footer}>
        <TouchableOpacity testID="createRecipeButton" onPress={createNewRecipe}>
          <View style={styles.addButton}>
            <FontAwesome name="plus" size={24} color={colors.primaryColor} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          testID="settingsButton"
          style={styles.settingsButton}
          onPress={openSettings}
        >
          <View>
            <FontAwesome name="gear" size={34} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  welcomeContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  welcomeText: {
    color: colors.primaryColor,
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: colors.primaryColor,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  settingsButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
  },
});

export default HomeScreen;
