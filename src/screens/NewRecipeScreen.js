import React, { useState, useContext, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  View,
  Keyboard,
  Dimensions,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import AppTextInput from '../components/AppTextInput';
import { Context } from '../contexts/Recipes/RecipesContext';
import AndroidPicker from '../components/AndroidPicker';
import IOSPicker from '../components/IOSPicker';
import AppImagePicker from '../components/AppImagePicker';
import colors from '../constants/colors';
import i18n from 'i18n-js';

const { width } = Dimensions.get('window');
const NewRecipeScreen = ({ route, navigation }) => {
  const { params } = route;
  const { state, loadRecipe, setBasicInfo, recipeRepository } = useContext(
    Context
  );
  const portionUnitOptions = [
    { label: `${i18n.t('units')}`, value: 'units' },
    { label: `${i18n.t('pieces')}`, value: 'pieces' },
    { label: `${i18n.t('portions')}`, value: 'portions' },
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

  const goToSteps = () => {
    setBasicInfo(
      { imageUrl: image, title, portions, portionUnit, calories },
      () => navigation.navigate('Steps')
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
            backgroundColor: '#fff',
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
                label={i18n.t('recipe_title')}
                value={title}
                onChangeText={setTitle}
              />
              <View style={styles.portionsContainer}>
                <View style={styles.protionsInput}>
                  <AppTextInput
                    label={i18n.t('recipe_portions')}
                    value={portions}
                    keyboardType="numeric"
                    onChangeText={setPortions}
                  />
                </View>
                <View style={styles.protionsInput}>
                  {Platform.OS === 'ios' ? (
                    <IOSPicker
                      label={i18n.t('unit')}
                      outputValue={portionUnit}
                      options={portionUnitOptions}
                      onSelect={setPortionUnit}
                    />
                  ) : (
                    <AndroidPicker
                      label={i18n.t('unit')}
                      value={portionUnit}
                      options={portionUnitOptions}
                      onSelect={setPortionUnit}
                    />
                  )}
                </View>
              </View>
              <AppTextInput
                label={i18n.t('recipe_calories')}
                value={calories}
                keyboardType="numeric"
                onChangeText={setCalories}
              />
              <View style={styles.footerContainer}>
                <PrimaryButton
                  disabled={!isValidInput()}
                  text={i18n.t('recipe_steps')}
                  onPress={() => goToSteps()}
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
    backgroundColor: '#fff',
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
