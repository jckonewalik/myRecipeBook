import React, { useState, useContext, useEffect } from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import AppTextInput from '../components/AppTextInput';
import { Context } from '../contexts/Recipes/RecipesContext';
import AndroidPicker from '../components/AndroidPicker';
import IOSPicker from '../components/IOSPicker';
import AppImagePicker from '../components/AppImagePicker';
import i18n from 'i18n-js';

const { width } = Dimensions.get('window');
const NewRecipeScreen = ({ navigation }) => {
  const { state, setBasicInfo } = useContext(Context);
  const portionUnitOptions = [
    { label: `${i18n.t('units')}`, value: 'units' },
    { label: `${i18n.t('piece')}`, value: 'piece' },
    { label: `${i18n.t('slice')}`, value: 'slice' },
  ];

  const [title, setTitle] = useState('');
  const [portions, setPortions] = useState('');
  const [portionUnit, setPortionUnit] = useState('');
  const [calories, setCalories] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (state.selectedRecipe.imageUrl) {
      setImage(state.selectedRecipe.imageUrl);
    }
    setTitle(state.selectedRecipe.title);
    setPortions('' + state.selectedRecipe.portions);
    setPortionUnit(state.selectedRecipe.portionUnit);
    setCalories('' + state.selectedRecipe.calories);
  }, []);

  const goToSteps = () => {
    setBasicInfo(
      { imageUrl: image, title, portions, portionUnit, calories },
      () => navigation.navigate('Steps')
    );
  };

  const isValidInput = () => {
    return (
      title && portions && portionUnit && portionUnit !== `${i18n.t('select')}`
    );
  };

  return (
    <ScrollView style={styles.rootContainer}>
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
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
