import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react';

export const ClickDialNumberButtonOnKeypad = async (char: string) => {
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
    const btn = screen.getByTestId(`dialPadBtn${char}`)!;
    fireEvent.mouseDown(btn);
    fireEvent.mouseUp(btn);
  }
};
