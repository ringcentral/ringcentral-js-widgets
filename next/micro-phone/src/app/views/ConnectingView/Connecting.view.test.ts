import type TelephonySessionsEventBody from '@rc-ex/core/lib/definitions/TelephonySessionsEventBody';
import { Subject } from 'rxjs';

import { ConnectingView } from './Connecting.view';

const createConnectingView = ({
  isWebphoneMode = true,
}: {
  isWebphoneMode?: boolean;
} = {}) => {
  const messages$ = new Subject<TelephonySessionsEventBody>();
  const call = {
    connectErrorOnServer: jest.fn(async () => undefined),
  };
  const callAction = {
    activeCallInfo: undefined as any,
  };
  const callViewState = {
    view: 'hidden',
  };
  const router = {
    currentPath: '/dialer',
  };
  const callingSettings = {
    isWebphoneMode,
  };
  const preInsertCall = {
    cancelPreinsertConnectingCall: jest.fn(async () => 'webphone-1'),
    isCurrentDeviceWebphoneSession: jest.fn(() => false),
  };
  const view = Object.assign(Object.create(ConnectingView.prototype), {
    _call: call,
    _callAction: callAction,
    _callControlView: {
      useCallActions: jest.fn(() => []),
    },
    _callViewState: callViewState,
    _callingSettings: callingSettings,
    _cancelledPreinsertConnectingTokens: new Set<number>(),
    _clearPreinsertConnectingWebphoneSessionId() {
      this.preinsertConnectingWebphoneSessionId = '';
    },
    _contactMatcher: undefined,
    _portManager: {
      onServer: jest.fn(),
      shared: false,
    },
    _preInsertCall: preInsertCall,
    _preinsertConnectingToken: 0,
    _router: router,
    _setPreinsertConnecting(
      value: boolean,
      token = 0,
      displayInfo?: {
        callerId: string;
        displayName: string;
        phoneNumber: string;
      },
    ) {
      this.connecting = value;
      this.preinsertConnectingToken = token;
      if (displayInfo) {
        this.preinsertConnectingDisplayInfo = displayInfo;
      }
    },
    _setPreinsertConnectingWebphoneSessionId(
      token: number,
      webphoneSessionId: string,
    ) {
      if (!this.connecting || this.preinsertConnectingToken !== token) {
        return;
      }

      this.preinsertConnectingWebphoneSessionId = webphoneSessionId;
    },
    _subscription: {
      fromMessage$: jest.fn(() => messages$.asObservable()),
    },
    connecting: false,
    preinsertConnectingDisplayInfo: {
      callerId: '',
      displayName: '',
      phoneNumber: '',
    },
    preinsertConnectingToken: 0,
    preinsertConnectingWebphoneSessionId: '',
  }) as ConnectingView;

  return {
    call,
    callAction,
    callViewState,
    callingSettings,
    messages$,
    preInsertCall,
    router,
    view,
  };
};

describe('ConnectingView', () => {
  it('prepares preinsert connecting state with phone number display info', () => {
    const { view } = createConnectingView();

    const token = view.preparePreinsertConnecting({
      callerId: '+16505550100',
      recipient: {
        name: 'Alice',
        phoneNumber: '+16505550101',
      } as any,
      toNumberField: '',
    });

    expect(token).toBe(1);
    expect(view.connecting).toBe(true);
    expect(view.preinsertConnectingToken).toBe(token);
    expect(view.preinsertConnectingDisplayInfo).toEqual({
      callerId: '+16505550100',
      phoneNumber: '+16505550101',
    });
  });

  it('does not prepare connecting state outside webphone mode', () => {
    const { view } = createConnectingView({ isWebphoneMode: false });

    expect(
      view.preparePreinsertConnecting({
        callerId: '+16505550100',
        recipient: null,
        toNumberField: '+16505550101',
      }),
    ).toBe(0);
    expect(view.connecting).toBe(false);
    expect(view.preinsertConnectingToken).toBe(0);
  });

  it('cancels the active preinsert connecting session on hangup', async () => {
    const { call, preInsertCall, view } = createConnectingView();
    const token = view.preparePreinsertConnecting({
      callerId: '+16505550100',
      recipient: null,
      toNumberField: '+16505550101',
    });

    await view.setPreinsertConnectingWebphoneSessionIdOnServer(
      token,
      'webphone-1',
    );
    await view.hangUpPreinsertConnecting();

    expect(view.connecting).toBe(false);
    expect(view.isPreinsertConnectingCancelled(token)).toBe(true);
    expect(call.connectErrorOnServer).toHaveBeenCalledTimes(1);
    expect(preInsertCall.cancelPreinsertConnectingCall).toHaveBeenCalledWith(
      'webphone-1',
    );
  });

  it('ignores webphone session id updates from stale connecting tokens', async () => {
    const { view } = createConnectingView();
    const token = view.preparePreinsertConnecting({
      callerId: '+16505550100',
      recipient: null,
      toNumberField: '+16505550101',
    });

    await view.setPreinsertConnectingWebphoneSessionIdOnServer(
      token + 1,
      'stale-webphone-session',
    );
    expect(view.preinsertConnectingWebphoneSessionId).toBe('');

    await view.setPreinsertConnectingWebphoneSessionIdOnServer(
      token,
      'webphone-1',
    );
    expect(view.preinsertConnectingWebphoneSessionId).toBe('webphone-1');
  });

  it('matches telephony messages for the current webphone session', () => {
    const { preInsertCall, view } = createConnectingView();
    preInsertCall.isCurrentDeviceWebphoneSession.mockReturnValue(true);

    expect(
      (view as any)._isCurrentPreinsertConnectingCallMessage('webphone-1', {
        sessionId: 'other-webphone-session',
        telephonySessionId: 'telephony-1',
      }),
    ).toBe(true);
    expect(preInsertCall.isCurrentDeviceWebphoneSession).toHaveBeenCalledWith(
      'telephony-1',
      'webphone-1',
    );

    expect(
      (view as any)._isCurrentPreinsertConnectingCallMessage('webphone-1', {
        sessionId: 'webphone-1',
      }),
    ).toBe(true);

    expect(
      (view as any)._isCurrentPreinsertConnectingCallMessage('webphone-1', {
        sessionId: 'other-webphone-session',
      }),
    ).toBe(false);
  });

  it('waits until the matching active call is ready on the calling route before closing the overlay', () => {
    const { callAction, callViewState, router, view } = createConnectingView();
    const message = {
      sessionId: 'webphone-1',
      telephonySessionId: 'telephony-1',
    };

    expect(
      (view as any)._isPreinsertConnectingCallReadyToDisplay(message),
    ).toBe(false);

    callViewState.view = 'activeCall';
    callAction.activeCallInfo = {
      call: {
        direction: 'Outbound',
        sessionId: 'platform-session-1',
        telephonySessionId: 'telephony-1',
        webphoneSession: {
          id: 'webphone-1',
        },
      },
      meta: {
        open: true,
      },
    };

    expect(
      (view as any)._isPreinsertConnectingCallReadyToDisplay(message),
    ).toBe(false);

    router.currentPath = '/calling';

    expect(
      (view as any)._isPreinsertConnectingCallReadyToDisplay(message),
    ).toBe(true);
  });

  it('does not close the overlay for a different active call', () => {
    const { callAction, callViewState, router, view } = createConnectingView();
    callViewState.view = 'activeCall';
    router.currentPath = '/calling';
    callAction.activeCallInfo = {
      call: {
        direction: 'Outbound',
        sessionId: 'platform-session-2',
        telephonySessionId: 'telephony-2',
        webphoneSession: {
          id: 'webphone-2',
        },
      },
      meta: {
        open: true,
      },
    };

    expect(
      (view as any)._isPreinsertConnectingCallReadyToDisplay({
        sessionId: 'webphone-1',
        telephonySessionId: 'telephony-1',
      }),
    ).toBe(false);
  });
});
