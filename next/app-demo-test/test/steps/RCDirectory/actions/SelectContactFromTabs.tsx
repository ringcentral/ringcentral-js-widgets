import {
  userEvent,
  type StepFunction,
} from '@ringcentral-integration/test-utils';
import { fireEvent, screen, within } from '@testing-library/react';

interface SelectContactFromTabsProps {
  type: string;
  name?: string;
  index?: number;
}

const SelectContactFromTabs: StepFunction<SelectContactFromTabsProps> = async ({
  type,
  name,
  index,
}) => {
  const NavigateToTab = screen.getByTestId(`${type}ContactSearchResult`);
  fireEvent.click(NavigateToTab);

  const contacts = screen.queryAllByTestId('contactSearchSelectMenuItem');

  if (index !== undefined) {
    userEvent.click(contacts[index]);
    return;
  }

  if (name) {
    expect(contacts.length).toBeGreaterThan(0);
    const index = contacts.findIndex((contact) => {
      const contactNameScope =
        within(contact).queryByTestId('contactSearchItem');
      return contactNameScope?.textContent?.trim() === name;
    });
    userEvent.click(contacts[index]);
    return;
  }

  const selectContact = screen.getByTestId('contactSearchSelectMenuItem');
  fireEvent.click(selectContact);
};

export { SelectContactFromTabs };
