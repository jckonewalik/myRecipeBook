import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Alert } from 'react-native';
import Routes from '../../routes';
import { Provider } from '../../src/contexts/Recipes/RecipesContext';

test('delete an existing recipe', async () => {
  jest.spyOn(Alert, 'alert');
  const component = (
    <Provider>
      <Routes />
    </Provider>
  );
  // render home screen
  const screen = render(component);
  await waitFor(() => screen.getByTestId('recipeCard'));

  await act(async () => {
    expect(screen.getAllByTestId('recipeCard').length).toEqual(1);
  });
  fireEvent.press(screen.getByTestId('deleteRecipeButton'));
  await act(async () => {
    Alert.alert.mock.calls[0][2][1].onPress();
  });
  await act(async () => {
    expect(screen.getByTestId('welcomeMessage')).toHaveTextContent(
      '[missing "mock.welcome_message" translation]'
    );
  });
});
