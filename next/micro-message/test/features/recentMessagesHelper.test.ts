import { RecentMessage } from '../../src/app/services';
import {
  dedup,
  filterPhoneNumber,
  flattenToMessageRecords,
  markAsRemoteMessage,
  sortMessages,
} from '../../src/app/services/RecentMessages/recentMessagesHelper';

const message = {
  from: { phoneNumber: '1234567890', extensionNumber: '123' },
  to: [
    { phoneNumber: '9876543210', extensionNumber: '456' },
    { phoneNumber: '5555555555', extensionNumber: '789' },
  ],
};

describe('filterPhoneNumber', () => {
  test('should return true for valid phone number', () => {
    const phoneNumber = { phoneNumber: '1234567890' };
    const result = filterPhoneNumber(message as never)(phoneNumber as never);
    expect(result).toBe(true);
  });

  test('should return false for invalid phone number', () => {
    const phoneNumber = { phoneNumber: '9999999999' };
    const result = filterPhoneNumber(message as never)(phoneNumber as never);
    expect(result).toBe(false);
  });
});

const allMessages = [
  { records: [{ id: 1 }, { id: 2 }] },
  { records: [{ id: 3 }, { id: 4 }] },
];

describe('flattenToMessageRecords', () => {
  test('should flatten all messages into a single array', () => {
    const result = flattenToMessageRecords(allMessages);
    expect(result).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
  });

  test('should handle empty input', () => {
    const result = flattenToMessageRecords([]);
    expect(result).toEqual([]);
  });
});

describe('sortMessages', () => {
  it('should sort messages by time in descending order', () => {
    // Arrange
    const messages: Partial<RecentMessage>[] = [
      {
        creationTime: '2021-01-01T00:00:00Z',
        // other properties...
      },
      {
        creationTime: '2021-01-02T00:00:00Z',
        // other properties...
      },
      {
        creationTime: '2021-01-03T00:00:00Z',
        // other properties...
      },
      // additional messages...
    ];

    // Act
    const sortedMessages = sortMessages(messages as never);

    // Assert
    expect(sortedMessages).toEqual([
      // Expected result of sorting the messages in descending order
      {
        creationTime: '2021-01-03T00:00:00Z',
        // other properties...
      },
      {
        creationTime: '2021-01-02T00:00:00Z',
        // other properties...
      },
      {
        creationTime: '2021-01-01T00:00:00Z',
        // other properties...
      },
      // additional messages...
    ]);
  });
});

describe('markAsRemoteMessage', () => {
  test('should set "fromRemote" property to true for each message', () => {
    // Arrange
    const messages = [
      { id: 1, content: 'Hello' },
      { id: 2, content: 'World' },
    ];

    // Act
    const result = markAsRemoteMessage(messages);

    // Assert
    expect(result).toEqual([
      { id: 1, content: 'Hello', fromRemote: true },
      { id: 2, content: 'World', fromRemote: true },
    ]);
  });

  // Add more test cases if needed
});

describe('dedup', () => {
  test('should remove duplicate messages based on id', () => {
    const messages = [
      { id: '1', text: 'Hello' },
      { id: '2', text: 'World' },
      { id: '2', text: 'World2' },
      { id: '2', text: 'World3' },
      { id: '1', text: 'Duplicate' },
    ];

    const deduplicatedMessages = dedup(messages as never);

    expect(deduplicatedMessages).toEqual([
      { id: '1', text: 'Hello' },
      { id: '2', text: 'World' },
    ]);
  });

  test('should not remove any messages if there are no duplicates', () => {
    const messages = [
      { id: '1', text: 'Hello' },
      { id: '2', text: 'World' },
      { id: '3', text: 'Test' },
    ];

    const deduplicatedMessages = dedup(messages as never);

    expect(deduplicatedMessages).toEqual([
      { id: '1', text: 'Hello' },
      { id: '2', text: 'World' },
      { id: '3', text: 'Test' },
    ]);
  });
});
