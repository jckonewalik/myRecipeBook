import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBar from '../SearchBar';

describe('SearchBar component', () => {
  test('Must fire onSearch function after 1 sec of changeText event', () => {
    const mockFn = jest.fn();
    const { getByTestId } = render(<SearchBar onSearch={mockFn} />);

    const searchText = getByTestId('searchText');
    jest.useFakeTimers();

    fireEvent.changeText(searchText, 'test');
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    jest.runAllTimers();
    expect(mockFn).toBeCalledWith('test');
  });
  test('Must fire onSearch only once even multiples changeText events', () => {
    const mockFn = jest.fn();
    const { getByTestId } = render(<SearchBar onSearch={mockFn} />);

    const searchText = getByTestId('searchText');
    jest.useFakeTimers();
    fireEvent.changeText(searchText, 'test');
    fireEvent.changeText(searchText, 'search');
    expect(setTimeout).toHaveBeenCalledTimes(2);
    jest.runAllTimers();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
