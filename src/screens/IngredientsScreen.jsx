import React, { useContext, useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Context } from '../contexts/Recipes/RecipesContext';
import IOSPicker from '../components/IOSPicker';
import AppTextInput from '../components/AppTextInput';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import StepIngredientsList from '../components/StepIngredientsList';

const { width } = Dimensions.get('window');

const IngredientsScreen = ({ navigation }) => {
  const { state, addIngredient } = useContext(Context);
  const [name, setName] = useState('');
  const [step, setStep] = useState('');
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
    const alreadyExists =
      state.selectedRecipe.steps[stepName].ingredients &&
      state.selectedRecipe.steps[stepName].ingredients.find(
        (s) => s.ingredient === ingredient
      );

    if (!alreadyExists) {
      addIngredient({ stepName, ingredient, amount, unit }, clearForm);
    }
  };

  const isValidIngredient = () => {
    return step && name && amount && amountUnit;
  };

  return (
    <View style={styles.rootContainer}>
      <IOSPicker
        label="Processo"
        outputValue={step}
        options={Object.keys(state.selectedRecipe.steps).map((step) => {
          return { label: step, value: step };
        })}
        onSelect={setStep}
      />
      <AppTextInput label="Ingrediente" value={name} onChangeText={setName} />
      <View style={styles.amountContainer}>
        <View style={styles.amountInput}>
          <AppTextInput
            label="Quantidade"
            value={amount}
            keyboardType="numeric"
            onChangeText={setAmount}
          />
        </View>
        <View style={styles.amountInput}>
          <AppTextInput
            label="Unidade"
            value={amountUnit}
            onChangeText={setAmountUnit}
          />
        </View>
      </View>
      <View style={styles.addButton}>
        <SecondaryButton
          text="Adicionar"
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
      <FlatList
        data={Object.keys(state.selectedRecipe.steps)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <StepIngredientsList
            stepName={item}
            ingredients={
              state.selectedRecipe.steps[item] &&
              state.selectedRecipe.steps[item].ingredients
            }
          />
        )}
      />
      <View style={styles.footerContainer}>
        <PrimaryButton
          text="Modo de Preparo"
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
  footerContainer: {
    marginTop: 10,
  },
});

export default IngredientsScreen;
