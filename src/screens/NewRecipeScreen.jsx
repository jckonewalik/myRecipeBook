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
  const [image, setImage] = useState(null);

  useEffect(() => {
    setTitle(state.selectedRecipe.title);
    setPortions(state.selectedRecipe.portions);
    setPortionUnit(state.selectedRecipe.portionUnit);
    setCalories(state.selectedRecipe.calories);
  }, []);

  const goToSteps = () => {
    setBasicInfo(
      { imageUrl: image, title, portions, portionUnit, calories },
      () => navigation.navigate('Steps')
    );
  };

  const isValidInput = () => {
    return title && portions && portionUnit && portionUnit !== 'Selecione';
  };

  return (
    <ScrollView style={styles.rootContainer}>
      <AppImagePicker image={image} setImage={setImage} />
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
          {Platform.OS === 'ios' ? (
            <IOSPicker
              label="Unit"
              outputValue={portionUnit}
              options={portionUnitOptions}
              onSelect={setPortionUnit}
            />
          ) : (
            <AndroidPicker
              label="Unit"
              value={portionUnit}
              options={portionUnitOptions}
              onSelect={setPortionUnit}
            />
          )}
        </View>
      </View>
      <AppTextInput
        label="Calories"
        value={calories}
        keyboardType="numeric"
        onChangeText={setCalories}
      />
      <View style={styles.footerContainer}>
        <PrimaryButton
          disabled={!isValidInput()}
          text="Processos"
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
