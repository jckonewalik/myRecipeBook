import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import Routes from '../../routes';
import { Provider } from '../../src/contexts/Recipes/RecipesContext';
import { clearDatabase } from '../../src/database/repository/__mocks__/RecipesRepository';
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
  fireEvent.press(screen.getByTestId('portionUnitPickerModalPress'));
  fireEvent(screen.getByTestId('portionUnitPicker'), 'onValueChange', 'units');
  fireEvent.press(screen.getByTestId('portionUnitPickerSelect'));
  fireEvent.changeText(screen.getByTestId('recipeCaloriesInput'), '200');
  fireEvent.press(screen.getByTestId('navigateToCheckStepsButton'));

  // Check Steps Screen -> multi steps
  await act(async () => {
    fireEvent.press(screen.getByTestId('multiStepOption'));
  });
  fireEvent.press(screen.getByTestId('checkStepsNavigationButton'));

  // Steps Screen -> setting values
  fireEvent.changeText(screen.getByTestId('nameStepInput'), 'Step 1');
  fireEvent.press(screen.getByTestId('addStepButton'));
  fireEvent.press(screen.getByTestId('stepsScreenNavigationButton'));

  // Ingredients Screen -> setting values
  fireEvent.press(screen.getByTestId('ingredientStepPickerModalPress'));
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
  fireEvent.press(screen.getByTestId('preparationModeStepPickerModalPress'));
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
  await act(async () => {
    fireEvent.press(screen.getByTestId('saveRecipeButton'));
  });

  expect(screen.getAllByTestId('recipeCard').length).toEqual(1);
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
  fireEvent.press(screen.getByTestId('portionUnitPickerModalPress'));
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
  await act(async () => {
    fireEvent.press(screen.getByTestId('saveRecipeButton'));
  });

  expect(screen.getAllByTestId('recipeCard').length).toEqual(1);
});

test('update a recipe and save it', async () => {
  const component = (
    <Provider>
      <Routes />
    </Provider>
  );
  // render home screen
  const screen = render(component);
  await waitFor(() => screen.getByTestId('recipeCard'));

  expect(screen.getByTestId('recipeCard')).toHaveTextContent('Test 01 Unit');

  const editRecipeButton = screen.getByTestId('editRecipeButton');
  await act(async () => {
    fireEvent.press(editRecipeButton);
  });

  await waitFor(() => screen.getByTestId('recipeTitleInput'));

  // New Recipe Screen -> setting values
  await act(async () => {
    fireEvent.changeText(screen.getByTestId('recipeTitleInput'), 'Test Edited');
  });
  await act(async () => {
    fireEvent.press(screen.getByTestId('navigateToCheckStepsButton'));
  });
  await act(async () => {
    fireEvent.press(screen.getByTestId('ingredientsScreenNavigationButton'));
  });
  await act(async () => {
    fireEvent.press(screen.getByTestId('saveRecipeButton'));
  });

  await act(async () => {
    expect(screen.getByTestId('recipeCard')).toHaveTextContent(
      'Test Edited1 Unit'
    );
  });
});
