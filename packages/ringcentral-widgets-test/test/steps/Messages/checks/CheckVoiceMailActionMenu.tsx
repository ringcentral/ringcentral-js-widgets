import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckVoiceMailActionMenu: StepFunction = async () => {
  const playButton = screen.queryByTestId('play');
  expect(playButton).toBeInTheDocument();

  const downloadButton = screen.queryByTestId('download');
  expect(downloadButton).toBeInTheDocument();

  const smsButton = screen.queryByTestId('clickToSms');
  expect(smsButton).toBeInTheDocument();

  const markButton = screen.queryByTestId('mark');
  expect(markButton).toBeInTheDocument();

  const deleteButton = screen.queryByTestId('Delete');
  expect(deleteButton).toBeInTheDocument();
};

interface ICheckVoiceMailActionDisable {
  itemName: string;
}

export const CheckVoiceMailActionDisable: StepFunction<ICheckVoiceMailActionDisable> =
  async ({ itemName }) => {
    const item = screen.queryByTestId(itemName);
    const disable = item!.getAttribute('aria-disabled');
    expect(disable).toBeTruthy();
  };
