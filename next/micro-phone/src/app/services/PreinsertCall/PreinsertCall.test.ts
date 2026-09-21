import { BehaviorSubject, Subject } from 'rxjs';

import { sessionStatus } from '../Webphone';

import { PreinsertCall } from './PreinsertCall';

const createWebphoneSession = ({
  callStatus = sessionStatus.connecting,
  direction = 'Outbound',
  id = 'webphone-1',
  telephonySessionId = 'telephony-1',
}: {
  callStatus?: string;
  direction?: string;
  id?: string;
  telephonySessionId?: string;
} = {}) => ({
  callStatus,
  direction,
  id,
  partyData: telephonySessionId ? { sessionId: telephonySessionId } : undefined,
});

const createPreinsertCall = ({
  sessions = [],
}: {
  sessions?: ReturnType<typeof createWebphoneSession>[];
} = {}) => {
  const messages$ = new Subject<unknown>();
  const preinsertStatusMap = {};
  const webphone = {
    hangup: jest.fn(async () => undefined),
    sessions,
  };
  const module = Object.assign(Object.create(PreinsertCall.prototype), {
    _cancelledPreinsertTelephonySessionIds: new Set<string>(),
    _cancelledPreinsertWebphoneSessionIds: new Set<string>(),
    _cancellingPreinsertTelephonySessionIds: new Set<string>(),
    _numberFormatter: {},
    _removePreinsert(telephonySessionId: string) {
      delete this.preinsertStatusMap[telephonySessionId];
    },
    _setPreinsert(telephonySessionId: string, status: string) {
      this.preinsertStatusMap[telephonySessionId] = status;
    },
    _subscription: {
      fromMessage$: jest.fn(() => messages$.asObservable()),
    },
    _webphone: webphone,
    cleanPreinsert(telephonySessionIds: string[]) {
      telephonySessionIds.forEach((telephonySessionId) => {
        delete this.preinsertStatusMap[telephonySessionId];
      });
    },
    preinsertStatusMap,
    preinsertStatusMap$: new BehaviorSubject(preinsertStatusMap),
  }) as PreinsertCall;

  return {
    messages$,
    module,
    webphone,
  };
};

describe('PreinsertCall', () => {
  it('cancels a preinsert webphone session by id', async () => {
    const { module, webphone } = createPreinsertCall({
      sessions: [createWebphoneSession()],
    });

    await expect(
      module.cancelPreinsertConnectingCall('webphone-1'),
    ).resolves.toBe('webphone-1');

    expect(module.preinsertStatusMap).toEqual({
      'telephony-1': 'end',
    });
    expect(module.isCancelledPreinsertSession('telephony-1')).toBe(true);
    expect(
      module.isCurrentDeviceWebphoneSession('telephony-1', 'webphone-1'),
    ).toBe(true);
    expect(webphone.hangup).toHaveBeenCalledWith(
      'webphone-1',
      expect.any(Function),
    );
  });

  it('uses the active outbound preinsert session when id is omitted', async () => {
    const { module, webphone } = createPreinsertCall({
      sessions: [
        createWebphoneSession({
          direction: 'Inbound',
          id: 'inbound-session',
          telephonySessionId: 'inbound-telephony',
        }),
        createWebphoneSession({
          callStatus: sessionStatus.finished,
          id: 'finished-session',
          telephonySessionId: 'finished-telephony',
        }),
        createWebphoneSession({
          id: 'active-outbound-session',
          telephonySessionId: 'active-outbound-telephony',
        }),
      ],
    });

    await expect(module.cancelPreinsertConnectingCall()).resolves.toBe(
      'active-outbound-session',
    );

    expect(module.preinsertStatusMap).toEqual({
      'active-outbound-telephony': 'end',
    });
    expect(webphone.hangup).toHaveBeenCalledWith(
      'active-outbound-session',
      expect.any(Function),
    );
  });

  it('drops a cancelled telephony session that has no local webphone session', async () => {
    const dropTelephonySession = jest.fn();
    const { module, webphone } = createPreinsertCall({
      sessions: [],
    });

    await (module as any)._hangupCancelledPreinsertCall('telephony-1', void 0, {
      dropTelephonySession,
    });

    expect(dropTelephonySession).toHaveBeenCalledWith('telephony-1');
    expect(module.preinsertStatusMap).toEqual({
      'telephony-1': 'end',
    });
    expect(module.isCancelledPreinsertSession('telephony-1')).toBe(true);
    expect(webphone.hangup).not.toHaveBeenCalled();
  });
});
