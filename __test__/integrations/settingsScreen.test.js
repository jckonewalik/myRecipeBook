import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import Routes from '../../routes';
import colors from '../../src/constants/colors';

import { Provider } from '../../src/contexts/Recipes/RecipesContext';

test('open setting screen and change fraction option', async () => {
  const component = (
    <Provider>
      <Routes />
    </Provider>
  );
  // render home screen
  const { getByTestId } = render(component);
  // find settings button and press it
  const settingsButton = getByTestId('settingsButton');
  await act(async () => {
    fireEvent.press(settingsButton);
  });
  // find one portion option
  const fractionOptionOnePortion = getByTestId('fractionOptionOnePortion');

  // expect one portion option be unselected
  await act(async () => {
    expect(fractionOptionOnePortion.props.style.backgroundColor).toEqual(
      colors.white
    );
  });

  // click on one portion option
  await act(async () => {
    fireEvent.press(fractionOptionOnePortion);
  });

  // expect one portion option be selected
  await act(async () => {
    expect(fractionOptionOnePortion.props.style.backgroundColor).toEqual(
      colors.primaryColor
    );
  });
});
