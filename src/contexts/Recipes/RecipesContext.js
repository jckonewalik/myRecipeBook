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
} from './ActionTypes';

const INITIAL_STATE = {
  recipes: [],
  selectedRecipe: {
    id: null,
    imageUrl: null,
    title: '',
    portions: '',
    portionUnit: '',
    calories: '',
    steps: {},
  },
};

const recipeReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_RECIPES:
      return {
        ...state,
        recipes: payload,
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
    default:
      return state;
  }
};

const setBasicInfo = (dispatch) => {
  return ({ imageUrl, title, portions, portionUnit, calories }, callback) => {
    dispatch({
      type: SET_BASIC_INFO,
      payload: { imageUrl, title, portions, portionUnit, calories },
    });
    callback();
  };
};

const addStep = (dispatch) => {
  return ({ stepName }, callback) => {
    dispatch({
      type: ADD_STEP,
      payload: { stepName },
    });
    callback();
  };
};

const removeStep = (dispatch) => {
  return ({ stepName }) => {
    dispatch({
      type: REMOVE_STEP,
      payload: { stepName },
    });
  };
};

const addIngredient = (dispatch) => {
  return ({ stepName, ingredient, amount, unit }, callback) => {
    dispatch({
      type: ADD_INGREDIENT,
      payload: { stepName, ingredient, amount, unit },
    });
    callback && callback();
  };
};

const removeIngredient = (dispatch) => {
  return ({ stepName, ingredient }) => {
    dispatch({
      type: REMOVE_INGREDIENT,
      payload: { stepName, ingredient },
    });
  };
};

const addInstruction = (dispatch) => {
  return ({ stepName, description }, callback) => {
    dispatch({
      type: ADD_INSTRUCTION,
      payload: { stepName, description },
    });
    callback && callback();
  };
};

const removeInstruction = (dispatch) => {
  return ({ stepName, description }) => {
    dispatch({
      type: REMOVE_INSTRUCTION,
      payload: { stepName, description },
    });
  };
};

const loadRecipes = (dispatch) => {
  return (recipes) => {
    dispatch({
      type: LOAD_RECIPES,
      payload: recipes,
    });
  };
};

const removeStepByName = (steps, stepName) => {
  const newSteps = {};
  Object.keys(steps).forEach((key) => {
    if (key !== stepName) {
      newSteps[key] = steps[key];
    }
  });
  return newSteps;
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
  },
  INITIAL_STATE
);
