import { screen } from '@testing-library/react';

export const CheckInputToRecipientsNoExist = async () => {
  expect(screen.queryByTestId('recipientItem')).not.toBeInTheDocument();
};
