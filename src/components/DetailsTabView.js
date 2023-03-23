import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../constants/colors';
import { translate } from '../translations';
import { fractionText, integerText } from '../utils/TextUtil';
const DetailsTabView = ({ recipe, totalRecipes }) => {
  const [selectedOption, setSelectedOption] = useState('ingredients');
  return (
    <>
      <View style={styles.tabViewOptionsContainer}>
        <View style={getOptionStyle('ingredients', selectedOption)}>
          <TouchableOpacity onPress={() => setSelectedOption('ingredients')}>
            <Text style={styles.tabViewText}>
              {' '}
              {translate('recipe_ingredients')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={getOptionStyle('instructions', selectedOption)}>
          <TouchableOpacity onPress={() => setSelectedOption('instructions')}>
            <Text style={styles.tabViewText}>
              {translate('recipe_preparation_mode')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {selectedOption === 'ingredients' && (
        <ScrollView style={styles.tabViewContainer}>
          {recipe.multiSteps ? (
            Object.keys(recipe.steps).map(
              (key) =>
                recipe.steps[key].ingredients.length > 0 && (
                  <IngredientsList
                    key={key}
                    stepName={key}
                    totalRecipes={totalRecipes}
                    ingredients={recipe.steps[key].ingredients}
                  />
                )
            )
          ) : (
            <IngredientsList
              stepName={''}
              totalRecipes={totalRecipes}
              ingredients={recipe.steps.ingredients}
            />
          )}
        </ScrollView>
      )}
      {selectedOption === 'instructions' && (
        <ScrollView style={styles.tabViewContainer}>
          {recipe.multiSteps ? (
            Object.keys(recipe.steps).map(
              (key) =>
                recipe.steps[key].instructions.length > 0 && (
                  <InstructionsList
                    key={key}
                    stepName={key}
                    instructions={recipe.steps[key].instructions}
                  />
                )
            )
          ) : (
            <InstructionsList
              stepName={''}
              instructions={recipe.steps.instructions}
            />
          )}
        </ScrollView>
      )}
    </>
  );
};

const IngredientsList = ({ stepName, ingredients = [], totalRecipes }) => {
  return (
    <View style={styles.tabViewItem}>
      <Text style={styles.tabViewItemTitle}>{stepName}</Text>
      {ingredients.map((ingredient, idx) => (
        <View
          testID={`ingredientListItem${idx}`}
          key={ingredient.ingredient}
          style={styles.tabViewItemContainer}
        >
          <Text
            style={styles.tabViewItemText}
            testID={`ingredientListItem${idx}Amount`}
          >
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
  color: colors.primaryColor,
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
    borderBottomColor: colors.primaryColor,
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
