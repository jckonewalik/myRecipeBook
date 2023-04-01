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
import StepInstructionsList from '../components/StepInstructionsList';
import colors from '../constants/colors';
import { Context } from '../contexts/Recipes/RecipesContext';
import { listAll } from '../database/repository/RecipesRepository';
import { saveOrUpdate } from '../services/RecipesService';
import { translate } from '../translations';
const { width } = Dimensions.get('window');

const PreparationModeScreen = ({ navigation }) => {
  const { state, addInstruction, loadRecipes, startLoadRecipes } =
    useContext(Context);
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
    return (
      ((step && step !== 'select') || !state.selectedRecipe.multiSteps) &&
      description.trim() !== ''
    );
  };

  return (
    <View style={styles.rootContainer}>
      {!!state.selectedRecipe.multiSteps &&
        (Platform.OS === 'ios' ? (
          <IOSPicker
            testID="preparationModeStepPicker"
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
        testID="preparationDescription"
        style={styles.descriptionInput}
        label={translate('step_description')}
        value={description}
        multiline={true}
        numberOfLines={3}
        maxLength={100}
        onChangeText={setDescription}
      />
      <View style={styles.addButton}>
        <SecondaryButton
          testID="addPreparationDescription"
          disabled={!isValidPreparationMode()}
          text={translate('add')}
          onPress={() =>
            onAddPreparationMode({
              stepName: step,
              description,
            })
          }
        />
      </View>
      {(!!state.selectedRecipe.multiSteps && (
        <ScrollView style={styles.instructionsList}>
          {Object.keys(state.selectedRecipe.steps).map((item) => (
            <StepInstructionsList
              key={item}
              stepName={item}
              instructions={
                state.selectedRecipe.steps[item] &&
                state.selectedRecipe.steps[item].instructions
              }
            />
          ))}
        </ScrollView>
      )) || (
        <ScrollView style={{ flex: 1 }}>
          <StepInstructionsList
            stepName={''}
            instructions={state.selectedRecipe.steps.instructions}
          />
        </ScrollView>
      )}
      <View style={styles.footerContainer}>
        <PrimaryButton
          testID="saveRecipeButton"
          text={translate('save')}
          onPress={() => onSave()}
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
