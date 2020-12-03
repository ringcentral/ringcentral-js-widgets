import { phoneTypes } from 'ringcentral-integration/enums/phoneTypes';
import { IContact } from 'ringcentral-integration/interfaces/Contact.model';
import { getFilterContacts } from 'ringcentral-integration/lib/contactHelper';

const contact1: IContact = {
  id: '1604553588005',
  firstName: 'Armand',
  lastName: 'Adams',
  name: 'Armand Adams',
  email: 'Armand.Adams@Group.com',
  emails: ['Armand.Adams@Group.com', 'Armand.Adams@billing.Inc.com'],
  phoneNumbers: [
    { phoneNumber: '379', phoneType: phoneTypes.extension },
    { phoneNumber: '+17099521015', phoneType: phoneTypes.business },
  ],
  type: 'google',
};

const contact2: IContact = {
  id: '1604553587838',
  firstName: 'Abner',
  lastName: 'Adams',
  name: 'Abner Adams',
  email: 'Abner.Adams@Inc.com',
  emails: ['Abner.Adams@Inc.com', 'Abner.Adams@billing.and Sons.com'],
  phoneNumbers: [
    { phoneNumber: '279', phoneType: phoneTypes.extension },
    { phoneNumber: '+12433175421', phoneType: phoneTypes.business },
  ],
  type: 'google',
};

const contacts = [contact1, contact2];

describe.each`
  searchFilter | expected
  ${null}      | ${2}
  ${''}        | ${2}
  ${'Armand'}  | ${1}
  ${'Adams'}   | ${2}
  ${'3317'}    | ${1}
  ${'2876'}    | ${0}
  ${'279'}     | ${1}
  ${'379'}     | ${1}
  ${'79'}      | ${2}
`(
  'ContactHelper - getFilterContacts',
  ({ searchFilter, expected }: { searchFilter: string; expected: number }) => {
    test(`When filter with "${searchFilter}", expect found ${expected} item(s)`, () => {
      const actual = getFilterContacts(contacts, searchFilter);
      expect(actual.length).toEqual(expected);
    });
  },
);
