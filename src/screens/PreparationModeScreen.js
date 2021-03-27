import React, { useContext, useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Platform } from 'react-native';
import { Context } from '../contexts/Recipes/RecipesContext';
import AndroidPicker from '../components/AndroidPicker';
import IOSPicker from '../components/IOSPicker';
import AppTextInput from '../components/AppTextInput';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import StepInstructionsList from '../components/StepInstructionsList';
import { saveOrUpdate } from '../services/RecipesService';
import { listAll } from '../database/repository/RecipesRepository';
import i18n from 'i18n-js';
const { width } = Dimensions.get('window');

const PreparationModeScreen = ({ navigation }) => {
  const { state, addInstruction, loadRecipes, startLoadRecipes } = useContext(
    Context
  );
  const [description, setDescription] = useState('');
  const [step, setStep] = useState('select');

  const onSave = () => {
    saveOrUpdate(state.selectedRecipe, () => {
      startLoadRecipes();
      listAll(loadRecipes, () => {
        navigation.navigate('Home');
      });
    });
  };

  const clearForm = () => {
    setDescription('');
  };

  const onAddPreparationMode = ({ stepName, description }) => {
    addInstruction({ stepName, description }, clearForm);
  };

  const isValidPreparationMode = () => {
    return step && step !== 'select' && description.trim() !== '';
  };

  return (
    <View style={styles.rootContainer}>
      {Platform.OS === 'ios' ? (
        <IOSPicker
          label={i18n.t('recipe_step')}
          outputValue={step}
          options={Object.keys(state.selectedRecipe.steps).map((step) => {
            return { label: step, value: step };
          })}
          onSelect={setStep}
        />
      ) : (
        <AndroidPicker
          label={i18n.t('recipe_step')}
          value={step}
          options={Object.keys(state.selectedRecipe.steps).map((step) => {
            return { label: step, value: step };
          })}
          onSelect={setStep}
        />
      )}
      <AppTextInput
        style={styles.descriptionInput}
        label={i18n.t('step_description')}
        value={description}
        multiline={true}
        numberOfLines={3}
        maxLength={100}
        onChangeText={setDescription}
      />
      <View style={styles.addButton}>
        <SecondaryButton
          disabled={!isValidPreparationMode()}
          text={i18n.t('add')}
          onPress={() =>
            onAddPreparationMode({
              stepName: step,
              description,
            })
          }
        />
      </View>
      <FlatList
        style={styles.instructionsList}
        data={Object.keys(state.selectedRecipe.steps)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <StepInstructionsList
            stepName={item}
            instructions={
              state.selectedRecipe.steps[item] &&
              state.selectedRecipe.steps[item].instructions
            }
          />
        )}
      />
      <View style={styles.footerContainer}>
        <PrimaryButton text={i18n.t('save')} onPress={() => onSave()} />
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
  instructionsList: {
    marginTop: 10,
  },
  descriptionInput: {
    fontSize: 15,
  },
});

export default PreparationModeScreen;
