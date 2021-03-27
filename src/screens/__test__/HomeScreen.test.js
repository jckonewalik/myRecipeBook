import React from 'react';
import HomeScreen from '../HomeScreen';
import { render, fireEvent } from '@testing-library/react-native';
import {
  Provider,
  Context,
} from '../../contexts/Recipes/__test__/mocks/MockRecipesContext';

test('when click on new recipe must navigate to NewRecipe screen', () => {
  const navigate = jest.fn();
  const { getByTestId } = render(
    <Provider>
      <HomeScreen context={Context} navigation={{ navigate: navigate }} />
    </Provider>
  );
  const createRecipeButton = getByTestId('createRecipeButton');
  fireEvent.press(createRecipeButton);
  expect(navigate).toBeCalledWith('NewRecipe');
});

test('when click on settings button must navigate to Settings screen', () => {
  const navigate = jest.fn();
  const { getByTestId } = render(
    <Provider>
      <HomeScreen context={Context} navigation={{ navigate: navigate }} />
    </Provider>
  );
  const settingsButton = getByTestId('settingsButton');
  fireEvent.press(settingsButton);
  expect(navigate).toBeCalledWith('Settings');
});

test('should render 3 recipe card components', async () => {
  const navigate = jest.fn();
  const { findAllByTestId } = render(
    <Provider>
      <HomeScreen context={Context} navigation={{ navigate: navigate }} />
    </Provider>
  );
  const recipeCardList = await findAllByTestId('selectRecipeButton');
  expect(recipeCardList.length).toBe(3);
});

test('should render 1 Search Bar components', async () => {
  const navigate = jest.fn();
  const { findAllByTestId } = render(
    <Provider>
      <HomeScreen context={Context} navigation={{ navigate: navigate }} />
    </Provider>
  );
  const recipeCardList = await findAllByTestId('searchBarComponent');
  expect(recipeCardList.length).toBe(1);
});

test('should render a welcome message if there is no recipes', async () => {});
