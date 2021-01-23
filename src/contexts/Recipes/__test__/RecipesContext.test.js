import { recipeReducer } from '../RecipesContext';
import {
  SET_BASIC_INFO,
  LOAD_RECIPES,
  LOAD_RECIPE,
  NEW_RECIPE,
  ADD_STEP,
  REMOVE_STEP,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_INSTRUCTION,
  REMOVE_INSTRUCTION,
} from '../ActionTypes';

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

it('when process LOAD_RECIPE action should change the state value of selectedRecipe', () => {
  const action = {
    type: LOAD_RECIPE,
    payload: {
      id: 1,
      imageUrl: 'image.jpg',
      title: 'Test',
      portions: 1,
      portionUnit: 1,
      calories: 100,
      steps: {},
    },
  };

  const newState = recipeReducer(INITIAL_STATE, action);
  expect(newState.selectedRecipe).toBe(action.payload);
});

it('when process NEW_RECIPE action should change the state value of selectedRecipe', () => {
  const action = {
    type: NEW_RECIPE,
  };

  const newState = recipeReducer(INITIAL_STATE, action);
  expect(newState.selectedRecipe.id).toBe(null);
  expect(newState.selectedRecipe.imageUrl).toBe(null);
  expect(newState.selectedRecipe.title).toBe('');
});

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

it('when process ADD_STEP action should add a new step on selectedRecipe', () => {
  const action = {
    type: ADD_STEP,
    payload: {
      stepName: 'New Step',
    },
  };
  const newState = recipeReducer(INITIAL_STATE, action);
  expect(Object.keys(newState.selectedRecipe.steps).includes('New Step')).toBe(
    true
  );
});

it('when process REMOVE_STEP action should remove the step on selectedRecipe', () => {
  const state = {
    recipes: [],
    selectedRecipe: {
      id: null,
      imageUrl: null,
      title: '',
      portions: '',
      portionUnit: '',
      calories: '',
      steps: {
        'New Step': {
          ingredients: [],
          instructions: [],
        },
      },
    },
  };
  const action = {
    type: REMOVE_STEP,
    payload: {
      stepName: 'New Step',
    },
  };

  const newState = recipeReducer(state, action);
  expect(Object.keys(newState.selectedRecipe.steps).includes('New Step')).toBe(
    false
  );
});

it('when process ADD_INGREDIENT action should add a new ingredient on selectedRecipe', () => {
  const state = {
    recipes: [],
    selectedRecipe: {
      id: null,
      imageUrl: null,
      title: '',
      portions: '',
      portionUnit: '',
      calories: '',
      steps: {
        'New Step': {
          ingredients: [],
          instructions: [],
        },
      },
    },
  };
  const action = {
    type: ADD_INGREDIENT,
    payload: {
      stepName: 'New Step',
      ingredient: 'Ingredient',
      amount: 10,
      unit: 'un',
    },
  };
  const newState = recipeReducer(state, action);
  expect(Object.keys(newState.selectedRecipe.steps).includes('New Step')).toBe(
    true
  );
  const ingredients = newState.selectedRecipe.steps['New Step'].ingredients;
  expect(ingredients.length).toBe(1);
  expect(ingredients[0].ingredient).toBe('Ingredient');
});

it('when process REMOVE_INGREDIENT action should remove the ingredient on selectedRecipe', () => {
  const state = {
    recipes: [],
    selectedRecipe: {
      id: null,
      imageUrl: null,
      title: '',
      portions: '',
      portionUnit: '',
      calories: '',
      steps: {
        'New Step': {
          ingredients: [{ ingredient: 'Ingredient', amount: 10, unit: 'un' }],
          instructions: [],
        },
      },
    },
  };
  const action = {
    type: REMOVE_INGREDIENT,
    payload: {
      stepName: 'New Step',
      ingredient: 'Ingredient',
    },
  };
  const newState = recipeReducer(state, action);
  expect(Object.keys(newState.selectedRecipe.steps).includes('New Step')).toBe(
    true
  );
  const ingredients = newState.selectedRecipe.steps['New Step'].ingredients;
  expect(ingredients.length).toBe(0);
});

it('when process ADD_INSTRUCTION action should add a new instruction on selectedRecipe', () => {
  const state = {
    recipes: [],
    selectedRecipe: {
      id: null,
      imageUrl: null,
      title: '',
      portions: '',
      portionUnit: '',
      calories: '',
      steps: {
        'New Step': {
          ingredients: [],
          instructions: [],
        },
      },
    },
  };
  const action = {
    type: ADD_INSTRUCTION,
    payload: {
      stepName: 'New Step',
      description: 'Instruction 1',
    },
  };
  const newState = recipeReducer(state, action);
  expect(Object.keys(newState.selectedRecipe.steps).includes('New Step')).toBe(
    true
  );
  const instructions = newState.selectedRecipe.steps['New Step'].instructions;
  expect(instructions.length).toBe(1);
  expect(instructions[0].description).toBe('Instruction 1');
});

it('when process REMOVE_INSTRUCTION action should remove the instruction on selectedRecipe', () => {
  const state = {
    recipes: [],
    selectedRecipe: {
      id: null,
      imageUrl: null,
      title: '',
      portions: '',
      portionUnit: '',
      calories: '',
      steps: {
        'New Step': {
          ingredients: [],
          instructions: [{ description: 'Instruction 1' }],
        },
      },
    },
  };
  const action = {
    type: REMOVE_INSTRUCTION,
    payload: {
      stepName: 'New Step',
      description: 'Instruction 1',
    },
  };
  const newState = recipeReducer(state, action);
  expect(Object.keys(newState.selectedRecipe.steps).includes('New Step')).toBe(
    true
  );
  const instructions = newState.selectedRecipe.steps['New Step'].instructions;
  expect(instructions.length).toBe(0);
});

it('when pass an INVALID action type should not change the state', () => {
  const newState = recipeReducer(INITIAL_STATE, { type: 'INVALID_TYPE' });
  expect(newState).toBe(INITIAL_STATE);
});
