import createDataContext from '../../../createDataContext';
import { recipeReducer } from '../../../Recipes/RecipesContext';
import {
  loadRecipes,
  setBasicInfo,
  addStep,
  removeStep,
  addIngredient,
  removeIngredient,
  addInstruction,
  removeInstruction,
  newRecipe,
  loadRecipe,
  increaseRecipeSize,
  decreaseRecipeSize,
  filterRecipes,
  setFractionation,
  startLoadRecipe,
  startLoadRecipes,
} from '../../Actions';
import * as recipeService from '../../../../services/RecipesService';
import * as recipeRepository from '../../../../database/repository/mocks/RecipesRepository.mock';

const INITIAL_STATE = {
  fractionation: 0.5,
  totalRecipes: 1,
  recipes: [],
  filteredRecipes: [],
  selectedRecipe: {
    id: null,
    imageUrl: null,
    title: '',
    portions: '',
    portionUnit: 'select',
    calories: '',
    steps: {},
  },
};

export const { Context, Provider } = createDataContext(
  recipeReducer,
  {
    loadRecipes,
    setBasicInfo,
    addStep,
    removeStep,
    addIngredient,
    removeIngredient,
    addInstruction,
    removeInstruction,
    newRecipe,
    loadRecipe,
    increaseRecipeSize,
    decreaseRecipeSize,
    filterRecipes,
    setFractionation,
    startLoadRecipe,
    startLoadRecipes,
  },
  {
    recipeService,
  },
  {
    recipeRepository,
  },
  INITIAL_STATE
);
