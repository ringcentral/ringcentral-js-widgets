import {
  fireEvent,
  screen,
  StepFunction,
  WaitForRenderReady,
} from '@ringcentral-integration/test-utils';

interface TypingWordingInSearchProps {
  chars?: string;
  wait?: boolean;
  dataSign: string;
}

export const TypingWordingInSearch: StepFunction<
  TypingWordingInSearchProps
> = async ({ chars = '', wait = true, dataSign }, { app }) => {
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

  //  two wait fro render for async event
  return (
    <>
      <WaitForRenderReady />
      <WaitForRenderReady />
    </>
  );
};
