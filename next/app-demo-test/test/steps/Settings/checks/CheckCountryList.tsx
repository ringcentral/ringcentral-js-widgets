import {
  screen,
  StepFunction,
  userEvent,
} from '@ringcentral-integration/test-utils';

interface CheckCountryListProps {
  countryList: Array<string>;
}

export const CheckCountryList: StepFunction<CheckCountryListProps> = async ({
  countryList,
}) => {
  userEvent.click(screen.getByTestId('selectRoot'));
  expect(
    screen.getAllByTestId('selectMenuItem').map((item) => item.textContent),
  ).toEqual(countryList);
};
