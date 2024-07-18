import { expect } from 'chai';

import {
  filterNumbers,
  getMyNumberFromMessage,
  getRecipientNumbersFromMessage,
  getRecipients,
  messageIsAcceptable,
  messageIsDeleted,
  messageIsFax,
  messageIsTextMessage,
  messageIsVoicemail,
  normalizeInstantEvent,
  sortByDate,
} from '.';

describe('filterNumbers', () => {
  it('should return filtered numbers with phoneNumber', () => {
    const numbers = [
      { phoneNumber: '+1234567890' },
      { phoneNumber: '+1234567891' },
    ];
    const filterNumber = {
      phoneNumber: '+1234567890',
    };
    const result = filterNumbers(numbers, filterNumber);
    expect(result).to.deep.equal([{ phoneNumber: '+1234567891' }]);
  });

  it('should return filtered numbers with extensionNumber', () => {
    const numbers = [{ extensionNumber: '12345' }, { extensionNumber: '1234' }];
    const filterNumber = {
      extensionNumber: '1234',
    };
    const result = filterNumbers(numbers, filterNumber);
    expect(result).to.deep.equal([{ extensionNumber: '12345' }]);
  });
});

describe('messageIsDeleted', () => {
  it('should return true when message is deleted', () => {
    const message = { availability: 'Deleted' };
    const result = messageIsDeleted(message);
    expect(result).to.equal(true);
  });

  it('should return false when message is Alive', () => {
    const message = { availability: 'Alive' };
    const result = messageIsDeleted(message);
    expect(result).to.equal(false);
  });

  it('should return true when message is Purged', () => {
    const message = { availability: 'Purged' };
    const result = messageIsDeleted(message);
    expect(result).to.equal(true);
  });
});

describe('messageIsTextMessage', () => {
  it('should return true when message type is SMS', () => {
    const message = { type: 'SMS' };
    const result = messageIsTextMessage(message);
    expect(result).to.equal(true);
  });

  it('should return true when message type is Pager', () => {
    const message = { type: 'Pager' };
    const result = messageIsTextMessage(message);
    expect(result).to.equal(true);
  });

  it('should return false when message type is Fax', () => {
    const message = { type: 'Fax' };
    const result = messageIsTextMessage(message);
    expect(result).to.equal(false);
  });

  it('should return false when message type is VoiceMail', () => {
    const message = { type: 'VoiceMail' };
    const result = messageIsTextMessage(message);
    expect(result).to.equal(false);
  });
});

describe('messageIsFax', () => {
  it('should return true when message type is Fax', () => {
    const message = { type: 'Fax', availability: 'Alive' };
    const result = messageIsFax(message);
    expect(result).to.equal(true);
  });

  it('should return false when message type is SMS', () => {
    const message = { type: 'SMS', availability: 'Alive' };
    const result = messageIsFax(message);
    expect(result).to.equal(false);
  });
});

describe('messageIsVoicemail', () => {
  it('should return true when message type is VoiceMail', () => {
    const message = { type: 'VoiceMail', availability: 'Alive' };
    const result = messageIsVoicemail(message);
    expect(result).to.equal(true);
  });

  it('should return false when message type is SMS', () => {
    const message = { type: 'SMS', availability: 'Alive' };
    const result = messageIsVoicemail(message);
    expect(result).to.equal(false);
  });
});

describe('messageIsAcceptable', () => {
  it('should return true when message type is SMS and Alive', () => {
    const message = { type: 'SMS', availability: 'Alive' };
    const result = messageIsAcceptable(message);
    expect(result).to.equal(true);
  });

  it('should return true when message type is Pager and Alive', () => {
    const message = { type: 'Pager', availability: 'Alive' };
    const result = messageIsAcceptable(message);
    expect(result).to.equal(true);
  });

  it('should return true when message type is Fax and Alive', () => {
    const message = { type: 'Fax', availability: 'Alive' };
    const result = messageIsAcceptable(message);
    expect(result).to.equal(true);
  });

  it('should return true when message type is VoiceMail and Alive', () => {
    const message = { type: 'VoiceMail', availability: 'Alive' };
    const result = messageIsAcceptable(message);
    expect(result).to.equal(true);
  });

  it('should return true when message type is SMS and Deleted', () => {
    const message = { type: 'SMS', availability: 'Deleted' };
    const result = messageIsAcceptable(message);
    expect(result).to.equal(false);
  });

  it('should return true when message type is Pager and Deleted', () => {
    const message = { type: 'Pager', availability: 'Deleted' };
    const result = messageIsAcceptable(message);
    expect(result).to.equal(false);
  });

  it('should return false when message type is Fax and Deleted', () => {
    const message = { type: 'Fax', availability: 'Deleted' };
    const result = messageIsAcceptable(message);
    expect(result).to.equal(false);
  });

  it('should return true when message type is Fax and Inbound', () => {
    const message = {
      type: 'Fax',
      availability: 'Alive',
      direction: 'Inbound',
    };
    const result = messageIsAcceptable(message);
    expect(result).to.equal(true);
  });

  it('should return false when message type is Fax and Queued', () => {
    const message = {
      type: 'Fax',
      direction: 'Outbound',
      messageStatus: 'Queued',
    };
    const result = messageIsAcceptable(message);
    expect(result).to.equal(false);
  });
  it('should return false when message type is Fax and sending failed', () => {
    const message = {
      type: 'Fax',
      direction: 'Outbound',
      messageStatus: 'SendingFailed',
    };
    const result = messageIsAcceptable(message);
    expect(result).to.equal(false);
  });
  it('should return false when message type is VoiceMail and Deleted', () => {
    const message = { type: 'VoiceMail', availability: 'Deleted' };
    const result = messageIsAcceptable(message);
    expect(result).to.equal(false);
  });
});

describe('getMyNumberFromMessage', () => {
  it('should return my number correctly when message type is outbound SMS', () => {
    const message = {
      type: 'SMS',
      direction: 'Outbound',
      to: [
        {
          phoneNumber: '+1234567890',
        },
      ],
      from: { phoneNumber: '+1234567891' },
    };
    const result = getMyNumberFromMessage({
      message,
      myExtensionNumber: '1234',
    });
    expect(result).to.deep.equal({ phoneNumber: '+1234567891' });
  });

  it('should return my number correctly when message type is inbound SMS', () => {
    const message = {
      type: 'SMS',
      direction: 'Inbound',
      to: [
        {
          phoneNumber: '+1234567890',
        },
      ],
      from: { phoneNumber: '+1234567891' },
    };
    const result = getMyNumberFromMessage({
      message,
      myExtensionNumber: '1234',
    });
    expect(result).to.deep.equal({ phoneNumber: '+1234567890' });
  });

  it('should return my number correctly when message type is outbound Pager', () => {
    const message = {
      type: 'Pager',
      direction: 'Outbound',
      to: [
        {
          extensionNumber: '12345',
        },
      ],
      from: { extensionNumber: '1234' },
    };
    const result = getMyNumberFromMessage({
      message,
      myExtensionNumber: '1234',
    });
    expect(result).to.deep.equal({ extensionNumber: '1234' });
  });

  it('should return my number correctly when message type is inbound Pager', () => {
    const message = {
      type: 'Pager',
      direction: 'Inbound',
      to: [
        {
          extensionNumber: '1234',
        },
      ],
      from: { extensionNumber: '12345' },
    };
    const result = getMyNumberFromMessage({
      message,
      myExtensionNumber: '1234',
    });
    expect(result).to.deep.equal({ extensionNumber: '1234' });
  });
});

describe('getRecipientNumbersFromMessage', () => {
  it('should return recipient numbers correctly when message type is outbound SMS', () => {
    const message = {
      type: 'SMS',
      direction: 'Outbound',
      to: [
        {
          phoneNumber: '+1234567890',
        },
      ],
      from: { phoneNumber: '+1234567891' },
    };
    const myNumber = { phoneNumber: '+1234567891' };
    const result = getRecipientNumbersFromMessage({
      message,
      myNumber,
    });
    expect(result).to.deep.equal([{ phoneNumber: '+1234567890' }]);
  });

  it('should return recipient numbers correctly when message type is inbound SMS', () => {
    const message = {
      type: 'SMS',
      direction: 'Inbound',
      to: [
        {
          phoneNumber: '+1234567890',
        },
      ],
      from: { phoneNumber: '+1234567891' },
    };
    const myNumber = { phoneNumber: '+1234567890' };
    const result = getRecipientNumbersFromMessage({
      message,
      myNumber,
    });
    expect(result).to.deep.equal([{ phoneNumber: '+1234567891' }]);
  });

  it('should return recipient numbers correctly when message type is outbound Pager', () => {
    const message = {
      type: 'Pager',
      direction: 'Outbound',
      to: [
        {
          extensionNumber: '12345',
        },
      ],
      from: { extensionNumber: '1234' },
    };
    const myNumber = { extensionNumber: '1234' };
    const result = getRecipientNumbersFromMessage({
      message,
      myNumber,
    });
    expect(result).to.deep.equal([{ extensionNumber: '12345' }]);
  });

  it('should return recipient numbers correctly when message type is inbound Pager', () => {
    const message = {
      type: 'Pager',
      direction: 'Inbound',
      to: [
        {
          extensionNumber: '1234',
        },
      ],
      from: { extensionNumber: '12345' },
    };
    const myNumber = { extensionNumber: '1234' };
    const result = getRecipientNumbersFromMessage({
      message,
      myNumber,
    });
    expect(result).to.deep.equal([{ extensionNumber: '12345' }]);
  });

  it('should return recipient numbers correctly when message send to user self', () => {
    const message = {
      type: 'Pager',
      direction: 'Inbound',
      to: [
        {
          extensionNumber: '1234',
        },
      ],
      from: { extensionNumber: '1234' },
    };
    const myNumber = { extensionNumber: '1234' };
    const result = getRecipientNumbersFromMessage({
      message,
      myNumber,
    });
    expect(result).to.deep.equal([{ extensionNumber: '1234' }]);
  });
});

describe('getRecipients', () => {
  it('should return recipient numbers correctly when message type is outbound SMS', () => {
    const message = {
      type: 'SMS',
      direction: 'Outbound',
      to: [
        {
          phoneNumber: '+1234567890',
        },
      ],
      from: { phoneNumber: '+1234567891' },
    };
    const result = getRecipients({
      message,
      myExtensionNumber: '1234',
    });
    expect(result).to.deep.equal([{ phoneNumber: '+1234567890' }]);
  });

  it('should return recipient numbers correctly when message type is outbound Pager', () => {
    const message = {
      type: 'Pager',
      direction: 'Outbound',
      to: [
        {
          extensionNumber: '12345',
        },
      ],
      from: { extensionNumber: '1234' },
    };
    const result = getRecipients({
      message,
      myExtensionNumber: '1234',
    });
    expect(result).to.deep.equal([{ extensionNumber: '12345' }]);
  });
});

describe('sortByDate', () => {
  it('should be a function', () => {
    expect(sortByDate).to.be.a('function');
  });
  it('should sort object by creationTime in descending order', () => {
    const now = Date.now();
    const items = Array.from(new Array(5)).map((_, idx) => ({
      creationTime: now + idx,
    }));
    items.sort(sortByDate);
    items.forEach((item, idx) => {
      if (items[idx + 1]) {
        expect(item.creationTime > items[idx + 1].creationTime).to.equal(true);
      }
    });
  });
});

describe('normalizeInstantEvent', () => {
  it('should be a function', () => {
    expect(normalizeInstantEvent).to.be.a('function');
  });
  it('should convert the "id" and "conversationId" property to number', () => {
    const mockObj = {
      body: {
        id: '123',
        conversationId: '456',
      },
    };
    const normalizedObj = normalizeInstantEvent(mockObj);
    expect(normalizedObj.id).to.be.a('number');
    expect(normalizedObj.id).to.equal(123);
    expect(normalizedObj.conversationId).to.be.a('number');
    expect(normalizedObj.conversationId).to.equal(456);
  });
});
