import { ContactSearch } from '@ringcentral-integration/micro-contacts/src/app/services';
import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import {
  fireEvent,
  screen,
  userEvent,
  waitForRenderReady,
  within,
  type StepFunction,
} from '@ringcentral-integration/test-utils';

interface SelectContactFromTabsProps {
  type: string;
  name?: string;
  index?: number;
}

const SelectContactFromTabs: StepFunction<SelectContactFromTabsProps> = async (
  { type, name, index },
  { app },
) => {
  jest.useRealTimers();
  const navigateToTab = await screen.findByTestId(
    `${type}ContactSearchResult`,
    {},
    { timeout: 5000 },
  );
  await userEvent.click(navigateToTab);
  await waitForRenderReady();
  if (name) {
    const contactSearch = app.container.got(ContactSearch);
    await contactSearch?.search({ searchString: name });
    await waitForRenderReady();
  }

  let contacts = screen.queryAllByTestId('contactSearchSelectMenuItem');
  try {
    await whenStateOrTimerChange(
      () => {
        contacts = screen.queryAllByTestId('contactSearchSelectMenuItem');
        expect(contacts.length).toBeGreaterThan(0);
      },
      { timeout: 15000 },
    );
  } catch (error) {
    const input = screen.queryByTestId('recipientsInput');
    if (name) {
      if (input) {
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        await waitForRenderReady();
      }
      return;
    }
    throw error;
  }

  if (index !== undefined) {
    expect(contacts[index]).toBeInTheDocument();
    await userEvent.click(contacts[index]);
    return;
  }

  if (name) {
    expect(contacts.length).toBeGreaterThan(0);
    const index = contacts.findIndex((contact) => {
      const contactNameScope =
        within(contact).queryByTestId('contactSearchItem');
      return contactNameScope?.textContent?.trim() === name;
    });
    expect(index).toBeGreaterThanOrEqual(0);
    await userEvent.click(contacts[index]);
    return;
  }

  const selectContact = await screen.findByTestId(
    'contactSearchSelectMenuItem',
  );
  await userEvent.click(selectContact);
};

export { SelectContactFromTabs };
