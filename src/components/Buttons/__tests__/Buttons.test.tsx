import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../../Button';

test('Button renders correctly', () => {
  const onPressMock = jest.fn();
  const { getByText } = render(
    <Button onPress={onPressMock}>Click Me</Button>
  );

  const button = getByText('Click Me');

  expect(button).toBeTruthy();

  // Simule um clique no botão
  fireEvent.press(button);

  expect(onPressMock).toHaveBeenCalled();
});
