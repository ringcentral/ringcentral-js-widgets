import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

interface SelectRecipientProps {
  resource?: string;
  selectItem: string;
}

const SelectRecipient: StepFunction<SelectRecipientProps> = async ({
  resource,
  selectItem,
}) => {
  if (resource) {
    const tab = screen.getByTestId(`${resource}ContactSearchResult`);
    fireEvent.click(tab);
  }

  await whenStateChange(() => {
    const container = screen.getByTestId('contactSearchDropdown');
    const contact = container.querySelector(`span[title='${selectItem}']`)!;
    expect(contact).toBeInTheDocument();
    fireEvent.click(contact);
  });
};

export { SelectRecipient };
