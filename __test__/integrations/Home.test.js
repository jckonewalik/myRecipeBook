import { act, render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import Routes from '../../routes';
import { Provider } from '../../src/contexts/Recipes/RecipesContext';
import { Alert } from 'react-native';

jest.useFakeTimers();

test('delete an existing recipe', async () => {
  jest.spyOn(Alert, 'alert');
  const component = (
    <Provider>
      <Routes />
    </Provider>
  );
  // render home screen
  const screen = render(component);
  await act(async () => {
    expect(screen.getAllByTestId('recipeCard').length).toEqual(1);
  });
  fireEvent.press(screen.getByTestId('deleteRecipeButton'));
  await act(async () => {
    Alert.alert.mock.calls[0][2][1].onPress();
  });
  await act(async () => {
    expect(screen.getByTestId('welcomeMessage')).toHaveTextContent(
      '[missing "en.welcome_message" translation]'
    );
  });
});
