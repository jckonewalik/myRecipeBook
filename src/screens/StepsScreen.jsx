import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
} from 'react-native';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import { FontAwesome } from '@expo/vector-icons';
import { Context } from '../contexts/NewRecipe/NewRecipeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

const StepsScreen = ({ navigation }) => {
  const { state, addStep, removeStep } = useContext(Context);
  const [name, setName] = useState('');

  const onAddStep = (stepName) => {
    if (stepName !== '') {
      const step = state.steps.find((s) => s.name === stepName);
      if (!step) {
        addStep({ stepName }, () => setName(''));
      }
    }
  };
  const onRemoveStep = (stepName) => {
    if (stepName !== '') {
      removeStep({ stepName });
    }
  };
  const goToIngredients = () => {
    navigation.navigate('Ingredients');
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.rootContainer}>
          <AppTextInput
            label="Nome"
            value={name}
            autoCorrect={false}
            onChangeText={setName}
          />
          <AppButton
            text="Adicionar"
            secondary={true}
            onPress={() => onAddStep(name)}
          />
          <FlatList
            data={state.steps}
            style={styles.stepList}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={styles.stepItem}>
                <Text style={styles.stepItemText}>{item.name}</Text>
                <TouchableOpacity onPress={() => onRemoveStep(item.name)}>
                  <FontAwesome name="trash" size={32} color="#C20D0D" />
                </TouchableOpacity>
              </View>
            )}
          />
          <AppButton text="Processos" onPress={() => goToIngredients()} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    padding: 20,
  },
  stepList: {
    marginTop: 10,
  },
  stepItem: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepItemText: {
    fontFamily: 'Roboto_400Regular',
    color: '#37426B',
    fontSize: 20,
  },
});

export default StepsScreen;
