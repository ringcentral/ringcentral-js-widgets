import {
  fireEvent,
  screen,
  StepFunction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';

interface NavigateToTypeTabUnderMessageProps {
  type: string;
}
export const NavigateToTypeTabUnderMessage: StepFunction<
  NavigateToTypeTabUnderMessageProps
> = async ({ type }) => {
  fireEvent.click(screen.getByTestId(type));
  await waitForRenderReady();
};
