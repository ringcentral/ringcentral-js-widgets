import {
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';
import type { SessionData } from 'ringcentral-call-control/lib/Session';

import { ActiveCallControl } from '../../modules/ActiveCallControl';
import { mockModuleGenerator as baseMockModuleGenerator } from '../lib/mockModule';

const mockParty = {};

const mockSessionData = {
  id: 'testId',
  extensionId: 'testExtensionId',
  accountId: 'testAccountId',
  parties: [] as [],
  party: mockParty,
};

const mockSession = {
  data: mockSessionData,
  party: mockParty,
  activeCallId: 'testActiveCallId',
  direction: 'testDirection',
  from: 'testFrom',
  id: 'testId',
  otherParties: {},
  recordings: [],
  sessionId: 'testSessionId',
  startTime: 'testStartTime',
  status: 'testStatus',
  telephonySessionId: 'testTelephonySessionId',
  to: 'testto',
};

const sessionState = {
  id: 'testId',
  isRecording: false,
  extensionId: 'testExtensionId',
  accountId: 'testAccountId',
  parties: [] as [],
  party: mockParty,
  activeCallId: 'testActiveCallId',
  direction: 'testDirection',
  from: 'testFrom',
  otherParties: {},
  recordings: [],
  sessionId: 'testSessionId',
  startTime: 'testStartTime',
  status: 'testStatus',
  telephonySessionId: 'testTelephonySessionId',
  telephonySession: {},
  to: 'testto',
};

const mockModuleGenerator = (options: any) => {
  return baseMockModuleGenerator({
    ...options,
    // @ts-ignore
    _getSessionById: ActiveCallControl.prototype._getSessionById,
    // @ts-ignore
    _updateActiveSessions: ActiveCallControl.prototype._updateActiveSessions,
  });
};

const getMockModule = () =>
  mockModuleGenerator({
    data: {
      sessions: [] as SessionData[],
      activeSessionId: null as any as string,
      busyTimestamp: 0,
      timestamp: 0,
    },
    _rcCall: {
      sessions: [mockSession],
    },
  });

@autorun(test)
@title('ActiveCallControl Module "updateActiveSessions" action')
export class ActiveCallControlUpdateActiveSessions extends Step {
  run() {
    return (
      <Scenario desc="Access 'sessions' and 'timestamp'">
        <Given
          desc="Create a 'ActiveCallControl' instance and have initial state 'activeSessions' as []"
          action={() => {
            const activeCallControl = new ActiveCallControl({} as any);
            expect(activeCallControl.data.sessions.length).toBe(0);
            expect(activeCallControl.data.timestamp).toBe(0);
          }}
        />
        <When
          desc="Execute 'updateActiveSessions' method with mockModule"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            Date.now = jest.fn().mockImplementation(() => 1234567);
            ActiveCallControl.prototype.updateActiveSessions.call(
              context.mockModule,
            );
          }}
        />
        <Then
          desc="The mockModule 'sessions' should be the expected values"
          action={(_: any, context: any) => {
            expect(context.mockModule.data.sessions).toEqual([sessionState]);
            expect(context.mockModule.data.timestamp).toEqual(1234567);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title(
  'ActiveCallControl Module with setCallControlBusyTimestamp and clearCallControlBusyTimestamp',
)
export class ActiveCallControlBusyTimestamp extends Step {
  run() {
    return (
      <Scenario desc="Access 'busyTimestamp'">
        <Given
          desc="Create a 'ActiveCallControl' instance and have initial state 'busyTimestamp' as 0"
          action={() => {
            const activeCallControl = new ActiveCallControl({} as any);
            expect(activeCallControl.data.busyTimestamp).toBe(0);
          }}
        />
        <When
          desc="Execute setCallControlBusyTimestamp method with mockModule"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            Date.now = jest.fn().mockImplementation(() => 12345678);
            ActiveCallControl.prototype.setCallControlBusyTimestamp.call(
              context.mockModule,
            );
          }}
        />
        <Then
          desc="The busyTimestamp should be the expected values"
          action={(_: any, context: any) => {
            expect(context.mockModule.data.busyTimestamp).toEqual(12345678);
          }}
        />
        <When
          desc="Execute clearCallControlBusyTimestamp method with mockModule"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            ActiveCallControl.prototype.clearCallControlBusyTimestamp.call(
              context.mockModule,
            );
          }}
        />
        <Then
          desc="The mockModule 'busyTimestamp' should be the expected values"
          action={(_: any, context: any) => {
            expect(context.mockModule.data.busyTimestamp).toEqual(0);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title(
  'ActiveCallControl Module "setActiveSessionId" action and "removeActiveSession" action',
)
export class ActiveCallControlActiveSessionId extends Step {
  run() {
    return (
      <Scenario desc="Access 'activeSessionId'">
        <Given
          desc="Create a 'ActiveCallControl' instance and have initial state 'activeSessions' as []"
          action={() => {
            const activeCallControl = new ActiveCallControl({} as any);
            expect(activeCallControl.data.activeSessionId).toBe(null);
          }}
          ac
        />
        <When
          desc="Execute 'setActiveSessionId' method with mockModule"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            ActiveCallControl.prototype.setActiveSessionId.call(
              context.mockModule,
              '123',
            );
          }}
        />
        <Then
          desc="The mockModule 'activeSessionId' should be the expected values"
          action={(_: any, context: any) => {
            expect(context.mockModule.data.activeSessionId).toEqual('123');
          }}
        />
        <When
          desc="Execute 'setActiveSessionId' method with mockModule"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            ActiveCallControl.prototype.removeActiveSession.call(
              context.mockModule,
            );
          }}
        />
        <Then
          desc="The mockModule 'activeSessionId' should be the expected values"
          action={(_: any, context: any) => {
            expect(context.mockModule.data.activeSessionId).toEqual(null);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ActiveCallControl Module "getValidPhoneNumber" action')
export class ActiveCallControlTransferCall extends Step {
  run() {
    return (
      <Scenario desc="verify getValidPhoneNumber call number">
        <When
          desc="Execute 'transfer' method with mock module"
          action={(_: any, context: any) => {
            context.mock = mockModuleGenerator({
              _deps: {
                regionSettings: {
                  areaCode: '',
                  countryCode: 'US',
                },
                accountInfo: {
                  mainCompanyNumber: '',
                },
                brand: {
                  brandConfig: { allowRegionSettings: true },
                },
                availabilityMonitor: {
                  checkIfHAError: () => false,
                },
                numberValidate: {
                  validateNumbers: jest.fn(),
                },
                alert: {
                  warning: jest.fn(),
                },
              },
              _permissionCheck: false,
              _rcCall: { sessions: [] },
              clearCallControlBusyTimestamp: () => null,
              setCallControlBusyTimestamp: () => null,
            });
            ActiveCallControl.prototype.getValidPhoneNumber.call(
              context.mock,
              '101',
            );
          }}
        />
        <Then
          desc="numberValidate validateNumbers should not be called"
          action={(_: any, context: any) => {
            expect(
              context.mock._deps.numberValidate.validateNumbers,
            ).not.toHaveBeenCalled();
          }}
        />
        <When
          desc="Execute 'getValidPhoneNumber' method with mock module _permissionCheck false"
          action={async (_: any, context: any) => {
            context.mock = mockModuleGenerator({
              _deps: {
                regionSettings: {
                  areaCode: '',
                  countryCode: 'US',
                },
                accountInfo: {
                  mainCompanyNumber: '',
                },
                brand: {
                  brandConfig: { allowRegionSettings: true },
                },
                availabilityMonitor: {
                  checkIfHAError: () => false,
                },
                numberValidate: {
                  validateNumbers: jest.fn().mockReturnValue({
                    result: true,
                    errors: [],
                    numbers: [
                      {
                        e164: '101',
                      },
                    ],
                  }),
                },
                alert: {
                  warning: jest.fn(),
                },
              },
              _permissionCheck: true,
              _rcCall: { sessions: [] },
              clearCallControlBusyTimestamp: () => null,
              setCallControlBusyTimestamp: () => null,
            });
            await ActiveCallControl.prototype.getValidPhoneNumber.call(
              context.mock,
              '101',
            );
          }}
        />
        <Then
          desc="numberValidate validateNumbers should be called"
          action={(_: any, context: any) => {
            expect(
              context.mock._deps.numberValidate.validateNumbers,
            ).toHaveBeenCalledWith(['101']);
          }}
        />
        <When
          desc="Execute 'getValidPhoneNumber' method with mock module _permissionCheck false and error"
          action={async (_: any, context: any) => {
            context.mock = mockModuleGenerator({
              _deps: {
                regionSettings: {
                  areaCode: '',
                  countryCode: 'US',
                },
                accountInfo: {
                  mainCompanyNumber: '',
                },
                brand: {
                  brandConfig: { allowRegionSettings: true },
                },
                availabilityMonitor: {
                  checkIfHAError: () => false,
                },
                numberValidate: {
                  validateNumbers: jest.fn().mockReturnValue({
                    result: false,
                    errors: [{ type: 'test', phoneNumber: '101' }],
                    numbers: [],
                  }),
                },
                alert: {
                  warning: jest.fn(),
                },
              },
              _permissionCheck: true,
              _rcCall: { sessions: [] },
              clearCallControlBusyTimestamp: () => null,
              setCallControlBusyTimestamp: () => null,
            });
            await ActiveCallControl.prototype.getValidPhoneNumber.call(
              context.mock,
              '101',
            );
          }}
        />
        <Then
          desc="numberValidate validateNumbers should be called"
          action={(_: any, context: any) => {
            expect(
              context.mock._deps.numberValidate.validateNumbers,
            ).toHaveBeenCalledWith(['101']);
            expect(context.mock._deps.alert.warning).toHaveBeenCalledWith({
              message: undefined,
              payload: { phoneNumber: '101' },
            });
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ActiveCallControl Module Hold Session action')
export class ActiveCallControlHoldSession extends Step {
  run() {
    return (
      <Scenario desc="ActiveCallControl Module Hold Session action">
        <When
          desc="Execute 'hold' method with mockModule"
          action={(_: any, context: any) => {
            context.mockModule = mockModuleGenerator({
              _rcCall: {
                sessions: [
                  {
                    direction: 'Outbound',
                    id: 'testId',
                    otherParties: [],
                    hold: jest.fn(),
                  },
                ],
              },
              clearCallControlBusyTimestamp: () => null,
              setCallControlBusyTimestamp: () => null,
            });
            ActiveCallControl.prototype.hold.call(context.mockModule, 'testId');
          }}
        />
        <Then
          desc="The sessions should be hold"
          action={(_: any, context: any) => {
            expect(
              context.mockModule._rcCall.sessions[0].hold,
            ).toHaveBeenCalled();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ActiveCallControl Module Forward Session action')
export class ActiveCallControlForwardSession extends Step {
  run() {
    return (
      <Scenario desc="ActiveCallControl Module Forward Session action">
        <When
          desc="Execute 'forward' method with mockModule _permissionCheck false"
          action={(_: any, context: any) => {
            context.mockModule = mockModuleGenerator({
              _deps: {
                regionSettings: {
                  areaCode: '',
                  countryCode: 'US',
                },
                brand: {
                  brandConfig: { allowRegionSettings: true },
                },
                numberValidate: {
                  validateNumbers: jest.fn().mockReturnValue({
                    result: false,
                    errors: [{ type: 'test', phoneNumber: '101' }],
                    numbers: [],
                  }),
                },
                alert: {
                  warning: jest.fn(),
                },
              },
              _permissionCheck: false,
              _rcCall: {
                sessions: [
                  {
                    direction: 'Outbound',
                    id: 'testId',
                    otherParties: [],
                    hold: jest.fn(),
                  },
                ],
              },
              acceptOptions: {},
              clearCallControlBusyTimestamp: () => null,
              setCallControlBusyTimestamp: () => null,
            });
            ActiveCallControl.prototype.forward.call(
              context.mockModule,
              '101',
              'testId',
            );
          }}
        />
        <Then
          desc="numberValidate validateNumbers should not be called"
          action={(_: any, context: any) => {
            expect(
              context.mockModule._deps.numberValidate.validateNumbers,
            ).not.toHaveBeenCalled();
          }}
        />
        <When
          desc="Execute 'forward' method with mockModule _permissionCheck true"
          action={(_: any, context: any) => {
            context.mockModule = mockModuleGenerator({
              _deps: {
                regionSettings: {
                  areaCode: '',
                  countryCode: 'US',
                },
                brand: {
                  brandConfig: { allowRegionSettings: true },
                },
                numberValidate: {
                  validateNumbers: jest.fn().mockReturnValue({
                    result: false,
                    errors: [{ type: 'test', phoneNumber: '101' }],
                    numbers: [],
                  }),
                },
                alert: {
                  warning: jest.fn(),
                },
              },
              _permissionCheck: true,
              _rcCall: {
                sessions: [
                  {
                    direction: 'Outbound',
                    id: 'testId',
                    otherParties: [],
                    hold: jest.fn(),
                  },
                ],
              },
              acceptOptions: {},
              clearCallControlBusyTimestamp: () => null,
              setCallControlBusyTimestamp: () => null,
            });
            ActiveCallControl.prototype.forward.call(
              context.mockModule,
              '101',
              'testId',
            );
          }}
        />
        <Then
          desc="numberValidate validateNumbers should be called"
          action={(_: any, context: any) => {
            expect(
              context.mockModule._deps.numberValidate.validateNumbers,
            ).toHaveBeenCalledWith(['101']);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ActiveCallControl Module Hold Other Calls action')
export class ActiveCallControlHoldOtherCallsSession extends Step {
  run() {
    return (
      <Scenario desc="ActiveCallControl Module Hold Other Calls action">
        <When
          desc="Execute '_holdOtherCalls' method with mockModule"
          action={(_: any, context: any) => {
            context.mockModule = mockModuleGenerator({
              _rcCall: {
                sessions: [
                  {
                    direction: 'Outbound',
                    telephonySessionId: 'testId',
                    status: 'Answered',
                    webphoneSession: {
                      hold: jest.fn(),
                    },
                    otherParties: [],
                  },
                  {
                    direction: 'Outbound',
                    telephonySessionId: 'testHoldId',
                    status: 'Answered',
                    webphoneSession: {
                      hold: jest.fn(),
                    },
                    otherParties: [],
                  },
                ],
              },
              clearCallControlBusyTimestamp: () => null,
              setCallControlBusyTimestamp: () => null,
            });
            ActiveCallControl.prototype._holdOtherCalls.call(
              context.mockModule,
              'testId',
            );
          }}
        />
        <Then
          desc="The other call should be hold"
          action={(_: any, context: any) => {
            const otherCall = context.mockModule._rcCall.sessions.find((s) => {
              return s.telephonySessionId === 'testHoldId';
            });
            expect(otherCall.webphoneSession.hold).toHaveBeenCalled();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ActiveCallControl Module answerAndEnd action')
export class ActiveCallControlAnswerAndEndSession extends Step {
  run() {
    return (
      <Scenario desc="ActiveCallControl Module answerAndEnd action">
        <When
          desc="Execute 'answerAndEnd' method with mockModule"
          action={(_: any, context: any) => {
            context.mockModule = mockModuleGenerator({
              _rcCall: {
                sessions: [
                  {
                    direction: 'Outbound',
                    id: 'testId',
                    status: 'Answered',
                    webphoneSession: {},
                    hangup: jest.fn(),
                  },
                  {
                    direction: 'Outbound',
                    id: 'testOtherId',
                    status: 'Proceeding',
                    webphoneSession: {},
                    hangup: jest.fn(),
                  },
                ],
              },
              clearCallControlBusyTimestamp: () => null,
              setCallControlBusyTimestamp: () => null,
            });
            ActiveCallControl.prototype.answerAndEnd.call(
              context.mockModule,
              'testId',
            );
          }}
        />
        <Then
          desc="The other call should be hangup"
          action={(_: any, context: any) => {
            const otherCall = context.mockModule._rcCall.sessions.find((s) => {
              return s.id === 'testOtherId';
            });
            expect(otherCall.hangup).toHaveBeenCalled();
          }}
        />
      </Scenario>
    );
  }
}
