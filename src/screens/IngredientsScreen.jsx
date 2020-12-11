import React, { useContext, useState } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  Keyboard,
  Dimensions,
  Platform,
} from 'react-native';
import { Context } from '../contexts/NewRecipe/NewRecipeContext';
import IOSPicker from '../components/IOSPicker';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import StepIngredientsList from '../components/StepIngredientsList';

const { width } = Dimensions.get('window');

const IngredientsScreen = ({ navigation }) => {
  const { state, addIngredient, removeIngredient } = useContext(Context);
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
      state.steps[stepName].ingredients &&
      state.steps[stepName].ingredients.find(
        (s) => s.ingredient === ingredient
      );

    if (!alreadyExists) {
      addIngredient({ stepName, ingredient, amount, unit }, clearForm);
    }
  };

  return (
    <View style={styles.rootContainer}>
      <IOSPicker
        label="Processo"
        outputValue={step}
        options={Object.keys(state.steps).map((step) => {
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
        <AppButton
          text="Adicionar"
          secondary={true}
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
        data={Object.keys(state.steps)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <StepIngredientsList
            stepName={item}
            ingredients={state.steps[item] && state.steps[item].ingredients}
          />
        )}
      />
      <View style={styles.footerContainer}>
        <AppButton
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
