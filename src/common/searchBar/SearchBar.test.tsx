import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';
import React from 'react';

test('renders the search bar with a label and input', () => {
  render(<SearchBar searchUser="" setSearchUser={() => {}} />);

  const labelElement = screen.getByText(/search name/i);
  expect(labelElement).toBeInTheDocument();

  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toBeInTheDocument();
});

test('updates input value as user types', () => {
  const setSearchUserMock = jest.fn();
  render(<SearchBar searchUser="" setSearchUser={setSearchUserMock} />);

  const inputElement = screen.getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: 'John' } });

  expect(setSearchUserMock).toHaveBeenCalledWith('John');
});

test('calls setSearchUser when user types in input', () => {
  const setSearchUserMock = jest.fn();
  render(<SearchBar searchUser="" setSearchUser={setSearchUserMock} />);

  const inputElement = screen.getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: 'Alice' } });

  expect(setSearchUserMock).toHaveBeenCalledTimes(1);
  expect(setSearchUserMock).toHaveBeenCalledWith('Alice');
});

test('renders with the correct initial input value', () => {
  render(<SearchBar searchUser="Jane" setSearchUser={() => {}} />);

  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toHaveValue('Jane');
});
