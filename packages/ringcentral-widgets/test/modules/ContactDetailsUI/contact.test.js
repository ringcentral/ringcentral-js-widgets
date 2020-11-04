import { ContactDetailsUI } from '../../../modules/ContactDetailsUI/ContactDetailsUI';
import { phone } from './testUtils';

describe('use contactId and contactType to get the specific contact', () => {
  const mockContactsModule = {
    find: jest.fn(),
  };

  test.each`
    contactId  | contactType   | shouldMatch | result
    ${'234'}   | ${'company'}  | ${true}     | ${'should match'}
    ${'35434'} | ${'personal'} | ${true}     | ${'should match'}
    ${'35334'} | ${'personal'} | ${false}    | ${'should not match'}
    ${'45'}    | ${'df'}       | ${false}    | ${'should not match'}
  `(
    'Given contactId: $contactId, contactType: $contactType, then $result',
    ({ contactId, contactType, shouldMatch }) => {
      const { find: mockFind } = mockContactsModule;
      const expectedContact = { id: contactId, type: contactType };
      shouldMatch
        ? mockFind.mockReturnValueOnce(expectedContact)
        : mockFind.mockReturnValueOnce(null);

      const { contact } = new ContactDetailsUI({
        ...phone,
        contacts: mockContactsModule,
      }).getUIProps({ params: { contactId, contactType } });
      expect(mockFind).toBeCalledWith({ id: contactId, type: contactType });
      shouldMatch
        ? expect(contact).toMatchObject(expectedContact)
        : expect(contact).toBeNull();
    },
  );
});
