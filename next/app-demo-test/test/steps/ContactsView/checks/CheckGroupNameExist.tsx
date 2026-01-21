import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckGroupNameExist: StepFunction<{ name: string }> = async ({
  name,
}) => {
  const groupCaption = await screen.findByRole('columnheader');
  expect(groupCaption).toHaveTextContent(name);
};
