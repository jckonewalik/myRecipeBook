import React, { useEffect, useContext } from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { listAll } from '../database/repository/RecipesRepository';
import RecipeCard from '../components/RecipeCard';
import { Context } from '../contexts/Recipes/RecipesContext';
const HomeScreen = ({ navigation }) => {
  const { state, newRecipe, loadRecipes } = useContext(Context);

  useEffect(() => {
    listAll(loadRecipes);
  }, []);

  const createNewRecipe = () => {
    newRecipe(() => navigation.navigate('NewRecipe'));
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.body}>
        <FlatList
          data={state.recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
        />
      </View>
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
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
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
