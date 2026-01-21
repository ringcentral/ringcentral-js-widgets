import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

interface SelectCompanyContactProps {
  contactName: string;
}

const SelectCompanyContact: StepFunction<SelectCompanyContactProps> = async ({
  contactName,
}) => {
  const container = screen.getByTestId('contactSearchDropdown');
  const contact = container.querySelector(
    `li[data-sign='contactSearchSelectMenuItem'] span[title='${contactName}']`,
  );
  fireEvent.click(contact);
};

export { SelectCompanyContact };
