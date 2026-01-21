import {
  StepFunction,
  fireEvent,
  screen,
} from '@ringcentral-integration/test-utils';

export const ClickSaveButton: StepFunction = () => {
  fireEvent.click(screen.getByText('Save'));
};
