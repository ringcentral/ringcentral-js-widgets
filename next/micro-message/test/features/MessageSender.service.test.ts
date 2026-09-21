import { MessageSender } from '../../src/app/services/MessageSender';
import type { Attachment } from '../../src/app/services/MessageSender/MessageSender.interface';

const createAttachment = (name: string): Attachment =>
  ({
    name,
    size: 100,
    file: { name } as File,
  }) as Attachment;

const createMessageSender = ({
  hasPermission = true,
  sharedSender = true,
}: {
  hasPermission?: boolean;
  sharedSender?: boolean;
} = {}) => {
  const sendNewThreadMessage = jest
    .fn()
    .mockResolvedValue({ id: 'thread-message' });
  const sendSMS = jest.fn().mockResolvedValue({ id: 'sms-message' });
  const sendMMS = jest.fn().mockResolvedValue({ id: 'mms-message' });
  const sendPager = jest.fn().mockResolvedValue({ id: 'pager-message' });
  const messageSender = Object.assign(Object.create(MessageSender.prototype), {
    logger: {
      error: jest.fn(),
    },
    uniqueManager: {
      dismissAll: jest.fn().mockResolvedValue(undefined),
      unique: jest.fn((fn: () => void) => fn()),
    },
    validateContent: jest.fn().mockReturnValue(true),
    _validateToNumbers: jest.fn().mockResolvedValue({
      result: true,
      extNumbers: [],
      noExtNumbers: ['+15550002222'],
    }),
    _validateSenderNumber: jest.fn().mockReturnValue(true),
    _eventEmitter: {
      emit: jest.fn(),
    },
    _extensionPhoneNumber: {
      smsSenderNumbers: [{ phoneNumber: '+15550001111' }],
    },
    _sendSMS: sendSMS,
    _sendMMS: sendMMS,
    _sendPager: sendPager,
    setSendStatus: jest.fn(),
    _smsAttempt: jest.fn(),
    _smsSentOver: jest.fn(),
    _smsSentError: jest.fn(),
    _onSendError: jest.fn(),
  }) as MessageSender;
  Object.defineProperty(messageSender, '_messageThread', {
    configurable: true,
    value: {
      hasPermission,
      isSharedSmsSenderNumber: jest.fn().mockReturnValue(sharedSender),
      sendNewThreadMessage,
    },
  });

  return {
    messageSender,
    mocks: {
      sendNewThreadMessage,
      sendSMS,
      sendMMS,
      sendPager,
    },
  };
};

describe('MessageSender', () => {
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
    jest.clearAllMocks();
  });

  it('routes permitted shared sender messages through message threads', async () => {
    const { messageSender, mocks } = createMessageSender();
    const attachment = createAttachment('photo.png');

    await expect(
      messageSender.send({
        fromNumber: '+15550001111',
        toNumbers: ['+15550002222'],
        text: 'hello',
        attachments: [attachment],
      }),
    ).resolves.toEqual([{ id: 'thread-message' }]);

    expect(mocks.sendNewThreadMessage).toHaveBeenCalledWith({
      fromNumber: '+15550001111',
      toNumbers: ['+15550002222'],
      text: 'hello',
      attachments: [attachment],
    });
    expect(mocks.sendMMS).not.toHaveBeenCalled();
    expect(mocks.sendSMS).not.toHaveBeenCalled();
  });

  it('falls back to SMS when message thread permission is disabled', async () => {
    const { messageSender, mocks } = createMessageSender({
      hasPermission: false,
    });

    await expect(
      messageSender.send({
        fromNumber: '+15550001111',
        toNumbers: ['+15550002222'],
        text: 'hello',
      }),
    ).resolves.toEqual([{ id: 'sms-message' }]);

    expect(mocks.sendNewThreadMessage).not.toHaveBeenCalled();
    expect(mocks.sendSMS).toHaveBeenCalledWith({
      fromNumber: '+15550001111',
      toNumbers: ['+15550002222'],
      text: 'hello',
      attachments: [],
    });
  });

  it('falls back to SMS when sender number is not shared', async () => {
    const { messageSender, mocks } = createMessageSender({
      sharedSender: false,
    });

    await expect(
      messageSender.send({
        fromNumber: '+15550001111',
        toNumbers: ['+15550002222'],
        text: 'hello',
      }),
    ).resolves.toEqual([{ id: 'sms-message' }]);

    expect(mocks.sendNewThreadMessage).not.toHaveBeenCalled();
    expect(mocks.sendSMS).toHaveBeenCalledTimes(1);
  });

  it('creates one message thread per external recipient for broadcast sends', async () => {
    const { messageSender, mocks } = createMessageSender();
    (messageSender as any)._validateToNumbers.mockResolvedValue({
      result: true,
      extNumbers: [],
      noExtNumbers: ['+15550002222', '+15550003333'],
    });

    await expect(
      messageSender.send({
        fromNumber: '+15550001111',
        toNumbers: ['+15550002222', '+15550003333'],
        text: 'hello',
      }),
    ).resolves.toEqual([{ id: 'thread-message' }, { id: 'thread-message' }]);

    expect(mocks.sendNewThreadMessage).toHaveBeenCalledTimes(2);
    expect(mocks.sendNewThreadMessage).toHaveBeenNthCalledWith(1, {
      fromNumber: '+15550001111',
      toNumbers: ['+15550002222'],
      text: 'hello',
      attachments: [],
    });
    expect(mocks.sendNewThreadMessage).toHaveBeenNthCalledWith(2, {
      fromNumber: '+15550001111',
      toNumbers: ['+15550003333'],
      text: 'hello',
      attachments: [],
    });
    expect(mocks.sendSMS).not.toHaveBeenCalled();
  });

  it('keeps pager recipients on internal message sending', async () => {
    const { messageSender, mocks } = createMessageSender();
    (messageSender as any)._validateToNumbers.mockResolvedValue({
      result: true,
      extNumbers: ['102'],
      noExtNumbers: [],
    });

    await expect(
      messageSender.send({
        fromNumber: '+15550001111',
        toNumbers: ['102'],
        text: 'hello',
      }),
    ).resolves.toEqual([{ id: 'pager-message' }]);

    expect(mocks.sendPager).toHaveBeenCalledWith({
      toNumbers: ['102'],
      text: 'hello',
      replyOnMessageId: undefined,
    });
    expect(mocks.sendNewThreadMessage).not.toHaveBeenCalled();
    expect(mocks.sendSMS).not.toHaveBeenCalled();
    expect(mocks.sendMMS).not.toHaveBeenCalled();
  });

  it('routes multipart image messages through message threads for shared sender numbers', async () => {
    const { messageSender, mocks } = createMessageSender();
    const attachment = createAttachment('photo.png');

    await expect(
      messageSender.send({
        fromNumber: '+15550001111',
        toNumbers: ['+15550002222'],
        text: 'hello',
        attachments: [attachment],
        multipart: true,
      }),
    ).resolves.toEqual([{ id: 'thread-message' }]);

    expect(mocks.sendNewThreadMessage).toHaveBeenCalledWith({
      fromNumber: '+15550001111',
      toNumbers: ['+15550002222'],
      text: 'hello',
      attachments: [attachment],
    });
    expect(mocks.sendMMS).not.toHaveBeenCalled();
    expect(mocks.sendSMS).not.toHaveBeenCalled();
  });

  it('sends MMS with non-ASCII filename check enabled', async () => {
    const attachment = createAttachment('photo-\u00e9.png');
    const multipartPost = jest.fn().mockResolvedValue({ id: 'mms-message' });
    const messageSender = Object.assign(
      Object.create(MessageSender.prototype),
      {
        _client: {
          multipart: {
            post: multipartPost,
          },
        },
      },
    ) as MessageSender;

    await expect(
      (messageSender as any)._sendMMS({
        fromNumber: '+15550001111',
        toNumbers: ['+15550002222'],
        text: 'hello',
        attachments: [attachment],
      }),
    ).resolves.toEqual({ id: 'mms-message' });

    expect(multipartPost).toHaveBeenCalledWith(
      '/restapi/v1.0/account/~/extension/~/mms',
      {
        fields: {
          json: {
            from: { phoneNumber: '+15550001111' },
            to: [{ phoneNumber: '+15550002222' }],
            text: 'hello',
          },
        },
        files: {
          attachment: [attachment.file],
        },
        checkAllFilesNameNotHaveASCII: true,
      },
    );
  });
});
