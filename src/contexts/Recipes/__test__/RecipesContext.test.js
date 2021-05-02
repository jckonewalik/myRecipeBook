it('', () => {});
// import { recipeReducer } from '../RecipesContext';
// import {
//   SET_BASIC_INFO,
//   LOAD_RECIPES,
//   LOAD_RECIPE,
//   NEW_RECIPE,
//   ADD_STEP,
//   REMOVE_STEP,
//   ADD_INGREDIENT,
//   REMOVE_INGREDIENT,
//   ADD_INSTRUCTION,
//   REMOVE_INSTRUCTION,
//   INCREASE_RECIPE_SIZE,
//   DECREASE_RECIPE_SIZE,
//   FILTER_RECIPES,
//   SET_FRACTIONATION,
//   START_LOAD_RECIPE,
//   START_LOAD_RECIPES,
//   SET_MULTI_STEPS,
// } from '../ActionTypes';

// const INITIAL_STATE = {
//   recipes: [],
//   selectedRecipe: {
//     id: null,
//     imageUrl: null,
//     title: '',
//     portions: '',
//     portionUnit: '',
//     calories: '',
//     steps: {},
//   },
// };

// it('when process LOAD_RECIPES action should change the state value of recipes', () => {
//   const action = {
//     type: LOAD_RECIPES,
//     payload: [
//       {
//         id: 1,
//         imageUrl: 'image.png',
//         title: 'teste',
//         portions: 1,
//         portionUnit: 'unit',
//         calories: 100,
//       },
//       {
//         id: 2,
//         imageUrl: 'image2.png',
//         title: 'teste2',
//         portions: 1,
//         portionUnit: 'unit',
//         calories: 100,
//       },
//     ],
//   };

//   const newState = recipeReducer(INITIAL_STATE, action);
//   expect(newState.recipes).toBe(action.payload);
// });

// it('when process LOAD_RECIPE action should change the state value of selectedRecipe', () => {
//   const action = {
//     type: LOAD_RECIPE,
//     payload: {
//       id: 1,
//       imageUrl: 'image.jpg',
//       title: 'Test',
//       portions: 1,
//       portionUnit: 1,
//       calories: 100,
//       steps: {},
//     },
//   };

//   const newState = recipeReducer(INITIAL_STATE, action);
//   expect(newState.selectedRecipe).toBe(action.payload);
// });

// it('when process NEW_RECIPE action should change the state value of selectedRecipe', () => {
//   const action = {
//     type: NEW_RECIPE,
//   };

//   const newState = recipeReducer(INITIAL_STATE, action);
//   expect(newState.selectedRecipe.id).toBe(null);
//   expect(newState.selectedRecipe.imageUrl).toBe(null);
//   expect(newState.selectedRecipe.title).toBe('');
// });

// it('when process SET_BASIC_INFO action should change the state value of imageUrl, title, portions, portionUnit and calories', () => {
//   const action = {
//     type: SET_BASIC_INFO,
//     payload: {
//       imageUrl: 'image.jpg',
//       title: 'Recipe Title',
//       portions: 1,
//       portionUnit: 'unit',
//       calories: 100,
//     },
//   };
//   const newState = recipeReducer(INITIAL_STATE, action);
//   expect(newState.selectedRecipe.imageUrl).toBe(action.payload.imageUrl);
//   expect(newState.selectedRecipe.title).toBe(action.payload.title);
//   expect(newState.selectedRecipe.portions).toBe(action.payload.portions);
//   expect(newState.selectedRecipe.portionUnit).toBe(action.payload.portionUnit);
//   expect(newState.selectedRecipe.calories).toBe(action.payload.calories);
// });

// it('when process ADD_STEP action should add a new step on selectedRecipe', () => {
//   const action = {
//     type: ADD_STEP,
//     payload: {
//       stepName: 'New Step',
//     },
//   };
//   const newState = recipeReducer(INITIAL_STATE, action);
//   expect(Object.keys(newState.selectedRecipe.steps).includes('New Step')).toBe(
//     true
//   );
// });

// it('when process REMOVE_STEP action should remove the step on selectedRecipe', () => {
//   const state = {
//     recipes: [],
//     selectedRecipe: {
//       id: null,
//       imageUrl: null,
//       title: '',
//       portions: '',
//       portionUnit: '',
//       calories: '',
//       steps: {
//         'New Step': {
//           ingredients: [],
//           instructions: [],
//         },
//       },
//     },
//   };
//   const action = {
//     type: REMOVE_STEP,
//     payload: {
//       stepName: 'New Step',
//     },
//   };

//   const newState = recipeReducer(state, action);
//   expect(Object.keys(newState.selectedRecipe.steps).includes('New Step')).toBe(
//     false
//   );
// });

// it('when process ADD_INGREDIENT action should add a new ingredient on selectedRecipe', () => {
//   const state = {
//     recipes: [],
//     selectedRecipe: {
//       id: null,
//       imageUrl: null,
//       title: '',
//       portions: '',
//       portionUnit: '',
//       calories: '',
//       multiSteps: true,
//       steps: {
//         'New Step': {
//           ingredients: [],
//           instructions: [],
//         },
//       },
//     },
//   };
//   const action = {
//     type: ADD_INGREDIENT,
//     payload: {
//       stepName: 'New Step',
//       ingredient: 'Ingredient',
//       amount: 10,
//       unit: 'un',
//     },
//   };
//   const newState = recipeReducer(state, action);
//   expect(Object.keys(newState.selectedRecipe.steps).includes('New Step')).toBe(
//     true
//   );
//   const ingredients = newState.selectedRecipe.steps['New Step'].ingredients;
//   expect(ingredients.length).toBe(1);
//   expect(ingredients[0].ingredient).toBe('Ingredient');
// });

// it('when process ADD_INGREDIENT action for single step should add a new ingredient on selectedRecipe', () => {
//   const state = {
//     recipes: [],
//     selectedRecipe: {
//       id: null,
//       imageUrl: null,
//       title: '',
//       portions: '',
//       portionUnit: '',
//       calories: '',
//       multiSteps: false,
//       steps: {},
//     },
//   };
//   const action = {
//     type: ADD_INGREDIENT,
//     payload: {
//       ingredient: 'Ingredient',
//       amount: 10,
//       unit: 'un',
//     },
//   };
//   const newState = recipeReducer(state, action);
//   const ingredients = newState.selectedRecipe.steps.ingredients;
//   expect(ingredients.length).toBe(1);
//   expect(ingredients[0].ingredient).toBe('Ingredient');
// });

// it('when process REMOVE_INGREDIENT action should remove the ingredient on selectedRecipe', () => {
//   const state = {
//     recipes: [],
//     selectedRecipe: {
//       id: null,
//       imageUrl: null,
//       title: '',
//       portions: '',
//       portionUnit: '',
//       calories: '',
//       multiSteps: true,
//       steps: {
//         'New Step': {
//           ingredients: [{ ingredient: 'Ingredient', amount: 10, unit: 'un' }],
//           instructions: [],
//         },
//       },
//     },
//   };
//   const action = {
//     type: REMOVE_INGREDIENT,
//     payload: {
//       stepName: 'New Step',
//       ingredient: 'Ingredient',
//     },
//   };
//   const newState = recipeReducer(state, action);
//   expect(Object.keys(newState.selectedRecipe.steps).includes('New Step')).toBe(
//     true
//   );
//   const ingredients = newState.selectedRecipe.steps['New Step'].ingredients;
//   expect(ingredients.length).toBe(0);
// });

// it('when process REMOVE_INGREDIENT action for single step should remove the ingredient on selectedRecipe', () => {
//   const state = {
//     recipes: [],
//     selectedRecipe: {
//       id: null,
//       imageUrl: null,
//       title: '',
//       portions: '',
//       portionUnit: '',
//       calories: '',
//       multiSteps: false,
//       steps: {
//         ingredients: [{ ingredient: 'Ingredient', amount: 10, unit: 'un' }],
//       },
//     },
//   };
//   const action = {
//     type: REMOVE_INGREDIENT,
//     payload: {
//       ingredient: 'Ingredient',
//     },
//   };
//   const newState = recipeReducer(state, action);
//   const ingredients = newState.selectedRecipe.steps.ingredients;
//   expect(ingredients.length).toBe(0);
// });

// it('when process ADD_INSTRUCTION action should add a new instruction on selectedRecipe', () => {
//   const state = {
//     recipes: [],
//     selectedRecipe: {
//       id: null,
//       imageUrl: null,
//       title: '',
//       portions: '',
//       portionUnit: '',
//       calories: '',
//       multiSteps: true,
//       steps: {
//         'New Step': {
//           ingredients: [],
//           instructions: [],
//         },
//       },
//     },
//   };
//   const action = {
//     type: ADD_INSTRUCTION,
//     payload: {
//       stepName: 'New Step',
//       description: 'Instruction 1',
//     },
//   };
//   const newState = recipeReducer(state, action);
//   expect(Object.keys(newState.selectedRecipe.steps).includes('New Step')).toBe(
//     true
//   );
//   const instructions = newState.selectedRecipe.steps['New Step'].instructions;
//   expect(instructions.length).toBe(1);
//   expect(instructions[0].description).toBe('Instruction 1');
// });

// it('when process ADD_INSTRUCTION action for single step should add a new instruction on selectedRecipe', () => {
//   const state = {
//     recipes: [],
//     selectedRecipe: {
//       id: null,
//       imageUrl: null,
//       title: '',
//       portions: '',
//       portionUnit: '',
//       calories: '',
//       multiSteps: false,
//       steps: {},
//     },
//   };
//   const action = {
//     type: ADD_INSTRUCTION,
//     payload: {
//       description: 'Instruction 1',
//     },
//   };
//   const newState = recipeReducer(state, action);
//   const instructions = newState.selectedRecipe.steps.instructions;
//   expect(instructions.length).toBe(1);
//   expect(instructions[0].description).toBe('Instruction 1');
// });

// it('when process REMOVE_INSTRUCTION action should remove the instruction on selectedRecipe', () => {
//   const state = {
//     recipes: [],
//     selectedRecipe: {
//       id: null,
//       imageUrl: null,
//       title: '',
//       portions: '',
//       portionUnit: '',
//       calories: '',
//       multiSteps: true,
//       steps: {
//         'New Step': {
//           ingredients: [],
//           instructions: [{ description: 'Instruction 1' }],
//         },
//       },
//     },
//   };
//   const action = {
//     type: REMOVE_INSTRUCTION,
//     payload: {
//       stepName: 'New Step',
//       description: 'Instruction 1',
//     },
//   };
//   const newState = recipeReducer(state, action);
//   expect(Object.keys(newState.selectedRecipe.steps).includes('New Step')).toBe(
//     true
//   );
//   const instructions = newState.selectedRecipe.steps['New Step'].instructions;
//   expect(instructions.length).toBe(0);
// });

// it('when process REMOVE_INSTRUCTION action for single step should remove the instruction on selectedRecipe', () => {
//   const state = {
//     recipes: [],
//     selectedRecipe: {
//       id: null,
//       imageUrl: null,
//       title: '',
//       portions: '',
//       portionUnit: '',
//       calories: '',
//       multiSteps: false,
//       steps: {
//         instructions: [{ description: 'Instruction 1' }],
//       },
//     },
//   };
//   const action = {
//     type: REMOVE_INSTRUCTION,
//     payload: {
//       description: 'Instruction 1',
//     },
//   };
//   const newState = recipeReducer(state, action);
//   const instructions = newState.selectedRecipe.steps.instructions;
//   expect(instructions.length).toBe(0);
// });

// it('when process INCREASE_RECIPE_SIZE action should increase the totalRecipes value', () => {
//   const state = {
//     totalRecipes: 1,
//     fractionation: 0.5,
//   };
//   const action = {
//     type: INCREASE_RECIPE_SIZE,
//   };
//   const newState = recipeReducer(state, action);
//   expect(newState.totalRecipes).toBe(1.5);
// });

// describe('DECREASE_RECIPE_SIZE', () => {
//   it('must decrease the totalRecipes value', () => {
//     const state = {
//       totalRecipes: 1,
//       fractionation: 0.5,
//     };
//     const action = {
//       type: DECREASE_RECIPE_SIZE,
//     };
//     const newState = recipeReducer(state, action);
//     expect(newState.totalRecipes).toBe(0.5);
//   });
//   it('when totalRecipes less or equal then fractionation must keep the totalRecipes value', () => {
//     const state = {
//       totalRecipes: 1,
//       fractionation: 1,
//     };
//     const action = {
//       type: DECREASE_RECIPE_SIZE,
//     };
//     const newState = recipeReducer(state, action);
//     expect(newState.totalRecipes).toBe(1);
//   });
// });

// it('when process FILTER_RECIPES action must filter recipes', () => {
//   const state = {
//     recipes: [{ title: 'Recipe 1' }, { title: 'Recipe 2' }, { title: 'Test' }],
//     filteredRecipes: [
//       { title: 'Recipe 1' },
//       { title: 'Recipe 2' },
//       { title: 'Test' },
//     ],
//   };
//   const action = {
//     type: FILTER_RECIPES,
//     payload: 'Test',
//   };
//   const newState = recipeReducer(state, action);
//   expect(newState.filteredRecipes.length).toBe(1);
// });

// it('when process SET_FRACTIONATION action must set fractionation value', () => {
//   const state = {
//     fractionation: 1,
//   };
//   const action = {
//     type: SET_FRACTIONATION,
//     payload: 0.5,
//   };
//   const newState = recipeReducer(state, action);
//   expect(newState.fractionation).toBe(0.5);
// });

// it('when process START_LOAD_RECIPE action must set loadingRecipe value', () => {
//   const state = {
//     loadingRecipe: false,
//   };
//   const action = {
//     type: START_LOAD_RECIPE,
//   };
//   const newState = recipeReducer(state, action);
//   expect(newState.loadingRecipe).toBe(true);
// });

// it('when process START_LOAD_RECIPES action must set loadingRecipes value', () => {
//   const state = {
//     loadingRecipes: false,
//   };
//   const action = {
//     type: START_LOAD_RECIPES,
//   };
//   const newState = recipeReducer(state, action);
//   expect(newState.loadingRecipes).toBe(true);
// });

// it('when process SET_MULTI_STEPS action must set multiSteps value', () => {
//   const state = {
//     selectedRecipe: {
//       multiSteps: false,
//     },
//   };
//   const action = {
//     type: SET_MULTI_STEPS,
//     payload: true,
//   };
//   const newState = recipeReducer(state, action);
//   expect(newState.selectedRecipe.multiSteps).toBe(true);
// });

// it('when pass an INVALID action type should not change the state', () => {
//   const newState = recipeReducer(INITIAL_STATE, { type: 'INVALID_TYPE' });
//   expect(newState).toBe(INITIAL_STATE);
// });
