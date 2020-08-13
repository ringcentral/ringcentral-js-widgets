import React from 'react';
import { render } from '@testing-library/react';
import { toContainElement } from '@testing-library/jest-dom/matchers';
import phoneTypes from 'ringcentral-integration/enums/phoneTypes';
import { Profile } from '../../components/ContactDetails/components/Profile';

expect.extend({ toContainElement });

const expectedSiteName = 'Belmont';
const contact = {
  name: '',
  phoneNumbers: [
    {
      phoneNumber: '',
      phoneType: phoneTypes.other,
    },
  ],
  type: '',
  status: '',
  site: {
    id: '',
    name: expectedSiteName,
    code: '',
  },
};
const mockedProps = {
  currentLocale: '',
  contact,
  isMultipleSiteEnabled: false,
};

describe('Give site name', () => {
  test('When disable multi-site, should not render the site field', () => {
    const { queryByRole } = render(
      <Profile {...mockedProps} isMultipleSiteEnabled={false} />,
    );
    const siteField = queryByRole('generic', {
      name: `Site: ${expectedSiteName}`,
    });
    expect(siteField).toBeNull();
  });
  describe('When enable multi-site', () => {
    test('If site name is empty, should not render site field', () => {
      const { queryByRole } = render(
        <Profile
          {...mockedProps}
          contact={{ ...contact, site: { ...contact.site, name: '' } }}
        />,
      );
      const siteField = queryByRole('generic', {
        name: `Site: ${expectedSiteName}`,
      });
      expect(siteField).toBeNull();
    });
    test('If site name is not empty, Should render the site field', () => {
      const { queryByText, queryByRole } = render(
        <Profile {...mockedProps} isMultipleSiteEnabled />,
      );
      const siteField = queryByRole('generic', {
        name: `Site: ${expectedSiteName}`,
      });
      const siteLabel = queryByText('Site');
      const siteValue = queryByText(expectedSiteName);
      expect(siteField).toContainElement(siteLabel);
      expect(siteField).toContainElement(siteValue);
    });
  });
});
