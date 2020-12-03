import { IContact } from 'ringcentral-integration/interfaces/Contact.model';
import { phoneTypes } from 'ringcentral-integration/enums/phoneTypes';
import { getSearchForPhoneNumbers } from 'ringcentral-integration/lib/contactHelper';

const currentSite = { name: 'US', code: '22' };
const otherSite = { name: 'Canada', code: '37' };

const currentUser: IContact = {
  firstName: 'Lincoln',
  id: '3929064003',
  lastName: 'Collins',
  phoneNumbers: [
    {
      phoneNumber: '22701',
      phoneType: phoneTypes.extension,
    },
  ],
  // site: { name: 'US', code: '22' },
  type: 'User',
};

const sameSiteContact: IContact = {
  firstName: 'Stephen',
  id: '3929064004',
  lastName: 'Wood',
  phoneNumbers: [
    {
      phoneNumber: '22702',
      phoneType: phoneTypes.extension,
    },
  ],
  // site: { name: 'US', code: '22' },
  type: 'User',
};

const otherSiteContact: IContact = {
  firstName: 'Hector',
  id: '3929064005',
  lastName: 'French',
  phoneNumbers: [
    {
      phoneNumber: '37712',
      phoneType: phoneTypes.extension,
    },
  ],
  // site: { name: 'Canada', code: '37' },
  type: 'User',
};

const contacts: IContact[] = [currentUser, sameSiteContact, otherSiteContact];

const extensionInfo = {
  site: { code: currentSite.code },
  isMultipleSiteEnabled: true,
};

describe.each`
  searchString | expected
  ${'702'}     | ${'702'}
  ${'22702'}   | ${'702'}
  ${'712'}     | ${'37712'}
  ${'37712'}   | ${'37712'}
  ${'799'}     | ${'none'}
`('Multi site code - Contact Search', ({ searchString, expected }) => {
  test(`When type ${searchString}, dropdown will include ${expected}`, () => {
    const { isMultipleSiteEnabled, site } = extensionInfo;
    const actual = getSearchForPhoneNumbers({
      contacts,
      entityType: 'test',
      searchString,
      options: {
        isMultipleSiteEnabled,
        siteCode: site?.code,
      },
    });
    if (expected === 'none') {
      expect(actual).toHaveLength(0);
      return;
    }
    expect(actual[0].phoneNumber).toEqual(expected);
  });
});
