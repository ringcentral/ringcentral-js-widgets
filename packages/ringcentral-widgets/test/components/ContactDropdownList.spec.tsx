import { phoneSources } from '@ringcentral-integration/commons/enums/phoneSources';
import { phoneTypes } from '@ringcentral-integration/commons/enums/phoneTypes';
import { render } from '@testing-library/react';
import React from 'react';

import { ContactDropdownList } from '../../components/ContactDropdownList';

const expectedName = 'Bob';
const expectedNumber = '123456';
const mockedProps = {
  currentLocale: '',
  items: [
    {
      name: expectedName,
      entityType: phoneSources.rcContact,
      phoneType: phoneTypes.extension,
      phoneNumber: expectedNumber,
    },
  ],
  formatContactPhone: (number) => number,
  addToRecipients() {},
  setSelectedIndex() {},
  selectedIndex: 0,
};
describe('Given at least one contact item', () => {
  test('When visibility is false, should not render dropdown', () => {
    const { queryByRole } = render(
      <ContactDropdownList {...mockedProps} visibility={false} />,
    );
    expect(queryByRole('list')).toBeNull();
  });
  // TODO: fix or remove this test, it's not working with JUNO component
  test.skip('When visibility is true, should render dropdown', () => {
    const { queryByRole, queryByText } = render(
      <ContactDropdownList {...mockedProps} visibility />,
    );
    const list = queryByRole('list');
    expect(list).not.toBeNull();
    const name = queryByText(expectedName);
    expect(name).not.toBeNull();
    expect(list).toContainElement(name);
    const phone = queryByText(expectedNumber);
    expect(phone).not.toBeNull();
    expect(list).toContainElement(phone);
    const extension = queryByText('Extension Number');
    expect(extension).not.toBeNull();
    expect(list).toContainElement(extension);
  });
});
