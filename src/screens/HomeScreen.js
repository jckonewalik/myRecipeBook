import React, { useEffect, useContext } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import i18n from 'i18n-js';

import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { deleteRecipe } from '../services/RecipesService';
import { listAll, findById } from '../database/repository/RecipesRepository';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import { Context } from '../contexts/Recipes/RecipesContext';
const HomeScreen = ({ navigation }) => {
  const {
    state,
    newRecipe,
    loadRecipes,
    loadRecipe,
    filterRecipes,
  } = useContext(Context);

  useEffect(() => {
    listAll(loadRecipes);
  }, []);

  const createNewRecipe = () => {
    newRecipe(() => navigation.navigate('NewRecipe'));
  };

  const onEdit = (id) => {
    findById(id, loadRecipe, () => navigation.navigate('NewRecipe'));
  };
  const onSelectRecipe = (id) => {
    findById(id, loadRecipe, () => navigation.navigate('RecipeDetails'));
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
            deleteRecipe({ id, imageUrl }, () => listAll(loadRecipes)),
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
            ) )
          </View>
        ) : (
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>{i18n.t('welcome_message')}</Text>
          </View>
        )}
      </TouchableWithoutFeedback>
      <View style={styles.footer}>
        <TouchableOpacity onPress={createNewRecipe}>
          <View style={styles.addButton}>
            <FontAwesome name="plus" size={24} color="#37426B" />
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
    color: '#37426B',
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#37426B',
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
});

export default HomeScreen;
