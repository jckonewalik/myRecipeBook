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
import AppListItem from '../components/AppListItem';
import { Context } from '../contexts/NewRecipe/NewRecipeContext';

const StepsScreen = ({ navigation }) => {
  const { state, addStep, removeStep } = useContext(Context);
  const [name, setName] = useState('');
  const onAddStep = (stepName) => {
    if (stepName !== '') {
      const step = state.steps[stepName];
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
            data={Object.keys(state.steps)}
            style={styles.stepList}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <AppListItem text={item} onRemove={() => onRemoveStep(item)} />
            )}
          />
          <AppButton text="Ingredientes" onPress={() => goToIngredients()} />
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
});

export default StepsScreen;
