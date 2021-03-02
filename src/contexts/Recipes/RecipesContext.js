import createDataContext from '../createDataContext';
import {
  LOAD_RECIPES,
  SET_BASIC_INFO,
  ADD_STEP,
  REMOVE_STEP,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_INSTRUCTION,
  REMOVE_INSTRUCTION,
  NEW_RECIPE,
  LOAD_RECIPE,
  INCREASE_FRACTIONATION,
  DECREASE_FRACTIONATION,
} from './ActionTypes';
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
  increaseFractionation,
  decreaseFractionation,
  removeStepByName,
} from './Actions';

const INITIAL_STATE = {
  fractionation: 0.5,
  totalRecipes: 1,
  recipes: [],
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

export const recipeReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_RECIPES:
      return {
        ...state,
        recipes: payload,
      };
    case LOAD_RECIPE: {
      return {
        ...state,
        selectedRecipe: payload,
      };
    }
    case NEW_RECIPE:
      return {
        ...state,
        selectedRecipe: INITIAL_STATE.selectedRecipe,
      };
    case SET_BASIC_INFO:
      return {
        ...state,
        selectedRecipe: {
          ...state.selectedRecipe,
          imageUrl: payload.imageUrl,
          title: payload.title,
          portions: payload.portions,
          portionUnit: payload.portionUnit,
          calories: payload.calories,
        },
      };
    case ADD_STEP:
      return {
        ...state,
        selectedRecipe: {
          ...state.selectedRecipe,
          steps: {
            ...state.selectedRecipe.steps,
            [payload.stepName]: { ingredients: [], instructions: [] },
          },
        },
      };
    case REMOVE_STEP:
      return {
        ...state,
        selectedRecipe: {
          ...state.selectedRecipe,
          steps: removeStepByName(state.selectedRecipe.steps, payload.stepName),
        },
      };
    case ADD_INGREDIENT: {
      return {
        ...state,
        selectedRecipe: {
          ...state.selectedRecipe,
          steps: {
            ...state.selectedRecipe.steps,
            [payload.stepName]: {
              ...state.selectedRecipe.steps[payload.stepName],
              ingredients: [
                ...state.selectedRecipe.steps[payload.stepName].ingredients,
                {
                  ingredient: payload.ingredient,
                  amount: payload.amount,
                  unit: payload.unit,
                },
              ],
            },
          },
        },
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        selectedRecipe: {
          ...state.selectedRecipe,
          steps: {
            ...state.selectedRecipe.steps,
            [payload.stepName]: {
              ...state.selectedRecipe.steps[payload.stepName],
              ingredients: state.selectedRecipe.steps[
                payload.stepName
              ].ingredients.filter((s) => s.ingredient !== payload.ingredient),
            },
          },
        },
      };
    }
    case ADD_INSTRUCTION: {
      return {
        ...state,
        selectedRecipe: {
          ...state.selectedRecipe,
          steps: {
            ...state.selectedRecipe.steps,
            [payload.stepName]: {
              ...state.selectedRecipe.steps[payload.stepName],
              instructions: [
                ...state.selectedRecipe.steps[payload.stepName].instructions,
                {
                  description: payload.description,
                },
              ],
            },
          },
        },
      };
    }
    case REMOVE_INSTRUCTION: {
      return {
        ...state,
        selectedRecipe: {
          ...state.selectedRecipe,
          steps: {
            ...state.selectedRecipe.steps,
            [payload.stepName]: {
              ...state.selectedRecipe.steps[payload.stepName],
              instructions: state.selectedRecipe.steps[
                payload.stepName
              ].instructions.filter(
                (s) => s.description !== payload.description
              ),
            },
          },
        },
      };
    }
    case INCREASE_FRACTIONATION: {
      return {
        ...state,
        totalRecipes: calculateTotalRecipes(
          state.totalRecipes,
          state.fractionation
        ),
      };
    }
    case DECREASE_FRACTIONATION: {
      return {
        ...state,
        totalRecipes: calculateTotalRecipes(
          state.totalRecipes,
          state.fractionation * -1
        ),
      };
    }
    default:
      return state;
  }
};

const calculateTotalRecipes = (currentValue, incrementValue) => {
  const newTotal = currentValue + incrementValue;
  if (newTotal > 0) {
    return newTotal;
  }
  return currentValue;
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
    increaseFractionation,
    decreaseFractionation,
  },
  INITIAL_STATE
);
