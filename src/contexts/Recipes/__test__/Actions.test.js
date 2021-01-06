import { SET_BASIC_INFO } from '../ActionTypes';
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
} from '../Actions';

describe('setBasicInfo', () => {
  it('should have a SET_BASIC_INFO type', () => {
    const dispatch = jest.fn();
    setBasicInfo(dispatch)({});
    expect(dispatch).toBeCalledWith(
      expect.objectContaining({ type: SET_BASIC_INFO })
    );
  });
  it('should have a valid payload', () => {
    const dispatch = jest.fn();
    setBasicInfo(dispatch)({
      imageUrl: 'image.jpg',
      title: 'Recipe Title',
      portions: 1,
      portionUnit: 'unit',
      calories: 100,
    });
    expect(dispatch).toBeCalledWith(
      expect.objectContaining({
        payload: {
          imageUrl: 'image.jpg',
          title: 'Recipe Title',
          portions: 1,
          portionUnit: 'unit',
          calories: 100,
        },
      })
    );
  });
  it('should execute a callback', () => {
    const dispatch = jest.fn();
    const callback = jest.fn();
    setBasicInfo(dispatch)({}, callback);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
