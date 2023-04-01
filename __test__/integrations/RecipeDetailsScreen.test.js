import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import Routes from '../../routes';
import { Provider } from '../../src/contexts/Recipes/RecipesContext';

test('open recipe details screen, increase and decrease quantities', async () => {
  const component = (
    <Provider>
      <Routes />
    </Provider>
  );
  // render home screen
  const screen = render(component);

  // find new recipe card and press it
  fireEvent.press(screen.getByTestId('selectRecipeButton'));
  await act(async () => {
    expect(screen.getByTestId('ingredientListItem0')).toHaveTextContent(
      '1 un - Ingredient 0'
    );
  });
  fireEvent.press(screen.getByTestId('increaseRecipeQuantity'));
  await act(async () => {
    expect(screen.getByTestId('ingredientListItem0')).toHaveTextContent(
      '11/2 un - Ingredient 0'
    );
  });
  fireEvent.press(screen.getByTestId('decreaseRecipeQuantity'));
  await act(async () => {
    expect(screen.getByTestId('ingredientListItem0')).toHaveTextContent(
      '1 un - Ingredient 0'
    );
  });
});
