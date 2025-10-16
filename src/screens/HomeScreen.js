import { FontAwesome } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { File, Directory, Paths } from 'expo-file-system';
import React, { useContext, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import colors from '../constants/colors';
import { Context } from '../contexts/Recipes/RecipesContext';
import { translate } from '../translations';
const HomeScreen = ({ context = Context, navigation }) => {
  const {
    state,
    newRecipe,
    loadRecipes,
    filterRecipes,
    startLoadRecipes,
    startLoadRecipe,
    recipeService,
    recipeRepository,
  } = useContext(context);

  useEffect(() => {
    const getRecipes = async () => {
      startLoadRecipes();
      const recipes = await recipeRepository.listAll();
      loadRecipes(recipes);
    };
    getRecipes();
  }, []);

  const createNewRecipe = () => {
    newRecipe(() => navigation.navigate('NewRecipe'));
  };

  const onExport = () =>
    Alert.alert(
      `${translate('export_recipes')}`,
      `${translate('export_confirmation')}`,
      [
        {
          text: `${translate('cancel')}`,
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const recipes = await recipeRepository.getAllRecipes();
            createFile(recipes);
          },
        },
      ],
      { cancelable: false }
    );

  const createFile = async (recipes) => {
    const dir = await Directory.pickDirectoryAsync();
    if (!dir) {
      new Error('no directory selected');
    }
    const fileContent = JSON.stringify(recipes);
    try {
      const file = dir.createFile(
        `my_recipes_${new Date().toISOString()}.json`,
        'application/json'
      );
      file.write(fileContent);
      Alert.alert(translate('export_recipes'), translate('export_success'));
    } catch (error) {
      Alert.alert(translate('export_recipes'), translate('error_message'));
      console.log(error);
    }
  };

  const onImport = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: false,
      });

      if (!result.assets.length) {
        return;
      }

      const file = new File(result.assets[0]);
      const newRecipes = JSON.parse(file.textSync());
      const validRecipes = newRecipes.filter((recipe) => isRecipeValid(recipe));

      if (validRecipes.length === 0) {
        Alert.alert(
          translate('import_recipes'),
          translate('import_no_recipes_found'),
          [
            {
              text: 'OK',
              onPress: () => {},
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          translate('import_recipes'),
          `${translate('import_confirmation_1')} ${
            validRecipes.length
          } ${translate('import_confirmation_2')}`,
          [
            {
              text: `${translate('cancel')}`,
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => saveRecipes(validRecipes),
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      Alert.alert(translate('import_recipes'), translate('error_message'));
      console.log(error);
    }
  };

  const isRecipeValid = (recipe) => {
    const recipeKeys = Object.keys(recipe);
    if (recipeKeys.indexOf('title') === -1) {
      return false;
    }
    if (recipeKeys.indexOf('portions') === -1) {
      return false;
    }
    if (recipeKeys.indexOf('portionUnit') === -1) {
      return false;
    }
    if (recipeKeys.indexOf('calories') === -1) {
      return false;
    }
    if (recipeKeys.indexOf('multiSteps') === -1) {
      return false;
    }
    if (recipeKeys.indexOf('steps') === -1) {
      return false;
    }

    return areStepsValid(recipe);
  };

  const areStepsValid = (recipe) => {
    if (recipe.multiSteps) {
      const steps = Object.keys(recipe.steps);
      for (const step of steps) {
        if (!isStepValid(recipe.steps[step])) {
          return false;
        }
      }
      return true;
    }
    return isStepValid(recipe.steps);
  };

  const isStepValid = (step) => {
    const stepKeys = Object.keys(step);
    if (stepKeys.indexOf('instructions') !== -1) {
      if (!Array.isArray(step.instructions)) {
        return false;
      }
    }
    if (stepKeys.indexOf('ingredients') === -1) {
      return false;
    }
    if (!Array.isArray(step.ingredients)) {
      return false;
    }
    const validIngredients = step.ingredients.filter((ingredient) =>
      isValidIngredient(ingredient)
    );

    return validIngredients.length === step.ingredients.length;
  };

  const isValidIngredient = (ingredient) => {
    const ingredientKeys = Object.keys(ingredient);
    if (ingredientKeys.indexOf('ingredient') === -1) {
      return false;
    }
    if (ingredientKeys.indexOf('amount') === -1) {
      return false;
    }
    if (ingredientKeys.indexOf('unit') === -1) {
      return false;
    }
    return true;
  };

  const saveRecipes = async (recipes) => {
    for (let recipe of recipes) {
      await recipeService.saveOrUpdate({
        title: recipe.title,
        portions: recipe.portions,
        portionUnit: recipe.portionUnit,
        calories: recipe.calories,
        multiSteps: !!recipe.multiSteps,
        steps: recipe.steps,
      });
    }
    const allRecipes = await recipeRepository.listAll();
    loadRecipes(allRecipes);
  };

  const onEdit = (id) => {
    startLoadRecipe();
    navigation.navigate('NewRecipe', { recipeId: id });
  };
  const onSelectRecipe = (id) => {
    startLoadRecipe();
    navigation.navigate('RecipeDetails', { recipeId: id });
  };
  const onDelete = (id, imageUrl) =>
    Alert.alert(
      `${translate('delete_recipe')}`,
      `${translate('delete_confirmation')}`,
      [
        {
          text: `${translate('cancel')}`,
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await recipeService.deleteRecipe({ id, imageUrl });
            startLoadRecipes();
            const recipes = await recipeRepository.listAll();
            loadRecipes(recipes);
          },
        },
      ],
      { cancelable: false }
    );

  return (
    <View style={styles.rootContainer}>
      {state.loadingRecipes ? (
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {state.recipes.length > 0 ? (
            <View style={styles.body}>
              <SearchBar onSearch={filterRecipes} />
              <FlatList
                testID="recipeFlatList"
                style={{ marginTop: 10 }}
                data={state.filteredRecipes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <RecipeCard
                    onSelect={onSelectRecipe}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    recipe={item}
                  />
                )}
              />
            </View>
          ) : (
            <View testID="welcomeMessage" style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>
                {translate('welcome_message')}
              </Text>
            </View>
          )}
        </TouchableWithoutFeedback>
      )}

      <View style={styles.footer}>
        <TouchableOpacity testID="createRecipeButton" onPress={createNewRecipe}>
          <View style={styles.addButton}>
            <FontAwesome name="plus" size={24} color={colors.primaryColor} />
          </View>
        </TouchableOpacity>

        {Platform.OS === 'android' && (
          <TouchableOpacity
            testID="exportButton"
            style={styles.exportButton}
            onPress={onExport}
          >
            <View>
              <FontAwesome name="download" size={34} color="white" />
            </View>
          </TouchableOpacity>
        )}
        {Platform.OS === 'android' && (
          <TouchableOpacity
            testID="importButton"
            style={styles.importButton}
            onPress={onImport}
          >
            <View>
              <FontAwesome name="upload" size={34} color="white" />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  welcomeContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  welcomeText: {
    color: colors.primaryColor,
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: colors.primaryColor,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  settingsButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
  },
  exportButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 10,
  },
  importButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
  },
});

export default HomeScreen;
