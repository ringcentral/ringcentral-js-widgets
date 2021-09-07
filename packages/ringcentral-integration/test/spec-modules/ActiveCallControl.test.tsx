import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
} from '@ringcentral-integration/test-utils';
import { SessionData } from 'ringcentral-call-control/lib/Session';

import { ActiveCallControl } from '../../modules/ActiveCallControlV2';
import { mockModuleGenerator } from '../lib/mockModule';

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
  recordings: {},
  sessionId: 'testSessionId',
  startTime: 'testStartTime',
  status: 'testStatus',
  telephonySessionId: 'testTelephonySessionId',
  to: 'testto',
};

const sessionState = {
  id: 'testId',
  extensionId: 'testExtensionId',
  accountId: 'testAccountId',
  parties: [] as [],
  party: mockParty,
  activeCallId: 'testActiveCallId',
  direction: 'testDirection',
  from: 'testFrom',
  otherParties: {},
  recordings: {},
  sessionId: 'testSessionId',
  startTime: 'testStartTime',
  status: 'testStatus',
  telephonySessionId: 'testTelephonySessionId',
  telephonySession: {},
  to: 'testto',
};

const getMockModule = () =>
  mockModuleGenerator({
    data: {
      sessions: [] as SessionData[],
      activeSessionId: null as string,
      busyTimestamp: 0,
      timestamp: 0,
    },
    _rcCall: {
      sessions: [mockSession],
    },
    _updateActiveSessions: ActiveCallControl.prototype._updateActiveSessions,
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
