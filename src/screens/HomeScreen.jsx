import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { listAll } from '../database/repository/RecipesRepository';
const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    listAll(setRecipes);
  }, []);

  return (
    <View>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
      <TouchableOpacity onPress={() => navigation.navigate('NewRecipe')}>
        <View>
          <Text>Nova Receita</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
