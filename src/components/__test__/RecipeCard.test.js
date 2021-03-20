import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RecipeCard from '../RecipeCard';

test('when click on card must call onSelect with recipe id', () => {
  const testRecipe = {
    id: 1,
    title: 'Test Recipe',
    portions: 10,
    portionUnit: 'unit',
  };
  const mockSelect = jest.fn();
  const mockEdit = jest.fn();
  const mockDelete = jest.fn();

  const { getByTestId } = render(
    <RecipeCard
      recipe={testRecipe}
      onSelect={mockSelect}
      onEdit={mockEdit}
      onDelete={mockDelete}
    />
  );
  const selectButton = getByTestId('selectRecipeButton');
  fireEvent.press(selectButton);
  expect(mockSelect).toBeCalledWith(1);
});

test('when click on edit must call onEdit with recipe id', () => {
  const testRecipe = {
    id: 1,
    title: 'Test Recipe',
    portions: 10,
    portionUnit: 'unit',
  };
  const mockSelect = jest.fn();
  const mockEdit = jest.fn();
  const mockDelete = jest.fn();

  const { getByTestId } = render(
    <RecipeCard
      recipe={testRecipe}
      onSelect={mockSelect}
      onEdit={mockEdit}
      onDelete={mockDelete}
    />
  );
  const editButton = getByTestId('editRecipeButton');
  fireEvent.press(editButton);
  expect(mockEdit).toBeCalledWith(1);
});

test('when click on delete must call onDelete with recipe id', () => {
  const testRecipe = {
    id: 1,
    title: 'Test Recipe',
    portions: 10,
    imageUrl: 'image.png',
    portionUnit: 'unit',
  };
  const mockSelect = jest.fn();
  const mockEdit = jest.fn();
  const mockDelete = jest.fn();

  const { getByTestId } = render(
    <RecipeCard
      recipe={testRecipe}
      onSelect={mockSelect}
      onEdit={mockEdit}
      onDelete={mockDelete}
    />
  );
  const deleteButton = getByTestId('deleteRecipeButton');
  fireEvent.press(deleteButton);
  expect(mockDelete).toBeCalledWith(1, 'image.png');
});
