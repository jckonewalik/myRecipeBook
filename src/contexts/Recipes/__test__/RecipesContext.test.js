import { recipeReducer } from '../RecipesContext';
import { SET_BASIC_INFO, LOAD_RECIPES } from '../ActionTypes';

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

it('when process SET_BASIC_INFO action should change the state value of imageUrl, title, portions, portionUnit and calories', () => {
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

it('when process LOAD_RECIPES action should change the state value of recipes', () => {
  const action = {
    type: LOAD_RECIPES,
    payload: [
      {
        id: 1,
        imageUrl: 'image.png',
        title: 'teste',
        portions: 1,
        portionUnit: 'unit',
        calories: 100,
      },
      {
        id: 2,
        imageUrl: 'image2.png',
        title: 'teste2',
        portions: 1,
        portionUnit: 'unit',
        calories: 100,
      },
    ],
  };

  const newState = recipeReducer(INITIAL_STATE, action);
  expect(newState.recipes).toBe(action.payload);
});

it('when pass an INVALID action type should not change the state', () => {
  const newState = recipeReducer(INITIAL_STATE, { type: 'INVALID_TYPE' });
  expect(newState).toBe(INITIAL_STATE);
});
