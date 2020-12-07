import createDataContext from '../createDataContext';
import { SET_BASIC_INFO, ADD_STEP, REMOVE_STEP } from './ActionTypes';

const INITIAL_STATE = {
  title: 'Esfirra',
  portions: '32',
  portionUnit: 'Unidades',
  calories: '150',
  steps: [
    {
      name: 'Massa',
    },
    {
      name: 'Recheio',
    },
  ],
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
        steps: [...state.steps, { name: payload.stepName }],
      };
    case REMOVE_STEP:
      return {
        ...state,
        steps: state.steps.filter((step) => step.name !== payload.stepName),
      };
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

export const { Context, Provider } = createDataContext(
  newRecipeReducer,
  { setBasicInfo, addStep, removeStep },
  INITIAL_STATE
);
