import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Context } from '../contexts/Recipes/RecipesContext';
import AppListItem from './AppListItem';
import { fractionText, integerText } from '../utils/TextUtil';

const StepIngredientsList = ({ stepName, ingredients }) => {
  const { removeIngredient } = useContext(Context);

  const onRemoveIngredient = ({ stepName, ingredient }) => {
    removeIngredient({ stepName, ingredient });
  };

  return (
    <View style={styles.ingredientsContainer}>
      <Text style={styles.stepName}>{stepName}</Text>
      <FlatList
        data={ingredients}
        keyExtractor={(item) => item.ingredient}
        renderItem={({ item }) => (
          <AppListItem
            text={`${item.amount} ${item.unit} ${item.ingredient}`}
            onRemove={() =>
              onRemoveIngredient({ stepName, ingredient: item.ingredient })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  stepName: {
    fontFamily: 'Roboto_900Black',
    fontSize: 20,
    color: '#37426B',
  },
  ingredientsContainer: {
    marginTop: 10,
  },
});

export default StepIngredientsList;
