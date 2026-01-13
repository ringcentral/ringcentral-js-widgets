import { fireEvent, userEvent } from '@ringcentral-integration/test-utils';

/**
 * hover host element using fakeTimer, pass animation
 */
export const hoverTooltipHost = (element: HTMLElement) => {
  jest.useFakeTimers();
  userEvent.hover(element!);
  jest.advanceTimersByTime(100);
  jest.useRealTimers();
};

/**
 * click host element using fakeTimer, pass animation
 */
export const clickTooltipHost = (element: HTMLElement) => {
  jest.useFakeTimers();
  userEvent.click(element!);
  jest.advanceTimersByTime(100);
  jest.useRealTimers();
};

/**
 * leave host element using fakeTimer, pass animation
 */
export const leaveTooltipHost = (element: HTMLElement) => {
  jest.useFakeTimers();
  fireEvent.focus(element);
  fireEvent.blur(element);
  jest.advanceTimersByTime(200);
  jest.useRealTimers();
};
