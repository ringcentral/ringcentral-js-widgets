import { MessageThreadLogger } from './MessageThreadLogger';

const createLogger = ({
  ready = true,
  conversations = [],
  conversationLogIds = ['thread-1'],
  uniqueNumbers = ['+16505550101'],
  messagesByThreadId = {},
  withMessageThread = true,
}: {
  ready?: boolean;
  conversations?: any[];
  conversationLogIds?: string[];
  uniqueNumbers?: string[];
  messagesByThreadId?: Record<string, any[]>;
  withMessageThread?: boolean;
} = {}) => {
  const logFunction = jest.fn().mockResolvedValue(undefined);
  const readyCheckFunction = jest.fn(() => ready);
  const storage = {
    enable: jest.fn(),
  };
  const messageThread = withMessageThread
    ? {
        threadConversationsInfo: {
          conversations,
        },
        conversationLogIds,
        uniqueNumbers,
        getThreadLogMessages: jest.fn(
          (threadId: string) => messagesByThreadId[threadId] ?? [],
        ),
      }
    : undefined;
  const contactMatcher = {
    addQuerySource: jest.fn(),
  };
  const logger = new MessageThreadLogger(
    messageThread as any,
    {
      logFunction,
      readyCheckFunction,
    },
    storage as any,
    contactMatcher as any,
  );

  return {
    contactMatcher,
    logger,
    logFunction,
    messageThread,
    readyCheckFunction,
    storage,
  };
};

describe('MessageThreadLogger', () => {
  it('enables storage and registers thread numbers as contact matcher queries', () => {
    const { contactMatcher, logger, readyCheckFunction, storage } =
      createLogger({
        ready: false,
        uniqueNumbers: ['+16505550101', '+16505550102'],
      });

    expect(storage.enable).toHaveBeenCalledWith(logger);
    expect(contactMatcher.addQuerySource).toHaveBeenCalledWith({
      getQueriesFn: expect.any(Function),
      readyCheckFn: expect.any(Function),
    });

    const [querySource] = contactMatcher.addQuerySource.mock.calls[0];
    expect(querySource.getQueriesFn()).toEqual([
      '+16505550101',
      '+16505550102',
    ]);
    expect(querySource.readyCheckFn()).toBe(false);
    expect(readyCheckFunction).toHaveBeenCalled();
  });

  it('computes shared SMS reminder visibility from storage state', () => {
    const { logger } = createLogger();

    expect(logger.shouldShowSharedSmsLogReminder).toBe(true);
  });

  it('builds thread conversation log map and skips conversations without log ids', () => {
    const messages = [{ id: 'message-1' }];
    const { logger, messageThread } = createLogger({
      conversations: [
        {
          conversationLogId: 'thread-1',
          conversationId: 'conversation-1',
          creationTime: Date.UTC(2026, 4, 31),
          self: { phoneNumber: '+16505550000' },
          correspondents: [{ phoneNumber: '+16505550101' }],
        },
        {
          conversationLogId: 'thread-2',
          conversationId: 'conversation-2',
          creationTime: Date.UTC(2026, 5, 1),
          date: '2026/6/1',
          type: 'SMS',
        },
        {
          conversationId: 'missing-log-id',
        },
      ],
      messagesByThreadId: {
        'thread-1': messages,
      },
    });

    expect(logger.threadMessageLogMap).toEqual({
      'thread-1': {
        conversationLogId: 'thread-1',
        conversationId: 'conversation-1',
        creationTime: Date.UTC(2026, 4, 31),
        date: '2026/5/31',
        type: 'Text',
        messages,
        conversationLogMatches: [],
        self: { phoneNumber: '+16505550000' },
        correspondents: [{ phoneNumber: '+16505550101' }],
      },
      'thread-2': {
        conversationLogId: 'thread-2',
        conversationId: 'conversation-2',
        creationTime: Date.UTC(2026, 5, 1),
        date: '2026/6/1',
        type: 'SMS',
        messages: [],
        conversationLogMatches: [],
        self: undefined,
        correspondents: undefined,
      },
    });
    expect(messageThread?.getThreadLogMessages).toHaveBeenCalledWith(
      'thread-1',
    );
    expect(messageThread?.getThreadLogMessages).toHaveBeenCalledWith(
      'thread-2',
    );
  });

  it('returns thread ids, unique numbers, messages, and conversations with empty fallbacks', () => {
    const { logger } = createLogger({
      conversations: [
        {
          conversationLogId: 'thread-1',
          creationTime: 0,
        },
      ],
      conversationLogIds: ['thread-1', 'thread-2'],
      uniqueNumbers: ['+16505550101'],
      messagesByThreadId: {
        'thread-1': [{ id: 'message-1' }],
      },
    });
    const { logger: emptyLogger } = createLogger({ withMessageThread: false });

    expect(logger.threadLogIds).toEqual(['thread-1', 'thread-2']);
    expect(logger.threadUniqueNumbers).toEqual(['+16505550101']);
    expect(logger.getThreadLogMessages('thread-1')).toEqual([
      { id: 'message-1' },
    ]);
    expect(logger.getThreadConversation('thread-1')).toMatchObject({
      conversationLogId: 'thread-1',
    });

    expect(emptyLogger.threadMessageLogMap).toEqual({});
    expect(emptyLogger.threadLogIds).toEqual([]);
    expect(emptyLogger.threadUniqueNumbers).toEqual([]);
    expect(emptyLogger.getThreadLogMessages('thread-1')).toEqual([]);
    expect(emptyLogger.getThreadConversation('thread-1')).toBeUndefined();
  });

  it('identifies logs by conversationLogId, threadId, id, or empty fallback', () => {
    const { logger } = createLogger();
    const identityFunction = (logger as any)._identityFunction;

    expect(identityFunction({ conversationLogId: 'conversation-log-id' })).toBe(
      'conversation-log-id',
    );
    expect(identityFunction({ threadId: 'thread-id' })).toBe('thread-id');
    expect(identityFunction({ id: 'message-id' })).toBe('message-id');
    expect(identityFunction({})).toBe('');
  });

  it('logs a thread conversation when it exists', async () => {
    const correspondentEntity = { id: 'contact-1' };
    const { logger } = createLogger({
      conversations: [
        {
          conversationLogId: 'thread-1',
          conversationId: 'conversation-1',
          creationTime: Date.UTC(2026, 4, 31),
        },
      ],
    });
    const logSpy = jest.spyOn(logger, 'log').mockResolvedValue(undefined);

    await logger.logConversation({
      conversationId: 'thread-1',
      correspondentEntity,
      redirect: true,
      source: 'test',
    });

    expect(logSpy).toHaveBeenCalledWith({
      item: expect.objectContaining({
        conversationLogId: 'thread-1',
        conversationId: 'conversation-1',
      }),
      correspondentEntity,
      redirect: true,
      source: 'test',
    });
  });

  it('does not log when the thread conversation is missing', async () => {
    const { logger } = createLogger();
    const logSpy = jest.spyOn(logger, 'log').mockResolvedValue(undefined);

    await logger.logConversation({
      conversationId: 'missing-thread',
      correspondentEntity: { id: 'contact-1' },
      redirect: false,
    });

    expect(logSpy).not.toHaveBeenCalled();
  });
});
