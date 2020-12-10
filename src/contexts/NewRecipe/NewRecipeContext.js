import createDataContext from '../createDataContext';
import {
  SET_BASIC_INFO,
  ADD_STEP,
  REMOVE_STEP,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
} from './ActionTypes';

const INITIAL_STATE = {
  title: 'Esfirra',
  portions: '32',
  portionUnit: 'Unidades',
  calories: '150',
  steps: {
    Massa: [
      {
        ingredient: 'Farinha de Trigo',
        amount: 1,
        unit: 'Kg',
      },
      {
        ingredient: 'Óleo de soja',
        amount: 150,
        unit: 'ml',
      },
    ],
    Recheio: [],
  },
};

const newRecipeReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_BASIC_INFO:
      return {
        ...state,
        title: payload.title,
        portions: payload.portions,
        portionUnit: payload.portionUnit,
        calories: payload.calories,
      };
    case ADD_STEP:
      return {
        ...state,
        steps: { ...state.steps, [payload.stepName]: {} },
      };
    case REMOVE_STEP:
      return {
        ...state,
        steps: removeStepByName(state.steps, payload.stepName),
      };
    case ADD_INGREDIENT: {
      return {
        ...state,
        steps: {
          ...state.steps,
          [payload.stepName]: [
            ...state.steps[payload.stepName],
            {
              ingredient: payload.ingredient,
              amount: payload.amount,
              unit: payload.unit,
            },
          ],
        },
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        steps: {
          ...state.steps,
          [payload.stepName]:
            state.steps[payload.stepName] &&
            state.steps[payload.stepName].filter(
              (s) => s.ingredient !== payload.ingredient
            ),
        },
      };
    }
    default:
      return state;
  }
};

const setBasicInfo = (dispatch) => {
  return ({ title, portions, portionUnit, calories }, callback) => {
    dispatch({
      type: SET_BASIC_INFO,
      payload: { title, portions, portionUnit, calories },
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
  newRecipeReducer,
  { setBasicInfo, addStep, removeStep, addIngredient, removeIngredient },
  INITIAL_STATE
);
