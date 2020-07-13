import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
  examples,
} from 'crius-test';

import { Call, callStatus, Recipient } from '../../modules/CallV2';

const getMockModule = () => ({
  lastPhoneNumber: null as string,
  lastRecipient: null as Recipient,
  callStatus: callStatus.idle,
  state: {},
  _dispatch: () => {},
});

@autorun(test)
@title('Call Module "connect" action with isConference: ${isConference}')
export class CallConnect extends Step {
  @examples(`
    | isConference |
    | true         |
    | false        |
  `)
  run() {
    return (
      <Scenario desc="Access 'lastRecipient' and 'lastRecipient'">
        <Given
          desc="Create a 'Call' instance and initial state should be null"
          action={() => {
            const call = new Call({} as any);
            expect(call._initialValue.lastPhoneNumber).toBeNull();
            expect(call._initialValue.lastRecipient).toBeNull();
          }}
        />
        <When
          desc="Execute 'connect' method with mockModule"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.params = {
              phoneNumber: '123',
              recipient: {},
              isConference: context.example.isConference,
            };
            Call.prototype.connect.call(context.mockModule, context.params);
          }}
        />
        <Then
          desc="The mockModule 'lastPhoneNumber' and 'lastRecipient' should be the expected values"
          action={(_: any, context: any) => {
            if (context.example.isConference) {
              expect(context.mockModule.lastPhoneNumber).toBeNull();
              expect(context.mockModule.lastRecipient).toBeNull();
            } else {
              expect(context.mockModule.lastPhoneNumber).toEqual(
                context.params.phoneNumber,
              );
              expect(context.mockModule.lastRecipient).toEqual(
                context.params.recipient,
              );
            }
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Call Module "callStatus" state with connect action: ${connectAction}')
export class CallStatus extends Step {
  @examples(`
    | connectAction       |
    | 'connectSuccess'    |
    | 'connectError'      |
  `)
  run() {
    return (
      <Scenario desc="Access 'callStatus'">
        <Given
          desc="Create a 'Call' instance and initial state should be 'idle'"
          action={() => {
            const call = new Call({} as any);
            expect(call._initialValue.callStatus).toEqual(callStatus.idle);
          }}
        />
        <When
          desc="Execute 'connect' and 'callStatus' should be connecting status"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.params = {
              phoneNumber: '123',
              recipient: {},
              isConference: true,
            };
            Call.prototype.connect.call(context.mockModule, context.params);
            expect(context.mockModule.callStatus).toEqual(
              callStatus.connecting,
            );
          }}
        />
        <Then
          desc="Execute ${connectAction} and 'callStatus' should be idle status"
          action={(_: any, context: any) => {
            (Call.prototype as any)[context.example.connectAction].call(
              context.mockModule,
            );
            expect(context.mockModule.callStatus).toEqual(callStatus.idle);
          }}
        />
      </Scenario>
    );
  }
}
