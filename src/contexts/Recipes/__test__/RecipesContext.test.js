import { recipeReducer } from '../RecipesContext';
import { SET_BASIC_INFO } from '../ActionTypes';

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

it('should process correctly SET_BASIC_INFO action', () => {
  const action = {
    type: SET_BASIC_INFO,
    payload: {
      imageUrl: 'image.jpg',
      title: 'Recipe Title',
      portions: 1,
      portionUnit: 'unit',
      calories: 100,
    },
  };
  const newState = recipeReducer(INITIAL_STATE, action);
  expect(newState.selectedRecipe.imageUrl).toBe(action.payload.imageUrl);
  expect(newState.selectedRecipe.title).toBe(action.payload.title);
  expect(newState.selectedRecipe.portions).toBe(action.payload.portions);
  expect(newState.selectedRecipe.portionUnit).toBe(action.payload.portionUnit);
  expect(newState.selectedRecipe.calories).toBe(action.payload.calories);
});

it('should not change the state passing an invalid action type', () => {
  const newState = recipeReducer(INITIAL_STATE, { type: 'INVALID_TYPE' });
  expect(newState).toBe(INITIAL_STATE);
});
