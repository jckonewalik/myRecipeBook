import React, { useContext, useState } from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import AndroidPicker from '../components/AndroidPicker';
import AppTextInput from '../components/AppTextInput';
import IOSPicker from '../components/IOSPicker';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import StepIngredientsList from '../components/StepIngredientsList';
import colors from '../constants/colors';
import { Context } from '../contexts/Recipes/RecipesContext';
import { translate } from '../translations';
const { width } = Dimensions.get('window');

const IngredientsScreen = ({ navigation }) => {
  const { state, addIngredient } = useContext(Context);
  const [name, setName] = useState('');
  const [step, setStep] = useState('select');
  const [amount, setAmount] = useState('');
  const [amountUnit, setAmountUnit] = useState('');

  const goToPreparationMode = () => {
    navigation.navigate('PreparationMode');
  };

  const clearForm = () => {
    setName('');
    setAmount('');
    setAmountUnit('');
  };

  const onAddIngredient = ({ stepName, ingredient, amount, unit }) => {
    if (state.selectedRecipe.multiSteps) {
      const alreadyExists =
        state.selectedRecipe.steps[stepName].ingredients &&
        state.selectedRecipe.steps[stepName].ingredients.find(
          (s) => s.ingredient === ingredient
        );

      if (!alreadyExists) {
        addIngredient({ stepName, ingredient, amount, unit }, clearForm);
      }
    } else {
      addIngredient({ ingredient, amount, unit }, clearForm);
    }
  };

  const isValidIngredient = () => {
    return (
      ((step && step !== 'select') || !state.selectedRecipe.multiSteps) &&
      name &&
      amount &&
      amountUnit
    );
  };
  return (
    <View style={styles.rootContainer}>
      {!!state.selectedRecipe.multiSteps &&
        (Platform.OS === 'ios' ? (
          <IOSPicker
            testID="ingredientStepPicker"
            label={translate('recipe_step')}
            outputValue={step}
            options={Object.keys(state.selectedRecipe.steps).map((step) => {
              return { label: step, value: step };
            })}
            onSelect={setStep}
          />
        ) : (
          <AndroidPicker
            label={translate('recipe_step')}
            value={step}
            options={Object.keys(state.selectedRecipe.steps).map((step) => {
              return { label: step, value: step };
            })}
            onSelect={setStep}
          />
        ))}
      <AppTextInput
        testID="ingredientName"
        label={translate('recipe_ingredient')}
        value={name}
        onChangeText={setName}
      />
      <View style={styles.amountContainer}>
        <View style={styles.amountInput}>
          <AppTextInput
            testID="ingredientQuantity"
            label={translate('quantity')}
            value={amount}
            keyboardType="numeric"
            onChangeText={setAmount}
          />
        </View>
        <View style={styles.amountInput}>
          <AppTextInput
            testID="ingredientQuantityUnit"
            label={translate('unit')}
            value={amountUnit}
            onChangeText={setAmountUnit}
          />
        </View>
      </View>
      <View style={styles.addButton}>
        <SecondaryButton
          testID="addIngredientButton"
          text={translate('add')}
          disabled={!isValidIngredient()}
          onPress={() =>
            onAddIngredient({
              stepName: step,
              ingredient: name,
              amount,
              unit: amountUnit,
            })
          }
        />
      </View>
      {(!!state.selectedRecipe.multiSteps && (
        <ScrollView style={styles.ingredientsList}>
          {Object.keys(state.selectedRecipe.steps).map((item) => (
            <StepIngredientsList
              key={item}
              stepName={item}
              ingredients={
                state.selectedRecipe.steps[item] &&
                state.selectedRecipe.steps[item].ingredients
              }
            />
          ))}
        </ScrollView>
      )) || (
        <ScrollView style={{ flex: 1 }}>
          <StepIngredientsList
            stepName={''}
            ingredients={state.selectedRecipe.steps.ingredients}
          />
        </ScrollView>
      )}
      <View style={styles.footerContainer}>
        <PrimaryButton
          testID="ingredientsScreenNavigationButton"
          text={translate('recipe_preparation_mode')}
          onPress={() => goToPreparationMode()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: colors.white,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountInput: {
    width: width * 0.4,
  },
  addButton: {
    marginTop: 10,
  },
  ingredientsList: {
    marginTop: 10,
  },
  footerContainer: {
    marginTop: 10,
  },
});

export default IngredientsScreen;
