import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import i18n from 'i18n-js';

import { integerText, fractionText } from '../utils/TextUtil';
const DetailsTabView = ({ recipe, totalRecipes }) => {
  const [selectedOption, setSelectedOption] = useState('ingredients');
  return (
    <>
      <View style={styles.tabViewOptionsContainer}>
        <View style={getOptionStyle('ingredients', selectedOption)}>
          <TouchableOpacity onPress={() => setSelectedOption('ingredients')}>
            <Text style={styles.tabViewText}>
              {' '}
              {i18n.t('recipe_ingredients')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={getOptionStyle('instructions', selectedOption)}>
          <TouchableOpacity onPress={() => setSelectedOption('instructions')}>
            <Text style={styles.tabViewText}>
              {i18n.t('recipe_preparation_mode')}
            </Text>
          </TouchableOpacity>
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
const getOptionStyle = (tab, selectedOption) => {
  return tab === selectedOption
    ? styles.selectedTabViewOption
    : styles.tabViewOption;
};

const fontBold = {
  color: '#37426B',
  fontFamily: 'Roboto_900Black',
  fontSize: 20,
};
const tabViewOption = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 20,
  borderBottomWidth: 5,
};
const styles = StyleSheet.create({
  tabViewOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabViewOption: {
    ...tabViewOption,
    borderBottomColor: 'transparent',
  },
  selectedTabViewOption: {
    ...tabViewOption,
    borderBottomColor: '#37426B',
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
