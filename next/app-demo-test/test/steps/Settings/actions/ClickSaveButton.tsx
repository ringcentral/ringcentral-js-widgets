import {
  StepFunction,
  screen,
  userEvent,
} from '@ringcentral-integration/test-utils';

export const ClickSaveButton: StepFunction = async () => {
  const saveButtonText = await screen.findByText('Save');
  const saveButton =
    saveButtonText.closest('button,[role="button"]') ?? saveButtonText;
  await userEvent.click(saveButton);
};
