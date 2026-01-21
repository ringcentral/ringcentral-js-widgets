import { within, type StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckMoreButtonsProps {
  MoreButtons: string[];
}
const CheckMoreButtons: StepFunction<CheckMoreButtonsProps> = async ({
  MoreButtons,
}) => {
  const moreListElm = screen.getByTestId('moreList');
  expect(moreListElm).toBeInTheDocument();
  const items = within(moreListElm).getAllByRole('menuitem');
  const titles = items.map((item) => item.title);

  expect(titles).toEqual(MoreButtons);
};

export { CheckMoreButtons };
