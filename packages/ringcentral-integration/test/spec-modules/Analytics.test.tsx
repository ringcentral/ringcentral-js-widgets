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

import { Analytics } from '../../modules/AnalyticsV2';

const extendedProps = {
  'Extended Props Name': 'extendedPropsValue',
};

@autorun(test)
@title('should add extend track props after call addEventsExtendedProps')
export class CheckAddExtendsProps extends Step {
  run() {
    return (
      <Scenario desc="Check add props method addEventsExtendedProps">
        <Given
          desc="Create an Analytics instance"
          action={(_: any, context: any) => {
            const instance = new Analytics({
              analyticsOptions: {},
              auth: {},
              brand: {},
            } as any);
            context.instance = instance;
          }}
        />
        <When
          desc="Call 'addEventsExtendedProps' for add props"
          action={(_: any, context: any) => {
            context.instance.addEventsExtendedProps({
              events: [
                'callAttempt',
                'callAttemptWebRTC',
                'callInboundCallConnected',
              ],
              extendedProps,
            });
          }}
        />
        <Then
          desc="check extendedProps should be expected"
          action={(_: any, context: any) => {
            expect(context.instance.extendedProps.get('callAttempt')).toEqual(
              extendedProps,
            );
            expect(
              context.instance.extendedProps.get('callAttemptWebRTC'),
            ).toEqual(extendedProps);
            expect(
              context.instance.extendedProps.get('callInboundCallConnected'),
            ).toEqual(extendedProps);
            expect(
              context.instance.extendedProps.get('otherNotDefinedKey'),
            ).not.toBeDefined();
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title(
  'should not add extend track props after call addEventsExtendedProps with error params',
)
export class CheckAddExtendsErrorScenarios extends Step {
  run() {
    return (
      <Scenario desc="Check add props method addEventsExtendedProps">
        <Given
          desc="Create an Analytics instance"
          action={(_: any, context: any) => {
            const instance = new Analytics({
              analyticsOptions: {},
              auth: {},
              brand: {},
            } as any);
            context.instance = instance;
          }}
        />
        <When
          desc="Call 'addEventsExtendedProps' for add props with error params"
          action={(_: any, context: any) => {
            context.instance.addEventsExtendedProps({
              events: [
                'callAttempt',
                'callAttemptWebRTC',
                'callInboundCallConnected',
              ],
            });
          }}
        />
        <Then
          desc="check extendedProps should be expected"
          action={(_: any, context: any) => {
            expect(context.instance.extendedProps.size).toBe(0);
          }}
        />
        <When
          desc="Call 'addEventsExtendedProps' for add props with error params"
          action={(_: any, context: any) => {
            context.instance.addEventsExtendedProps({
              extendedProps,
            });
            context.instance.addEventsExtendedProps({
              events: [],
              extendedProps,
            });
          }}
        />
        <Then
          desc="check extendedProps should be expected"
          action={(_: any, context: any) => {
            expect(context.instance.extendedProps.size).toBe(0);
          }}
        />
      </Scenario>
    );
  }
}
