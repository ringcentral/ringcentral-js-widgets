import { screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const CheckGroupNameExist: StepFunction<{ name: string }> = async ({
  name,
}) => {
  const groupCaption = await screen.findByRole('columnheader');
  expect(groupCaption).toHaveTextContent(name);
};
