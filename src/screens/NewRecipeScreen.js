import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AndroidPicker from '../components/AndroidPicker';
import AppImagePicker from '../components/AppImagePicker';
import AppTextInput from '../components/AppTextInput';
import IOSPicker from '../components/IOSPicker';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../constants/colors';
import { Context } from '../contexts/Recipes/RecipesContext';
import { translate } from '../translations';

const { width } = Dimensions.get('window');
const NewRecipeScreen = ({ route, navigation }) => {
  const { params } = route;
  const { state, loadRecipe, setBasicInfo, recipeRepository } = useContext(
    Context
  );
  const portionUnitOptions = [
    { label: `${translate('units')}`, value: 'units' },
    { label: `${translate('pieces')}`, value: 'pieces' },
    { label: `${translate('portions')}`, value: 'portions' },
  ];

  const [title, setTitle] = useState('');
  const [portions, setPortions] = useState('');
  const [portionUnit, setPortionUnit] = useState('');
  const [calories, setCalories] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (state.loadingRecipe) {
      if (params) {
        recipeRepository.findById(params.recipeId, loadRecipe);
      }
    }
  }, []);

  useEffect(() => {
    if (state.selectedRecipe.imageUrl) {
      setImage(state.selectedRecipe.imageUrl);
    }
    setTitle(state.selectedRecipe.title);
    setPortions('' + state.selectedRecipe.portions);
    setPortionUnit(state.selectedRecipe.portionUnit);
    setCalories('' + state.selectedRecipe.calories);
  }, [state]);

  const navigate = () => {
    const nextPage = !state.selectedRecipe.id
      ? 'CheckSteps'
      : state.selectedRecipe.multiSteps
      ? 'Steps'
      : 'Ingredients';
    setBasicInfo(
      { imageUrl: image, title, portions, portionUnit, calories },
      () => navigation.navigate(nextPage)
    );
  };

  const isValidInput = () => {
    return title && portions && portionUnit && portionUnit !== 'select';
  };

  return (
    <>
      {state.loadingRecipe ? (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <ActivityIndicator size="large" color={colors.primaryColor} />
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          style={styles.rootContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={styles.inner}>
              <AppImagePicker image={image} setImage={setImage} />
              <AppTextInput
                testID="recipeTitleInput"
                label={translate('recipe_title')}
                value={title}
                onChangeText={setTitle}
              />
              <View style={styles.portionsContainer}>
                <View style={styles.protionsInput}>
                  <AppTextInput
                    testID="recipePortionsInput"
                    label={translate('recipe_portions')}
                    value={portions}
                    keyboardType="numeric"
                    onChangeText={setPortions}
                  />
                </View>
                <View style={styles.protionsInput}>
                  {Platform.OS === 'ios' ? (
                    <IOSPicker
                      testID="portionUnitPicker"
                      label={translate('unit')}
                      outputValue={portionUnit}
                      options={portionUnitOptions}
                      onSelect={setPortionUnit}
                    />
                  ) : (
                    <AndroidPicker
                      label={translate('unit')}
                      value={portionUnit}
                      options={portionUnitOptions}
                      onSelect={setPortionUnit}
                    />
                  )}
                </View>
              </View>
              <AppTextInput
                testID="recipeCaloriesInput"
                label={translate('recipe_calories')}
                value={calories}
                keyboardType="numeric"
                onChangeText={setCalories}
              />
              <View style={styles.footerContainer}>
                <PrimaryButton
                  testID="navigateToCheckStepsButton"
                  disabled={!isValidInput()}
                  text={translate('recipe_steps')}
                  onPress={() => navigate()}
                />
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  inner: {
    padding: 20,
    backgroundColor: colors.white,
  },
  rootContainer: {
    flex: 1,
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
