import { act, render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import Routes from '../../routes';
import { clearDatabase } from '../../src/database/repository/__mocks__/RecipesRepository';
import { Provider } from '../../src/contexts/Recipes/RecipesContext';

jest.useFakeTimers();

test('create a new recipe with multi steps and save it', async () => {
  clearDatabase();

  const component = (
    <Provider>
      <Routes />
    </Provider>
  );
  // render home screen
  const screen = render(component);

  // find new recipe button and press it
  const createRecipeButton = screen.getByTestId('createRecipeButton');
  fireEvent.press(createRecipeButton);

  // New Recipe Screen -> setting values
  fireEvent.changeText(screen.getByTestId('recipeTitleInput'), 'Test');
  fireEvent.changeText(screen.getByTestId('recipePortionsInput'), '1');
  fireEvent(screen.getByTestId('portionUnitPicker'), 'onValueChange', 'units');
  fireEvent.press(screen.getByTestId('portionUnitPickerSelect'));
  fireEvent.changeText(screen.getByTestId('recipeCaloriesInput'), '200');
  fireEvent.press(screen.getByTestId('navigateToCheckStepsButton'));

  // Check Steps Screen -> multi steps
  fireEvent.press(screen.getByTestId('multiStepOption'));
  fireEvent.press(screen.getByTestId('navigateToCheckStepsButton'));
  fireEvent.press(screen.getByTestId('checkStepsNavigationButton'));

  // Steps Screen -> setting values
  fireEvent.changeText(screen.getByTestId('nameStepInput'), 'Step 1');
  fireEvent.press(screen.getByTestId('addStepButton'));
  fireEvent.press(screen.getByTestId('stepsScreenNavigationButton'));

  // Ingredients Screen -> setting values
  fireEvent(
    screen.getByTestId('ingredientStepPicker'),
    'onValueChange',
    'Step 1'
  );
  fireEvent.press(screen.getByTestId('ingredientStepPickerSelect'));
  fireEvent.changeText(screen.getByTestId('ingredientName'), 'Ingredient 1');
  fireEvent.changeText(screen.getByTestId('ingredientQuantity'), '1');
  fireEvent.changeText(screen.getByTestId('ingredientQuantityUnit'), 'un');

  fireEvent.press(screen.getByTestId('addIngredientButton'));
  fireEvent.press(screen.getByTestId('ingredientsScreenNavigationButton'));

  // Preparation Mode Screen -> setting values
  fireEvent(
    screen.getByTestId('preparationModeStepPicker'),
    'onValueChange',
    'Step 1'
  );
  fireEvent.press(screen.getByTestId('preparationModeStepPickerSelect'));
  fireEvent.changeText(
    screen.getByTestId('preparationDescription'),
    'Description 1'
  );
  fireEvent.press(screen.getByTestId('addPreparationDescription'));
  fireEvent.press(screen.getByTestId('saveRecipeButton'));

  await act(async () => {
    expect(screen.getAllByTestId('recipeCard').length).toEqual(1);
  });
});

test('create a new recipe with single step and save it', async () => {
  clearDatabase();

  const component = (
    <Provider>
      <Routes />
    </Provider>
  );
  // render home screen
  const screen = render(component);

  // find new recipe button and press it
  const createRecipeButton = screen.getByTestId('createRecipeButton');
  fireEvent.press(createRecipeButton);

  // New Recipe Screen -> setting values
  fireEvent.changeText(screen.getByTestId('recipeTitleInput'), 'Test');
  fireEvent.changeText(screen.getByTestId('recipePortionsInput'), '1');
  fireEvent(screen.getByTestId('portionUnitPicker'), 'onValueChange', 'units');
  fireEvent.press(screen.getByTestId('portionUnitPickerSelect'));
  fireEvent.changeText(screen.getByTestId('recipeCaloriesInput'), '200');
  fireEvent.press(screen.getByTestId('navigateToCheckStepsButton'));

  // Check Steps Screen -> multi steps
  fireEvent.press(screen.getByTestId('checkStepsNavigationButton'));

  fireEvent.changeText(screen.getByTestId('ingredientName'), 'Ingredient 1');
  fireEvent.changeText(screen.getByTestId('ingredientQuantity'), '1');
  fireEvent.changeText(screen.getByTestId('ingredientQuantityUnit'), 'un');

  fireEvent.press(screen.getByTestId('addIngredientButton'));
  fireEvent.press(screen.getByTestId('ingredientsScreenNavigationButton'));

  // Preparation Mode Screen -> setting values
  fireEvent.changeText(
    screen.getByTestId('preparationDescription'),
    'Description 1'
  );
  fireEvent.press(screen.getByTestId('addPreparationDescription'));
  fireEvent.press(screen.getByTestId('saveRecipeButton'));

  await act(async () => {
    expect(screen.getAllByTestId('recipeCard').length).toEqual(1);
  });
});

test('update a recipe and save it', async () => {
  const component = (
    <Provider>
      <Routes />
    </Provider>
  );
  // render home screen
  const screen = render(component);

  await act(async () => {
    expect(screen.getByTestId('recipeCard')).toHaveTextContent(
      'Test 01 [missing "en.unit" translation]'
    );
  });

  const editRecipeButton = screen.getByTestId('editRecipeButton');
  fireEvent.press(editRecipeButton);

  // New Recipe Screen -> setting values
  fireEvent.changeText(screen.getByTestId('recipeTitleInput'), 'Test Edited');
  fireEvent.press(screen.getByTestId('navigateToCheckStepsButton'));

  fireEvent.press(screen.getByTestId('ingredientsScreenNavigationButton'));
  await act(async () => {
    fireEvent.press(screen.getByTestId('saveRecipeButton'));
  });

  await act(async () => {
    expect(screen.getByTestId('recipeCard')).toHaveTextContent(
      'Test Edited1 [missing "en.unit" translation]'
    );
  });
});
