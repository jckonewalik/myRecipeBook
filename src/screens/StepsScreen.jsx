import React, { useContext, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import AppTextInput from '../components/AppTextInput';
import AppListItem from '../components/AppListItem';
import { Context } from '../contexts/Recipes/RecipesContext';

const StepsScreen = ({ navigation }) => {
  const { state, addStep, removeStep } = useContext(Context);
  const [name, setName] = useState('');
  const onAddStep = (stepName) => {
    if (stepName !== '') {
      const step = state.selectedRecipe.steps[stepName];
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

  const isValidStep = () => {
    return name.trim() !== '';
  };
  const isValidForm = () => {
    return (
      state.selectedRecipe && Object.keys(state.selectedRecipe.steps).length
    );
  };
  return (
    <View style={styles.rootContainer}>
      <View style={styles.mainView}>
        <View style={styles.inputContainer}>
          <AppTextInput
            label="Nome"
            value={name}
            autoCorrect={false}
            onChangeText={setName}
          />
          <View style={styles.addButton}>
            <SecondaryButton
              disabled={!isValidStep()}
              text="Adicionar"
              onPress={() => onAddStep(name)}
            />
          </View>
        </View>

        <FlatList
          style={styles.listContainer}
          data={Object.keys(state.selectedRecipe.steps)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <AppListItem text={item} onRemove={() => onRemoveStep(item)} />
          )}
        />
        <View style={styles.footerContainer}>
          <PrimaryButton
            disabled={!isValidForm()}
            text="Ingredientes"
            onPress={() => goToIngredients()}
          />
        </View>
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
    backgroundColor: '#fff',
  },
  keyboardContainer: {
    flex: 1,
  },
  mainView: {
    flex: 1,
  },
  inputContainer: {},
  addButton: {
    marginTop: 10,
  },
  listContainer: {
    marginTop: 10,
    flex: 1,
  },
  footerContainer: {
    marginTop: 10,
  },
});

export default StepsScreen;
