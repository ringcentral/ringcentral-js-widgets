import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
} from '@ringcentral-integration/test-utils';

import { ActiveCallControl } from '../../modules/ActiveCallControlV2';

const mockSessionData = {
  id: 'testId',
  extensionId: 'testExtensionId',
  accountId: 'testAccountId',
  parties: [] as [],
};

const mockSession = {
  data: mockSessionData,
};

const getMockModule = () => ({
  state: {},
  _dispatch: () => {},
  sessions: [] as [],
  activeSessionId: null as string,
  busyTimestamp: 0,
  timestamp: 0,
  _rcCall: {
    _callControl: {
      sessions: [mockSession],
    },
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
            expect(activeCallControl._initialValue.sessions.length).toBe(0);
            expect(activeCallControl._initialValue.timestamp).toBe(0);
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
            expect(context.mockModule.sessions).toEqual([mockSessionData]);
            expect(context.mockModule.timestamp).toEqual(1234567);
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
            expect(activeCallControl._initialValue.busyTimestamp).toBe(0);
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
            expect(context.mockModule.busyTimestamp).toEqual(12345678);
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
            expect(context.mockModule.busyTimestamp).toEqual(0);
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
            expect(activeCallControl._initialValue.activeSessionId).toBe(null);
          }}
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
            expect(context.mockModule.activeSessionId).toEqual('123');
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
            expect(context.mockModule.activeSessionId).toEqual(null);
          }}
        />
      </Scenario>
    );
  }
}
