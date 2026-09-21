import { fireEvent, userEvent } from '@ringcentral-integration/test-utils';

const fallbackOnPointerEventsError = (error: unknown, fallback: () => void) => {
  if (
    !(error instanceof Error) ||
    !error.message.includes('pointer-events set to "none"')
  ) {
    throw error;
  }
  fallback();
};

/**
 * hover host element using fakeTimer, pass animation
 */
export const hoverTooltipHost = (element: HTMLElement) => {
  jest.useFakeTimers();
  try {
    userEvent.hover(element);
  } catch (error) {
    fallbackOnPointerEventsError(error, () => {
      fireEvent.mouseOver(element);
    });
  }
  fireEvent.mouseEnter(element);
  jest.advanceTimersByTime(200);
  jest.useRealTimers();
};

/**
 * click host element using fakeTimer, pass animation
 */
export const clickTooltipHost = (element: HTMLElement) => {
  jest.useFakeTimers();
  try {
    userEvent.click(element);
  } catch (error) {
    fallbackOnPointerEventsError(error, () => {
      fireEvent.click(element);
    });
  }
  jest.advanceTimersByTime(200);
  jest.useRealTimers();
};

/**
 * leave host element using fakeTimer, pass animation
 */
export const leaveTooltipHost = (element: HTMLElement) => {
  jest.useFakeTimers();
  fireEvent.focus(element);
  fireEvent.blur(element);
  fireEvent.mouseLeave(element);
  jest.advanceTimersByTime(200);
  jest.useRealTimers();
};
