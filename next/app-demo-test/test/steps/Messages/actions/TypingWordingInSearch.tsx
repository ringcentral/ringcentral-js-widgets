import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

interface TypingWordingInSearchProps {
  chars?: string;
  wait?: boolean;
  dataSign: string;
}

export const TypingWordingInSearch: StepFunction<
  TypingWordingInSearchProps
> = async ({ chars = '', wait = true, dataSign }) => {
  const input = screen.getByTestId(dataSign);
  fireEvent.focus(input);

  if (wait) {
    jest.useFakeTimers();
  }

  fireEvent.change(input, { target: { value: chars } });

  if (wait) {
    jest.advanceTimersByTime(1000);
    jest.useRealTimers();
  }
};
