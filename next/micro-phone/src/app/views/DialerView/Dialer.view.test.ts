import { DialerView } from './Dialer.view';

const createDialerView = () => {
  const call = {
    call: jest.fn(async () => ({ id: 'webphone-1' })),
  };
  const connectingView = {
    cancelPreinsertConnectingCall: jest.fn(async () => 'webphone-1'),
    clearPreinsertConnectingCancel: jest.fn(),
    connecting: false,
    get isConnecting() {
      return this.connecting;
    },
    isPreinsertConnectingCancelled: jest.fn(() => false),
    preparePreinsertConnecting: jest.fn(() => 1),
    setPreinsertConnectingOnServer: jest.fn(async () => undefined),
    setPreinsertConnectingWebphoneSessionIdOnServer: jest.fn(
      async () => undefined,
    ),
  };
  const view = Object.assign(Object.create(DialerView.prototype), {
    _call: call,
    _callHooks: [],
    _callingSettings: {
      fromNumber: '+16505550100',
      isWebphoneMode: true,
    },
    logger: {
      log: jest.fn(),
    },
    recipient: null,
    resetState: jest.fn(function resetState(next = {}) {
      Object.assign(this, {
        isLastInputFromDialpad: false,
        recipient: null,
        toNumberField: '',
        ...next,
      });
    }),
    toNumberField: '',
    trackCallMade: jest.fn(),
  }) as DialerView & {
    callVerify?: jest.Mock;
  };

  view.callVerify = jest.fn(async () => true);
  Object.defineProperty(view, '_connectingView', {
    configurable: true,
    value: connectingView,
  });

  return {
    call,
    connectingView,
    view,
  };
};

describe('DialerView', () => {
  it('does not start another webphone call while connecting', async () => {
    const { call, connectingView, view } = createDialerView();
    connectingView.connecting = true;

    await view.call({
      phoneNumber: '+16505550101',
    });

    expect(connectingView.preparePreinsertConnecting).not.toHaveBeenCalled();
    expect(call.call).not.toHaveBeenCalled();
  });

  it('clears the connecting overlay when call verification fails', async () => {
    const { call, connectingView, view } = createDialerView();
    view.callVerify!.mockResolvedValue(false);

    await view.call({
      phoneNumber: '+16505550101',
    });

    expect(connectingView.preparePreinsertConnecting).toHaveBeenCalledWith({
      callerId: '+16505550100',
      recipient: null,
      toNumberField: '+16505550101',
    });
    expect(connectingView.setPreinsertConnectingOnServer).toHaveBeenCalledWith(
      false,
    );
    expect(call.call).not.toHaveBeenCalled();
  });

  it('cancels the created webphone session when connecting is cancelled after call starts', async () => {
    const { call, connectingView, view } = createDialerView();
    connectingView.isPreinsertConnectingCancelled
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    await view.call({
      phoneNumber: '+16505550101',
    });

    expect(call.call).toHaveBeenCalledWith({
      clickDialerToCall: false,
      fromNumber: undefined,
      isValidNumber: true,
      phoneNumber: '+16505550101',
      recipient: undefined,
    });
    expect(
      connectingView.setPreinsertConnectingWebphoneSessionIdOnServer,
    ).toHaveBeenCalledWith(1, 'webphone-1');
    expect(connectingView.cancelPreinsertConnectingCall).toHaveBeenCalledWith(
      'webphone-1',
    );
    expect(connectingView.clearPreinsertConnectingCancel).toHaveBeenCalledWith(
      1,
    );
  });
});
