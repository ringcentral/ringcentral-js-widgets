import { fireEvent, screen } from '@testing-library/react';
import { RouterInteraction } from '@ringcentral-integration/widgets/modules/RouterInteraction';

import { StepFunction } from '../../../lib/step';

export const NavigateToHistory: StepFunction<
  { testId?: string },
  {
    phone: {
      routerInteraction: RouterInteraction;
    };
  }
> = ({ testId = 'History' }, context) => {
  /**
   *
   * Note:
   * we use getBoundingClientRect to calculate call history panel's width and height, but
   * JSDOM's getBoundingClientRect alway return empty value, so we need mock it
   * https://github.com/jsdom/jsdom/issues/1590
   *
   */
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

  const element = screen.getByTestId(testId);

  /**
   *
   * Note:
   * useFakeTimers, rinOnlyPendingTimers, useRealTimers are used to fast-forward timeout at CallItem
   * setTimeout prevent call history item not render in-time
   * `@ringcentral-integration/widgets/components/CallItem/index.js`
   * https://jestjs.io/docs/timer-mocks
   *
   * */
  expect(element).toBeInTheDocument();
  if (element) {
    jest.useFakeTimers();
    fireEvent.click(element);
    expect(context.phone.routerInteraction.currentPath).toBe(`/history`);
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  }
};
