import type { FormattedConversation } from '../../src/app/services/Conversations/Conversations.interface';
import { buildToNumbersFromConversation } from '../../src/app/services/Conversations/helper';

const createConversation = (
  overrides: Partial<FormattedConversation> = {},
): FormattedConversation =>
  ({
    correspondents: [
      { phoneNumber: '+11234567890', extensionNumber: undefined },
    ],
    correspondentMatchesList: [[]],
    ...overrides,
  }) as FormattedConversation;

describe('buildToNumbersFromConversation', () => {
  test('returns empty array when conversation is undefined', () => {
    expect(buildToNumbersFromConversation(undefined)).toEqual([]);
  });

  test('returns empty array for group conversation (multiple correspondents)', () => {
    const conversation = createConversation({
      correspondents: [
        { phoneNumber: '+11111111111', extensionNumber: undefined },
        { phoneNumber: '+12222222222', extensionNumber: undefined },
      ],
      correspondentMatchesList: [[], []],
    });
    expect(buildToNumbersFromConversation(conversation)).toEqual([]);
  });

  test('returns freeSolo toNumber when no dncEntityTypes provided', () => {
    const conversation = createConversation({
      correspondents: [
        { phoneNumber: '+11234567890', extensionNumber: undefined },
      ],
      correspondentMatchesList: [[{ id: 'contact-1', type: 'Contact' }]],
    });
    const result = buildToNumbersFromConversation(conversation);
    expect(result).toEqual([{ phoneNumber: '+11234567890', freeSolo: true }]);
  });

  test('returns non-freeSolo toNumber when match type is in dncEntityTypes', () => {
    const conversation = createConversation({
      correspondents: [
        { phoneNumber: '+11234567890', extensionNumber: undefined },
      ],
      correspondentMatchesList: [[{ id: 'contact-1', type: 'Contact' }]],
    });
    const result = buildToNumbersFromConversation(conversation, [
      'Contact',
      'Lead',
      'Person Account',
    ]);
    expect(result).toEqual([
      { id: 'contact-1', phoneNumber: '+11234567890', freeSolo: false },
    ]);
  });

  test('returns freeSolo when match type is not in dncEntityTypes', () => {
    const conversation = createConversation({
      correspondents: [
        { phoneNumber: '+11234567890', extensionNumber: undefined },
      ],
      correspondentMatchesList: [[{ id: 'custom-1', type: 'CustomObject' }]],
    });
    const result = buildToNumbersFromConversation(conversation, [
      'Contact',
      'Lead',
    ]);
    expect(result).toEqual([{ phoneNumber: '+11234567890', freeSolo: true }]);
  });

  test('skips correspondent with no phone number', () => {
    const conversation = createConversation({
      correspondents: [{ phoneNumber: '', extensionNumber: '' }],
      correspondentMatchesList: [[]],
    });
    expect(buildToNumbersFromConversation(conversation)).toEqual([]);
  });

  test('uses extensionNumber when phoneNumber is empty', () => {
    const conversation = createConversation({
      correspondents: [{ phoneNumber: '', extensionNumber: '101' }],
      correspondentMatchesList: [[]],
    });
    const result = buildToNumbersFromConversation(conversation);
    expect(result).toEqual([{ phoneNumber: '101', freeSolo: true }]);
  });
});
