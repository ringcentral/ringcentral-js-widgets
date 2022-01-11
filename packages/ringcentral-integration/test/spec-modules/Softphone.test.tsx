import {
  autorun,
  examples,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { Softphone, softphoneStatus } from '../../modules/Softphone';
import { mockModuleGenerator } from '../lib/mockModule';

const getMockModule = () =>
  mockModuleGenerator({
    connectingPhoneNumber: null as string,
    softphoneStatus: softphoneStatus.idle,
  });

@autorun(test)
@title(
  'Softphone Module "startToConnect" action with phoneNumber: ${phoneNumber}',
)
class StartToConnect extends Step {
  @examples(`
    | phoneNumber  |
    | '1650126789' |
  `)
  run() {
    return (
      <Scenario desc="Softphone Module 'startToConnect' action">
        <Given
          desc="Create an Softphone instance with default value"
          action={(_: any, context: any) => {
            context.instance = new Softphone({});
            expect(context.instance._extensionMode).toBe(false);
          }}
        />
        <When
          desc="Call 'startToConnect' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance.startToConnect.call(
              context.mockModule,
              context.example.phoneNumber,
            );
          }}
        />
        <Then
          desc="check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.connectingPhoneNumber).toBe(
              context.example.phoneNumber,
            );
            expect(context.mockModule.softphoneStatus).toBe(
              softphoneStatus.connecting,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Softphone Module "connectComplete" action')
class ConnectComplete extends Step {
  run() {
    return (
      <Scenario desc="Softphone Module 'connectComplete' action">
        <Given
          desc="Create an Softphone instance with default value"
          action={(_: any, context: any) => {
            context.instance = new Softphone({});
          }}
        />
        <When
          desc="Call 'connectComplete' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance.connectComplete.call(context.mockModule);
          }}
        />
        <Then
          desc="check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.connectingPhoneNumber).toBe(null);
            expect(context.mockModule.softphoneStatus).toBe(
              softphoneStatus.idle,
            );
          }}
        />
      </Scenario>
    );
  }
}
