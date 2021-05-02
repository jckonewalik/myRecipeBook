import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context } from '../contexts/Recipes/RecipesContext';
import AppListItem from './AppListItem';

import colors from '../constants/colors';
const StepIngredientsList = ({ stepName, ingredients = [] }) => {
  const { removeIngredient } = useContext(Context);

  const onRemoveIngredient = ({ stepName, ingredient }) => {
    removeIngredient({ stepName, ingredient });
  };

  return (
    <View style={styles.ingredientsContainer}>
      <Text style={styles.stepName}>{stepName}</Text>
      {ingredients.map((item) => (
        <AppListItem
          key={item.ingredient}
          text={`${item.amount} ${item.unit} ${item.ingredient}`}
          onRemove={() =>
            onRemoveIngredient({ stepName, ingredient: item.ingredient })
          }
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  stepName: {
    fontFamily: 'Roboto_900Black',
    fontSize: 20,
    color: colors.primaryColor,
  },
  ingredientsContainer: {
    marginTop: 10,
    backgroundColor: colors.white,
  },
});

export default StepIngredientsList;
