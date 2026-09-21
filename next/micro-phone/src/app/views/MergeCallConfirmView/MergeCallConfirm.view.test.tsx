import { MergeCallConfirmView } from './MergeCallConfirm.view';

describe('MergeCallConfirmView contactName', () => {
  function createView({
    allCalls = [],
    contextData = null,
  }: {
    allCalls?: Record<string, any>[];
    contextData?: Record<string, any> | null;
  }) {
    const view = Object.create(MergeCallConfirmView.prototype) as any;
    view._callMonitor = { allCalls };
    view._activeCallControl = { getSession: jest.fn() };
    view.contextData = contextData;
    return view;
  }

  function createCall(overrides: Record<string, any> = {}) {
    return {
      direction: 'Inbound',
      telephonySessionId: 'telephonySessionId-1',
      fromName: undefined,
      from: undefined,
      toName: undefined,
      to: undefined,
      ...overrides,
    };
  }

  test('returns undefined when there is no confirm context', () => {
    const view = createView({
      contextData: null,
      allCalls: [createCall({ direction: 'Inbound', fromName: 'Alice' })],
    });

    expect(view.contactName).toBeUndefined();
  });

  test('returns undefined when the session call cannot be found', () => {
    const view = createView({
      contextData: { telephonySessionId: 'telephonySessionId-404' },
      allCalls: [],
    });

    expect(view.contactName).toBeUndefined();
  });

  test('resolves the inbound caller name', () => {
    const view = createView({
      contextData: { telephonySessionId: 'telephonySessionId-1' },
      allCalls: [createCall({ direction: 'Inbound', fromName: 'Alice' })],
    });

    expect(view.contactName).toBe('Alice');
  });

  test('falls back to the inbound caller phone number', () => {
    const view = createView({
      contextData: { telephonySessionId: 'telephonySessionId-1' },
      allCalls: [
        createCall({
          direction: 'Inbound',
          from: { phoneNumber: '+16505550100' },
        }),
      ],
    });

    expect(view.contactName).toBe('+16505550100');
  });

  test('resolves the outbound callee name', () => {
    const view = createView({
      contextData: { telephonySessionId: 'telephonySessionId-1' },
      allCalls: [createCall({ direction: 'Outbound', toName: 'Bob' })],
    });

    expect(view.contactName).toBe('Bob');
  });

  test('falls back to the outbound callee phone number', () => {
    const view = createView({
      contextData: { telephonySessionId: 'telephonySessionId-1' },
      allCalls: [
        createCall({
          direction: 'Outbound',
          to: { phoneNumber: '+16505550101' },
        }),
      ],
    });

    expect(view.contactName).toBe('+16505550101');
  });

  test('matches the call by webphone session id', () => {
    const view = createView({
      contextData: { webphoneSessionId: 'webphoneSessionId-1' },
      allCalls: [
        createCall({
          telephonySessionId: undefined,
          direction: 'Outbound',
          toName: 'Webphone Bob',
          webphoneSession: { id: 'webphoneSessionId-1' },
        }),
      ],
    });

    expect(view.contactName).toBe('Webphone Bob');
  });
});
