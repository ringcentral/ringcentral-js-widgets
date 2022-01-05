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

import {
  callingOptions,
  CallingSettings,
} from '../../modules/CallingSettingsV2';
import { mockModuleGenerator } from '../lib/mockModule';

const getMockModule = () =>
  mockModuleGenerator({
    data: {
      callWith: null as string,
      ringoutPrompt: true as boolean,
      myLocation: '' as string,
      timestamp: null as number,
      fromNumber: null as string,
    },
    setAcknowledgeJPMessage: CallingSettings.prototype.setAcknowledgeJPMessage,
  });

@autorun(test)
@title('Save call settings should workable')
export class SaveCallSettings extends Step {
  run() {
    return (
      <Scenario desc="Save call settings">
        <Given
          desc="Call settings should provide the default settings"
          action={() => {
            const instance = new CallingSettings({} as any);
            expect(instance.data.callWith).toBe(null);
            expect(instance.data.ringoutPrompt).toBe(true);
            expect(instance.data.myLocation).toBe('');
            expect(instance.data.timestamp).toBe(null);
          }}
        />
        <When
          desc="Execute 'setDataAction' method with mockModule"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.params = {
              callWith: callingOptions.softphone,
              ringoutPrompt: true,
              myLocation: '+10086',
              timestamp: Date.now(),
            };
            CallingSettings.prototype.setDataAction.call(
              context.mockModule,
              context.params,
            );
          }}
        />
        <Then
          desc="The mockModule 'callWith', 'ringoutPrompt','myLocation' and 'timestamp' should be the expected values"
          action={(_: any, context: any) => {
            expect(context.mockModule.data.callWith).toEqual(
              context.params.callWith,
            );
            expect(context.mockModule.data.ringoutPrompt).toEqual(
              context.params.ringoutPrompt,
            );
            expect(context.mockModule.data.myLocation).toEqual(
              context.params.myLocation,
            );
            expect(context.mockModule.data.timestamp).not.toBe(null);
          }}
        />
      </Scenario>
    );
  }
}
@autorun(test)
@title("From number state should be changed after trigger 'actionType'")
export class FromNumberState extends Step {
  @examples([
    { actionType: '_updateFromNumber' },
    { actionType: 'resetSuccess' },
  ])
  run() {
    return (
      <Scenario desc="From number state should be change after 'actionType' ">
        <Given
          desc="from number state should default to null"
          action={() => {
            const instance = new CallingSettings({} as any);
            expect(instance.data.fromNumber).toBe(null);
          }}
        />
        <When
          desc="${actionType} is triggered"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.params = {
              phoneNumber: '+10086',
            };
            (CallingSettings.prototype as any)[context.example.actionType].call(
              context.mockModule,
              context.params,
            );
          }}
        />
        <Then
          desc="From number should be the expected value"
          action={(_: any, context: any) => {
            if (context.example.actionType === 'resetSuccess') {
              expect(context.mockModule.data.fromNumber).toBe(null);
            } else {
              expect(context.mockModule.data.fromNumber).toBe(
                context.params.phoneNumber,
              );
            }
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Show call with Jupiter default to ON')
export class CallWithJupiterDefaultOn extends Step {
  @examples(`
    | showCallWithJupiter |
    | true                |
    | false               |
  `)
  run() {
    return (
      <Scenario desc="Call with Jupiter default to ON">
        <Given
          desc="User not pass the 'showCallWithJupiter' option"
          action={() => {
            const instance = new CallingSettings({} as any);
            expect(instance._showCallWithJupiter).toBe(true);
          }}
        />
        <When
          desc="create instance with option = ${showCallWithJupiter}"
          action={(_: any, context: any) => {
            context.instance = new CallingSettings({
              callingSettingsOptions: {
                showCallWithJupiter: context.example.showCallWithJupiter,
              },
            } as any);
          }}
        />
        <Then
          desc="'_showCallWithJupiter' should same with option ${showCallWithJupiter}"
          action={(_: any, context: any) => {
            expect(context.instance._showCallWithJupiter).toBe(
              context.example.showCallWithJupiter,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Emergency call available default to OFF')
export class EmergencyCallAvailable extends Step {
  @examples(`
    | emergencyCallAvailable |
    | true                   |
    | false                  |
  `)
  run() {
    return (
      <Scenario desc="Emergency call available default to OFF">
        <Given
          desc="User not pass the 'emergencyCallAvailable' option"
          action={() => {
            const instance = new CallingSettings({} as any);
            expect(instance._emergencyCallAvailable).toBe(false);
          }}
        />
        <When
          desc="create instance with option = ${emergencyCallAvailable}"
          action={(_: any, context: any) => {
            context.instance = new CallingSettings({
              callingSettingsOptions: {
                emergencyCallAvailable: context.example.emergencyCallAvailable,
              },
            } as any);
          }}
        />
        <Then
          desc="'_emergencyCallAvailable' should same with option ${emergencyCallAvailable} "
          action={(_: any, context: any) => {
            expect(context.instance._emergencyCallAvailable).toBe(
              context.example.emergencyCallAvailable,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Japan emergency notification structure')
export class JapanEmergencyNotification extends Step {
  run() {
    return (
      <Scenario desc="notification structure">
        <Given
          desc="Call settings should provide the default settings"
          action={(_: any, context: any) => {
            const instance = new CallingSettings({} as any);
            expect(instance.acknowledgeJPMessage).toBe(false);
          }}
        />
        <When
          desc="Execute '_verifyJPEmergency' method with mockModule"
          action={async (_: any, context: any) => {
            const mockFn = jest.fn();
            const mockModule = mockModuleGenerator({
              acknowledgeJPMessage: false,
              fromNumbers: [
                {
                  features: ['CallerId'],
                  uri: 'https://api-rcapps-xmnup.lab.nordigy.ru/restapi/v1.0/account/3762349004/phone-number/2286092004',
                  id: 2286092004,
                  phoneNumber: '+81330006572',
                  paymentType: 'Local',
                  location: 'Tokyo , Japan',
                  type: 'VoiceFax',
                  usageType: 'DirectNumber',
                  status: 'Normal',
                  country: {
                    uri: 'https://api-rcapps-xmnup.lab.nordigy.ru/restapi/v1.0/dictionary/country/112',
                    id: '112',
                    name: 'Japan',
                  },
                  primary: false,
                },
              ],
              _deps: {
                alert: {
                  warning: mockFn,
                },
              },
              setAcknowledgeJPMessage:
                CallingSettings.prototype.setAcknowledgeJPMessage,
            });
            context.mockFn = mockFn;
            context.mockModule = mockModule;
            await CallingSettings.prototype._verifyJPEmergency.call(mockModule);
          }}
        />
        <Then
          desc="check the alert params"
          action={(_: any, context: any) => {
            expect(context.mockFn).toBeCalledWith({
              message: 'callingSettingsMessages-disableEmergencyInJapan',
              ttl: 0,
            });
            expect(context.mockModule.acknowledgeJPMessage).toEqual(true);
          }}
        />
        <When
          desc="Trigger '_verifyJPEmergency' method with mockModule again eg(refresh page)"
          action={async (_: any, context: any) => {
            context.mockFn.mockClear();
            await CallingSettings.prototype._verifyJPEmergency.call(
              context.mockModule,
            );
          }}
        />
        <Then
          desc="alert should not be called again"
          action={(_: any, context: any) => {
            expect(context.mockFn).not.toBeCalledWith();
            expect(context.mockModule.acknowledgeJPMessage).toEqual(true);
          }}
        />
      </Scenario>
    );
  }
}
