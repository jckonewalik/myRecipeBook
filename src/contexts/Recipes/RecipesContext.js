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
  INCREASE_RECIPE_SIZE,
  DECREASE_RECIPE_SIZE,
  FILTER_RECIPES,
  SET_FRACTIONATION,
  START_LOAD_RECIPES,
  START_LOAD_RECIPE,
  SET_MULTI_STEPS,
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
  increaseRecipeSize,
  decreaseRecipeSize,
  removeStepByName,
  filterRecipes,
  setFractionation,
  startLoadRecipes,
  startLoadRecipe,
  setMultiSteps,
} from './Actions';
import * as recipeService from '../../services/RecipesService';
import * as recipeRepository from '../../database/repository/RecipesRepository';

const INITIAL_STATE = {
  loadingRecipes: true,
  loadingRecipe: false,
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
    multiSteps: false,
    steps: {},
  },
};

export const recipeReducer = (state = INITIAL_STATE, action) => {
  // console.log(action.payload);
  const { type, payload } = action;
  switch (type) {
    case SET_MULTI_STEPS:
      return {
        ...state,
        selectedRecipe: {
          ...state.selectedRecipe,
          multiSteps: payload,
        },
      };
    case LOAD_RECIPES:
      return {
        ...state,
        loadingRecipes: false,
        recipes: payload,
        filteredRecipes: payload,
      };
    case LOAD_RECIPE: {
      return {
        ...state,
        loadingRecipe: false,
        selectedRecipe: payload,
      };
    }
    case NEW_RECIPE:
      return {
        ...state,
        loadingRecipe: false,
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
      return addNewIngredient(state.selectedRecipe.multiSteps, payload, state);
    }
    case REMOVE_INGREDIENT: {
      return deleteIngredient(state.selectedRecipe.multiSteps, payload, state);
    }
    case ADD_INSTRUCTION: {
      return addNewInstruction(state.selectedRecipe.multiSteps, payload, state);
    }
    case REMOVE_INSTRUCTION: {
      return deleteInstruction(state.selectedRecipe.multiSteps, payload, state);
    }
    case INCREASE_RECIPE_SIZE: {
      return {
        ...state,
        totalRecipes: calculateTotalRecipes(
          state.totalRecipes,
          state.fractionation
        ),
      };
    }
    case DECREASE_RECIPE_SIZE: {
      return {
        ...state,
        totalRecipes: calculateTotalRecipes(
          state.totalRecipes,
          state.fractionation * -1
        ),
      };
    }
    case FILTER_RECIPES: {
      return {
        ...state,
        filteredRecipes: state.recipes.filter((r) =>
          r.title.toLowerCase().includes(payload.toLowerCase())
        ),
      };
    }
    case SET_FRACTIONATION: {
      return {
        ...state,
        fractionation: payload,
      };
    }
    case START_LOAD_RECIPES: {
      return {
        ...state,
        loadingRecipes: true,
      };
    }
    case START_LOAD_RECIPE: {
      return {
        ...state,
        loadingRecipe: true,
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

const addNewIngredient = (multiSteps, payload, state) => {
  return multiSteps
    ? addIngredientMultiSteps(payload, state)
    : addIngredientSingleStep(payload, state);
};

const deleteIngredient = (multiSteps, payload, state) => {
  return multiSteps
    ? removeIngredientMultiSteps(payload, state)
    : removeIngredientSingleStep(payload, state);
};

const addIngredientMultiSteps = (payload, state) => {
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
};

const addIngredientSingleStep = (payload, state) => {
  const ingredients = state.selectedRecipe.steps.ingredients || [];
  return {
    ...state,
    selectedRecipe: {
      ...state.selectedRecipe,
      steps: {
        ...state.selectedRecipe.steps,
        ingredients: [
          ...ingredients,
          {
            ingredient: payload.ingredient,
            amount: payload.amount,
            unit: payload.unit,
          },
        ],
      },
    },
  };
};

const removeIngredientMultiSteps = (payload, state) => {
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
};

const removeIngredientSingleStep = (payload, state) => {
  return {
    ...state,
    selectedRecipe: {
      ...state.selectedRecipe,
      steps: {
        ...state.selectedRecipe.steps,
        ingredients: state.selectedRecipe.steps.ingredients.filter(
          (s) => s.ingredient !== payload.ingredient
        ),
      },
    },
  };
};

const addNewInstruction = (multiSteps, payload, state) => {
  return multiSteps
    ? addInstructionMultiSteps(payload, state)
    : addInstructionSingleStep(payload, state);
};

const addInstructionMultiSteps = (payload, state) => {
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
};

const addInstructionSingleStep = (payload, state) => {
  const instructions = state.selectedRecipe.steps.instructions || [];
  return {
    ...state,
    selectedRecipe: {
      ...state.selectedRecipe,
      steps: {
        ...state.selectedRecipe.steps,
        instructions: [
          ...instructions,
          {
            description: payload.description,
          },
        ],
      },
    },
  };
};

const deleteInstruction = (multiSteps, payload, state) => {
  return multiSteps
    ? removeInstructionMultiSteps(payload, state)
    : removeInstructionSingleStep(payload, state);
};

const removeInstructionMultiSteps = (payload, state) => {
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
          ].instructions.filter((s) => s.description !== payload.description),
        },
      },
    },
  };
};

const removeInstructionSingleStep = (payload, state) => {
  return {
    ...state,
    selectedRecipe: {
      ...state.selectedRecipe,
      steps: {
        ...state.selectedRecipe.steps,
        instructions: state.selectedRecipe.steps.instructions.filter(
          (s) => s.description !== payload.description
        ),
      },
    },
  };
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
    startLoadRecipes,
    startLoadRecipe,
    setMultiSteps,
  },
  {
    recipeService,
  },
  {
    recipeRepository,
  },
  INITIAL_STATE
);
