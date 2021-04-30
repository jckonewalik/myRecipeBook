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

export const newRecipe = (dispatch) => {
  return (callback) => {
    dispatch({
      type: NEW_RECIPE,
    });
    callback && callback();
  };
};
export const setBasicInfo = (dispatch) => {
  return ({ imageUrl, title, portions, portionUnit, calories }, callback) => {
    dispatch({
      type: SET_BASIC_INFO,
      payload: { imageUrl, title, portions, portionUnit, calories },
    });
    callback && callback();
  };
};

export const addStep = (dispatch) => {
  return ({ stepName }, callback) => {
    dispatch({
      type: ADD_STEP,
      payload: { stepName },
    });
    callback && callback();
  };
};

export const removeStep = (dispatch) => {
  return ({ stepName }) => {
    dispatch({
      type: REMOVE_STEP,
      payload: { stepName },
    });
  };
};

export const addIngredient = (dispatch) => {
  return ({ stepName, ingredient, amount, unit }, callback) => {
    dispatch({
      type: ADD_INGREDIENT,
      payload: { stepName, ingredient, amount, unit },
    });
    callback && callback();
  };
};

export const removeIngredient = (dispatch) => {
  return ({ stepName, ingredient }) => {
    dispatch({
      type: REMOVE_INGREDIENT,
      payload: { stepName, ingredient },
    });
  };
};

export const addInstruction = (dispatch) => {
  return ({ stepName, description }, callback) => {
    dispatch({
      type: ADD_INSTRUCTION,
      payload: { stepName, description },
    });
    callback && callback();
  };
};

export const loadRecipe = (dispatch) => {
  return ({ recipe }, callback) => {
    const multiSteps =
      recipe?.multiSteps == undefined ? true : recipe.multiSteps;
    dispatch({
      type: LOAD_RECIPE,
      payload: { ...recipe, multiSteps },
    });
    callback && callback();
  };
};

export const removeInstruction = (dispatch) => {
  return ({ stepName, description }) => {
    dispatch({
      type: REMOVE_INSTRUCTION,
      payload: { stepName, description },
    });
  };
};

export const loadRecipes = (dispatch) => {
  return (recipes) => {
    dispatch({
      type: LOAD_RECIPES,
      payload: recipes,
    });
  };
};

export const increaseRecipeSize = (dispatch) => {
  return () => {
    dispatch({
      type: INCREASE_RECIPE_SIZE,
    });
  };
};

export const decreaseRecipeSize = (dispatch) => {
  return () => {
    dispatch({
      type: DECREASE_RECIPE_SIZE,
    });
  };
};

export const filterRecipes = (dispatch) => {
  return (text) => {
    dispatch({
      type: FILTER_RECIPES,
      payload: text,
    });
  };
};

export const setFractionation = (dispatch) => {
  return (value) => {
    dispatch({
      type: SET_FRACTIONATION,
      payload: value,
    });
  };
};

export const startLoadRecipes = (dispatch) => {
  return () => {
    dispatch({
      type: START_LOAD_RECIPES,
    });
  };
};

export const startLoadRecipe = (dispatch) => {
  return () => {
    dispatch({
      type: START_LOAD_RECIPE,
    });
  };
};

export const setMultiSteps = (dispatch) => {
  return (value, callback) => {
    dispatch({
      type: SET_MULTI_STEPS,
      payload: value,
    });
    callback && callback();
  };
};

export const removeStepByName = (steps, stepName) => {
  const newSteps = {};
  Object.keys(steps).forEach((key) => {
    if (key !== stepName) {
      newSteps[key] = steps[key];
    }
  });
  return newSteps;
};
