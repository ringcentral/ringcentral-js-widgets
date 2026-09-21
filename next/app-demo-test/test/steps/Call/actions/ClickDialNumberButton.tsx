import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react';

export const ClickDialNumberButton = async (
  char: string,
  useNewDialBtn?: boolean,
) => {
  if (char === '+') {
    const btn = document.querySelectorAll(`[data-sign=dialPadBtn0] path`)[1];
    jest.useFakeTimers();
    fireEvent.mouseDown(btn);
    await act(async () => {
      jest.advanceTimersByTime(1100);
    });
    fireEvent.mouseUp(btn);
    jest.useRealTimers();
  } else {
    const btn = document.querySelector(
      useNewDialBtn
        ? `[data-sign='dialPadBtn${char}']`
        : `[data-sign='dialPadBtn${char}'] circle`,
    )!;
    fireEvent.mouseDown(btn);
    fireEvent.mouseUp(btn);
  }
};
