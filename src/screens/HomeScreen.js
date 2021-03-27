import React, { useEffect, useContext, useState } from 'react';
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
} from 'react-native';

import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import { Context } from '../contexts/Recipes/RecipesContext';
const HomeScreen = ({ context = { Context }, navigation }) => {
  const {
    state,
    newRecipe,
    loadRecipes,
    loadRecipe,
    filterRecipes,
    recipeService,
    recipeRepository,
  } = useContext(context);

  useEffect(() => {
    recipeRepository.listAll(loadRecipes);
  }, []);

  const createNewRecipe = () => {
    newRecipe(() => navigation.navigate('NewRecipe'));
  };
  const openSettings = () => {
    navigation.navigate('Settings');
  };

  const onEdit = (id) => {
    recipeRepository.findById(id, loadRecipe, () =>
      navigation.navigate('NewRecipe')
    );
  };
  const onSelectRecipe = (id) => {
    recipeRepository.findById(id, loadRecipe, () =>
      navigation.navigate('RecipeDetails')
    );
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
            recipeService.deleteRecipe({ id, imageUrl }, () =>
              recipeRepository.listAll(loadRecipes)
            ),
        },
      ],
      { cancelable: false }
    );

  return (
    <View style={styles.rootContainer}>
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
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>{i18n.t('welcome_message')}</Text>
          </View>
        )}
      </TouchableWithoutFeedback>
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
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  settingsButton: {
    position: 'absolute',
    right: 30,
  },
});

export default HomeScreen;
