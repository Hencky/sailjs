import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

export function click(className: string) {
  return userEvent.click(screen.getByTestId(className));
}
