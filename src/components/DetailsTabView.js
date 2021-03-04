import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

import { integerText, fractionText } from '../utils/TextUtil';
const DetailsTabView = ({ recipe, totalRecipes }) => {
  const [selectedOption, setSelectedOption] = useState('ingredients');
  return (
    <>
      <View style={styles.tabViewOptionsContainer}>
        <View style={styles.tabViewOption}>
          <Text style={styles.tabViewText}>Ingredients</Text>
        </View>
        <View style={styles.tabViewOption}>
          <Text style={styles.tabViewText}>Modo de preparo</Text>
        </View>
      </View>
      {selectedOption === 'ingredients' && (
        <ScrollView style={styles.tabViewContainer}>
          {Object.keys(recipe.steps).map(
            (key) =>
              recipe.steps[key].ingredients.length > 0 && (
                <IngredientsList
                  key={key}
                  stepName={key}
                  totalRecipes={totalRecipes}
                  ingredients={recipe.steps[key].ingredients}
                />
              )
          )}
        </ScrollView>
      )}
      {selectedOption === 'instructions' && (
        <View style={styles.tabViewContainer}>
          {Object.keys(recipe.steps).map(
            (key) =>
              recipe.steps[key].instructions.length > 0 && (
                <InstructionsList
                  key={key}
                  stepName={key}
                  instructions={recipe.steps[key].instructions}
                />
              )
          )}
        </View>
      )}
    </>
  );
};

const IngredientsList = ({ stepName, ingredients = [], totalRecipes }) => {
  return (
    <View style={styles.tabViewItem}>
      <Text style={styles.tabViewItemTitle}>{stepName}</Text>
      {ingredients.map((ingredient) => (
        <View key={ingredient.ingredient} style={styles.tabViewItemContainer}>
          <Text style={styles.tabViewItemText}>
            {integerText(ingredient.amount * totalRecipes)}
          </Text>
          <Text style={{ ...styles.tabViewItemText, fontSize: 10 }}>
            {fractionText(ingredient.amount * totalRecipes)}
          </Text>
          <Text style={styles.tabViewItemText}>
            {` ${ingredient.unit} - ${ingredient.ingredient}`}
          </Text>
        </View>
      ))}
    </View>
  );
};

const InstructionsList = ({ stepName, instructions = [] }) => {
  return (
    <View style={styles.tabViewItem}>
      <Text style={styles.tabViewItemTitle}>{stepName}</Text>
      {instructions.map((instruction) => (
        <View
          key={instruction.description}
          style={styles.tabViewItemTextContainer}
        >
          <Text style={styles.tabViewItemText}>{instruction.description}</Text>
        </View>
      ))}
    </View>
  );
};

const fontBold = {
  color: '#37426B',
  fontFamily: 'Roboto_900Black',
  fontSize: 20,
};

const styles = StyleSheet.create({
  tabViewOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  tabViewOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabViewText: {
    ...fontBold,
    fontSize: 15,
  },
  tabViewContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  tabViewItem: { marginTop: 10 },
  tabViewItemTitle: {
    ...fontBold,
    fontFamily: 'Roboto_400Regular',
    fontSize: 18,
  },
  tabViewItemContainer: {
    flexDirection: 'row',
  },
  tabViewItemText: {
    marginTop: 10,
    fontFamily: 'Roboto_400Regular',
    color: '#7895A1',
    fontSize: 15,
  },
});

export default DetailsTabView;
