import { RouterPlugin } from '@ringcentral-integration/next-core';
import {
  fireEvent,
  screen,
  StepFunction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';

export const NavigateToContacts: StepFunction = async (_, { app }) => {
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
    const router = app.container.got(RouterPlugin)!;
    expect(router.currentPath).toBe(`/contacts`);
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  }
  await waitForRenderReady();
};
