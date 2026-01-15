import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const NavigateToContacts: StepFunction = async (_, context) => {
  window.HTMLElement.prototype.getBoundingClientRect = jest.fn(
    () =>
      ({
        x: 0,
        y: 46,
        width: 299,
        height: 671,
        top: 46,
        right: 299,
        bottom: 717,
        left: 0,
      } as DOMRect),
  );

  let element;
  if (screen.queryByTestId('contactsTab')) {
    element = screen.getByTestId('contactsTab');
  }

  expect(element).toBeInTheDocument();

  if (element) {
    jest.useFakeTimers();
    fireEvent.click(element);
    expect(context.phone.routerInteraction.currentPath).toBe(`/contacts`);
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  }
};
