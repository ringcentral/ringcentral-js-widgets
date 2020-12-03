import { phoneTypes } from 'ringcentral-integration/enums/phoneTypes';
import { IContact } from 'ringcentral-integration/interfaces/Contact.model';
import { isSearchHitContact } from 'ringcentral-integration/lib/contactHelper';

const contact: IContact = {
  id: '0123',
  type: 'fake',
  name: 'Full',
  firstName: 'First',
  lastName: 'Last',
  email: '11@lab.nordi',
  emails: ['11@lab.nordi', '22@lab.nordi'],
  phoneNumbers: [
    { phoneType: phoneTypes.extension, phoneNumber: '102' },
    { phoneType: phoneTypes.company, phoneNumber: '+1650888528' },
  ],
};

describe.each`
  searchString      | searchFor      | expected
  ${'FULL'}         | ${'names'}     | ${true}
  ${'FIR'}          | ${'names'}     | ${true}
  ${'AST'}          | ${'names'}     | ${true}
  ${'NOT'}          | ${'names'}     | ${false}
  ${'02'}           | ${'extension'} | ${true}
  ${'103'}          | ${'extension'} | ${false}
  ${'888528'}       | ${'phones'}    | ${true}
  ${'888529'}       | ${'phones'}    | ${false}
  ${'11@lab.NORDI'} | ${'emails'}    | ${true}
  ${'22@lab.nordi'} | ${'emails'}    | ${true}
  ${'33@lab'}       | ${'emails'}    | ${false}
`(
  'Search Hit Contact - core logic',
  ({
    searchString,
    searchFor,
    expected,
  }: {
    searchString: string;
    searchFor: string;
    expected: boolean;
  }) => {
    test(`When test with "${searchString}" for searching ${searchFor}, expected hit "${expected}"`, () => {
      const lowerSearch = searchString.toLowerCase();
      const actual = isSearchHitContact({
        lowerSearch,
        contact,
      });
      expect(actual).toEqual(expected);
    });
  },
);
