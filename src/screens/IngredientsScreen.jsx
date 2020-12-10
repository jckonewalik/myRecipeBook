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
    navigation.navigate('Ingredients');
  };

  const clearForm = () => {
    setName('');
    setAmount('');
    setAmountUnit('');
  };

  const onAddIngredient = ({ stepName, ingredient, amount, unit }) => {
    const alreadyExists =
      state.steps[stepName] &&
      state.steps[stepName].find((s) => s.ingredient === ingredient);

    if (!alreadyExists) {
      addIngredient({ stepName, ingredient, amount, unit }, clearForm);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.rootContainer}>
          <IOSPicker
            label="Processo"
            outputValue={step}
            options={Object.keys(state.steps).map((step) => {
              return { label: step, value: step };
            })}
            onSelect={setStep}
          />
          <AppTextInput
            label="Ingrediente"
            value={name}
            onChangeText={setName}
          />
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
          <View>
            <FlatList
              data={Object.keys(state.steps)}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <StepIngredientsList
                  stepName={item}
                  ingredients={state.steps[item]}
                />
              )}
            />
          </View>
          <AppButton
            text="Modo de Preparo"
            onPress={() => goToPreparationMode()}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  rootContainer: {
    padding: 20,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountInput: {
    width: width * 0.4,
  },
});

export default IngredientsScreen;
