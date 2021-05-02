it('', () => {});
// import {
//   LOAD_RECIPES,
//   LOAD_RECIPE,
//   SET_BASIC_INFO,
//   NEW_RECIPE,
//   ADD_STEP,
//   REMOVE_STEP,
//   ADD_INGREDIENT,
//   ADD_INSTRUCTION,
//   REMOVE_INGREDIENT,
//   REMOVE_INSTRUCTION,
//   INCREASE_RECIPE_SIZE,
//   DECREASE_RECIPE_SIZE,
//   FILTER_RECIPES,
//   SET_FRACTIONATION,
//   START_LOAD_RECIPES,
//   START_LOAD_RECIPE,
//   SET_MULTI_STEPS,
// } from '../ActionTypes';
// import {
//   loadRecipes,
//   setBasicInfo,
//   addStep,
//   removeStep,
//   addIngredient,
//   removeIngredient,
//   addInstruction,
//   removeInstruction,
//   newRecipe,
//   loadRecipe,
//   removeStepByName,
//   increaseRecipeSize,
//   decreaseRecipeSize,
//   filterRecipes,
//   setFractionation,
//   startLoadRecipes,
//   startLoadRecipe,
//   setMultiSteps,
// } from '../Actions';

// describe('setBasicInfo', () => {
//   it('should have a SET_BASIC_INFO type', () => {
//     const dispatch = jest.fn();
//     setBasicInfo(dispatch)({});
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({ type: SET_BASIC_INFO })
//     );
//   });
//   it('should have a valid payload', () => {
//     const dispatch = jest.fn();
//     const payload = {
//       imageUrl: 'image.jpg',
//       title: 'Recipe Title',
//       portions: 1,
//       portionUnit: 'unit',
//       calories: 100,
//     };
//     setBasicInfo(dispatch)(payload);
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({
//         payload: payload,
//       })
//     );
//   });
//   it('should execute a callback', () => {
//     const dispatch = jest.fn();
//     const callback = jest.fn();
//     setBasicInfo(dispatch)({}, callback);
//     expect(callback).toHaveBeenCalledTimes(1);
//   });
// });

// describe('loadRecipes', () => {
//   it('should have a LOAD_RECIPES type', () => {
//     const dispatch = jest.fn();
//     loadRecipes(dispatch)({});
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({ type: LOAD_RECIPES })
//     );
//   });
//   it('should have a valid payload', () => {
//     const dispatch = jest.fn();
//     const payload = [
//       {
//         id: 1,
//         imageUrl: 'image.png',
//         title: 'test',
//         portions: 1,
//         portionUnit: 'unit',
//         calories: 100,
//       },
//       {
//         id: 2,
//         imageUrl: 'image2.png',
//         title: 'test2',
//         portions: 1,
//         portionUnit: 'unit',
//         calories: 100,
//       },
//     ];
//     loadRecipes(dispatch)(payload);
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({
//         payload: payload,
//       })
//     );
//   });
// });

// describe('loadRecipe', () => {
//   it('should have a LOAD_RECIPE type', () => {
//     const dispatch = jest.fn();
//     loadRecipe(dispatch)({});
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({ type: LOAD_RECIPE })
//     );
//   });
//   it('should have a valid payload', () => {
//     const dispatch = jest.fn();
//     const payload = {
//       id: 1,
//       imageUrl: 'image.jpg',
//       title: 'Test',
//       portions: 1,
//       portionUnit: 1,
//       calories: 100,
//       steps: {},
//     };

//     loadRecipe(dispatch)({ recipe: payload });
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({
//         payload: { ...payload, multiSteps: true },
//       })
//     );
//   });
//   it('should execute a callback', () => {
//     const dispatch = jest.fn();
//     const callback = jest.fn();
//     loadRecipe(dispatch)({}, callback);
//     expect(callback).toHaveBeenCalledTimes(1);
//   });
// });

// describe('newRecipe', () => {
//   it('should have a NEW_RECIPE type', () => {
//     const dispatch = jest.fn();
//     newRecipe(dispatch)();
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({ type: NEW_RECIPE })
//     );
//   });
//   it('should execute a callback', () => {
//     const dispatch = jest.fn();
//     const callback = jest.fn();
//     newRecipe(dispatch)(callback);
//     expect(callback).toHaveBeenCalledTimes(1);
//   });
// });

// describe('addStep', () => {
//   it('should have a ADD_STEP type', () => {
//     const dispatch = jest.fn();
//     addStep(dispatch)({});
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({ type: ADD_STEP })
//     );
//   });
//   it('should have a valid payload', () => {
//     const dispatch = jest.fn();
//     const payload = {
//       stepName: 'Test',
//     };

//     addStep(dispatch)(payload);
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({
//         payload: payload,
//       })
//     );
//   });
//   it('should execute a callback', () => {
//     const dispatch = jest.fn();
//     const callback = jest.fn();
//     addStep(dispatch)({}, callback);
//     expect(callback).toHaveBeenCalledTimes(1);
//   });
// });
// describe('removeStep', () => {
//   it('should have a REMOVE_STEP type', () => {
//     const dispatch = jest.fn();
//     removeStep(dispatch)({});
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({ type: REMOVE_STEP })
//     );
//   });
//   it('should have a valid payload', () => {
//     const dispatch = jest.fn();
//     const payload = {
//       stepName: 'Test',
//     };

//     removeStep(dispatch)(payload);
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({
//         payload: payload,
//       })
//     );
//   });
// });

// describe('addIngredient', () => {
//   it('should have a ADD_INGREDIENT type', () => {
//     const dispatch = jest.fn();
//     addIngredient(dispatch)({});
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({ type: ADD_INGREDIENT })
//     );
//   });
//   it('should have a valid payload', () => {
//     const dispatch = jest.fn();
//     const payload = {
//       stepName: 'Test',
//       ingredient: 'Test',
//       amount: 1,
//       unit: 'un',
//     };

//     addIngredient(dispatch)(payload);
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({
//         payload: payload,
//       })
//     );
//   });
//   it('should execute a callback', () => {
//     const dispatch = jest.fn();
//     const callback = jest.fn();
//     addIngredient(dispatch)({}, callback);
//     expect(callback).toHaveBeenCalledTimes(1);
//   });
// });

// describe('removeIngredient', () => {
//   it('should have a REMOVE_INGREDIENT type', () => {
//     const dispatch = jest.fn();
//     removeIngredient(dispatch)({});
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({ type: REMOVE_INGREDIENT })
//     );
//   });
//   it('should have a valid payload', () => {
//     const dispatch = jest.fn();
//     const payload = {
//       stepName: 'Test',
//       ingredient: 'Test',
//     };

//     removeIngredient(dispatch)(payload);
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({
//         payload: payload,
//       })
//     );
//   });
// });

// describe('addInstruction', () => {
//   it('should have a ADD_INSTRUCTION type', () => {
//     const dispatch = jest.fn();
//     addInstruction(dispatch)({});
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({ type: ADD_INSTRUCTION })
//     );
//   });
//   it('should have a valid payload', () => {
//     const dispatch = jest.fn();
//     const payload = {
//       stepName: 'Test',
//       description: 'Test',
//     };

//     addInstruction(dispatch)(payload);
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({
//         payload: payload,
//       })
//     );
//   });
//   it('should execute a callback', () => {
//     const dispatch = jest.fn();
//     const callback = jest.fn();
//     addInstruction(dispatch)({}, callback);
//     expect(callback).toHaveBeenCalledTimes(1);
//   });
// });

// describe('removeInstruction', () => {
//   it('should have a REMOVE_INSTRUCTION type', () => {
//     const dispatch = jest.fn();
//     removeInstruction(dispatch)({});
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({ type: REMOVE_INSTRUCTION })
//     );
//   });
//   it('should have a valid payload', () => {
//     const dispatch = jest.fn();
//     const payload = {
//       stepName: 'Test',
//       description: 'Test',
//     };

//     removeInstruction(dispatch)(payload);
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({
//         payload: payload,
//       })
//     );
//   });
// });

// describe('increaseRecipeSize', () => {
//   it('should have a INCREASE_RECIPE_SIZE type', () => {
//     const dispatch = jest.fn();
//     increaseRecipeSize(dispatch)({});
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({ type: INCREASE_RECIPE_SIZE })
//     );
//   });
// });

// describe('decreaseRecipeSize', () => {
//   it('should have a DECREASE_RECIPE_SIZE type', () => {
//     const dispatch = jest.fn();
//     decreaseRecipeSize(dispatch)({});
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({ type: DECREASE_RECIPE_SIZE })
//     );
//   });
// });

// describe('filterRecipes', () => {
//   it('should have a FILTER_RECIPES type', () => {
//     const dispatch = jest.fn();
//     const text = 'Test';
//     filterRecipes(dispatch)(text);
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({ type: FILTER_RECIPES, payload: 'Test' })
//     );
//   });
// });

// describe('setFractionation', () => {
//   it('should have a SET_FRACTIONATION type', () => {
//     const dispatch = jest.fn();
//     const value = 0.5;
//     setFractionation(dispatch)(value);
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({ type: SET_FRACTIONATION, payload: value })
//     );
//   });
// });

// describe('removeStepByName', () => {
//   it('should remove the right step', () => {
//     const steps = {
//       Test1: 'Step test 1',
//       Test2: 'Step test 2',
//       Test3: 'Step test 3',
//     };
//     const newSteps = removeStepByName(steps, 'Test2');
//     expect(newSteps).toStrictEqual({
//       Test1: 'Step test 1',
//       Test3: 'Step test 3',
//     });
//   });
// });

// describe('startLoadRecipes', () => {
//   it('should have a START_LOAD_RECIPES type', () => {
//     const dispatch = jest.fn();
//     startLoadRecipes(dispatch)();
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({ type: START_LOAD_RECIPES })
//     );
//   });
// });

// describe('startLoadRecipe', () => {
//   it('should have a START_LOAD_RECIPE type', () => {
//     const dispatch = jest.fn();
//     startLoadRecipe(dispatch)();
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({ type: START_LOAD_RECIPE })
//     );
//   });
// });

// describe('setMultiSteps', () => {
//   it('should have a SET_MULTI_STEPS type', () => {
//     const dispatch = jest.fn();
//     const callback = jest.fn();
//     setMultiSteps(dispatch)(true, callback);
//     expect(dispatch).toBeCalledWith(
//       expect.objectContaining({ type: SET_MULTI_STEPS, payload: true })
//     );
//     expect(callback).toHaveBeenCalled();
//   });
// });
