import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

export const ClickDialNumberButton = async (char: string) => {
  if (char === '+') {
    const btn = document.querySelector(`[data-sign=dialPadBtn0] circle`);
    jest.useFakeTimers();
    fireEvent.mouseDown(btn);
    await act(async () => {
      jest.advanceTimersByTime(1100);
    });
    fireEvent.mouseUp(btn);
    jest.useRealTimers();
  } else {
    const btn = document.querySelector(
      `[data-sign='dialPadBtn${char}'] circle`,
    );
    fireEvent.mouseDown(btn);
    fireEvent.mouseUp(btn);
  }
};
