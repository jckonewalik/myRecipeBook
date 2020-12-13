import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  Platform,
} from 'react-native';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import { Context } from '../contexts/NewRecipe/NewRecipeContext';
import IOSPicker from '../components/IOSPicker';

const { width } = Dimensions.get('window');
const NewRecipeScreen = ({ navigation }) => {
  const { state, setBasicInfo } = useContext(Context);
  const portionUnitOptions = [
    { label: 'Fatias', value: 'Fatias' },
    { label: 'Pedaços', value: 'Pedaços' },
    { label: 'Unidades', value: 'Unidades' },
  ];

  const [title, setTitle] = useState('');
  const [portions, setPortions] = useState('');
  const [portionUnit, setPortionUnit] = useState('');
  const [calories, setCalories] = useState('');

  useEffect(() => {
    setTitle(state.title);
    setPortions(state.portions);
    setPortionUnit(state.portionUnit);
    setCalories(state.calories);
  }, []);

  const goToSteps = () => {
    setBasicInfo({ title, portions, portionUnit, calories }, () =>
      navigation.navigate('Steps')
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.rootContainer}>
          <AppTextInput label="Title" value={title} onChangeText={setTitle} />
          <View style={styles.portionsContainer}>
            <View style={styles.protionsInput}>
              <AppTextInput
                label="Portions"
                value={portions}
                keyboardType="numeric"
                onChangeText={setPortions}
              />
            </View>
            <View style={styles.protionsInput}>
              <IOSPicker
                label="Unit"
                outputValue={portionUnit}
                options={portionUnitOptions}
                onSelect={setPortionUnit}
              />
            </View>
          </View>
          <AppTextInput
            label="Calories"
            value={calories}
            keyboardType="numeric"
            onChangeText={setCalories}
          />
          <View style={styles.footerContainer}>
            <AppButton text="Processos" onPress={() => goToSteps()} />
          </View>
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
  portionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  protionsInput: {
    width: width * 0.4,
  },
  footerContainer: {
    marginTop: 10,
  },
});

export default NewRecipeScreen;
