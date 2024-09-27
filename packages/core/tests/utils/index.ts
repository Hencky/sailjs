import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

export function clickByTestId(testId: string) {
  return userEvent.click(screen.getByTestId(testId));
}

export const getByTestId = (testId: string) => {
  return screen.getByTestId(testId);
};

export const getInputValue = (testId: string) => {
  return getByTestId(testId).getAttribute('value');
};
