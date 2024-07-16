import { ContactDetailsUI } from '../../../modules/ContactDetailsUI/ContactDetailsUI';

import { phone } from './testSetup';

// TODO: prefer IT
describe.skip('use contactId and contactType to get the specific contact', () => {
  const mockContactsModule = {
    findContact: jest.fn(),
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
      const { findContact: mockFind } = mockContactsModule;
      const expectedContact = { id: contactId, type: contactType };
      shouldMatch
        ? mockFind.mockReturnValueOnce(expectedContact)
        : mockFind.mockReturnValueOnce(null);

      const contactDetailsUI = new ContactDetailsUI({
        ...phone,
        contacts: mockContactsModule,
      });
      contactDetailsUI
        .getUIFunctions({ params: { contactId, contactType } })
        .onVisitPage();
      const { contact } = contactDetailsUI.getUIProps({
        params: { contactId, contactType },
      });
      expect(mockFind).toHaveBeenCalledWith({
        id: contactId,
        type: contactType,
      });
      shouldMatch
        ? expect(contact).toMatchObject(expectedContact)
        : expect(contact).toBeNull();
    },
  );
});
