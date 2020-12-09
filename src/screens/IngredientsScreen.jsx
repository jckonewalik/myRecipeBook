import React, { useContext, useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  Dimensions,
  Platform,
} from 'react-native';
import { Context } from '../contexts/NewRecipe/NewRecipeContext';
import IOSPicker from '../components/IOSPicker';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

const { width } = Dimensions.get('window');

const IngredientsScreen = ({ navigation }) => {
  const { state } = useContext(Context);
  const [name, setName] = useState('');
  const [step, setStep] = useState('');
  const [amount, setAmount] = useState('');
  const [amountUnit, setAmountUnit] = useState('');

  const goToPreparationMode = () => {
    navigation.navigate('Ingredients');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.rootContainer}>
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
          <AppButton text="Adicionar" secondary={true} onPress={() => {}} />
          <AppButton
            text="Modo de Preparo"
            onPress={() => goToPreparationMode()}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    justifyContent: 'flex-end',
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
