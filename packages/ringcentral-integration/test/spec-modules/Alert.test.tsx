import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
  examples,
} from '@ringcentral-integration/test-utils';

import { Alert, AlertItem, AlertOptions } from '../../modules/AlertV2';
import { mockModuleGenerator } from '../lib/mockModule';

const getMockModule = (instance: Alert) =>
  mockModuleGenerator(instance, {
    messages: [
      {
        id: '3',
        message: 'test',
        ttl: 1000,
        timestamp: Date.now(),
        level: 'info',
      },
    ] as AlertItem[],
  });

@autorun(test)
@title('Check alert state with allowDuplicates: ${allowDuplicates}')
export class CheckAlertAllowDuplicates extends Step {
  @examples(`
    | allowDuplicates | length |
    | true            | 2      |
    | false           | 1      |
  `)
  run() {
    return (
      <Scenario desc="Check alert state with allowDuplicates">
        <Given
          desc="Create an Alert instance with default value"
          action={(_: any, context: any) => {
            const alert = new Alert({
              alertOptions: {} as AlertOptions,
            } as any);
            expect((alert as any)._deps.alertOptions.ttl).toBe(5000);
            expect(alert.messages).toEqual([]);
            context.instance = getMockModule(
              new Alert({
                alertOptions: { ttl: 6000 } as AlertOptions,
              } as any),
            );
            expect((context.instance as any)._deps.alertOptions.ttl).toBe(6000);
          }}
        />
        <When
          desc="Call '_alert' for changing 'messages'"
          action={(_: any, context: any) => {
            context.instance._alert({
              allowDuplicates: context.example.allowDuplicates,
              id: '3',
              message: 'test',
              ttl: 1000,
              timestamp: Date.now(),
              level: 'info',
            });
          }}
        />
        <Then
          desc="check 'messages' should be expected"
          action={(_: any, context: any) => {
            expect(context.instance.messages.map(({ id }: any) => id)).toEqual(
              Array(context.example.length).fill('3'),
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Check alert state with other action')
export class CheckAlertState extends Step {
  run() {
    return (
      <Scenario desc="Check alert state">
        <When
          desc="Call 'update' for changing 'messages'"
          action={(_: any, context: any) => {
            context.instance = getMockModule(
              new Alert({
                alertOptions: {} as AlertOptions,
              } as any),
            );
            expect(context.instance.messages[0].id).toBe('3');
            expect(context.instance.messages[0].message).toBe('test');
            expect(context.instance.messages[0].loading).toBeUndefined();
            expect(context.instance.messages[0].action).toBeUndefined();
            context.instance.update('3', {
              allowDuplicates: context.example.allowDuplicates,
              message: 'test1',
              loading: true,
              action: 'action',
            });
          }}
        />
        <Then
          desc="check 'messages' should be expected"
          action={(_: any, context: any) => {
            expect(context.instance.messages[0].message).toBe('test1');
            expect(context.instance.messages[0].loading).toBe(true);
            expect(context.instance.messages[0].action).toBe('action');
          }}
        />
        <When
          desc="Call 'dismiss' with a string for changing 'messages'"
          action={(_: any, context: any) => {
            context.instance.dismiss('3');
          }}
        />
        <Then
          desc="check 'messages' should be expected"
          action={(_: any, context: any) => {
            expect(context.instance.messages.length).toBe(0);
          }}
        />
        <When
          desc="Call 'dismiss' with an array for changing 'messages'"
          action={(_: any, context: any) => {
            context.instance = getMockModule(
              new Alert({
                alertOptions: {} as AlertOptions,
              } as any),
            );
            context.instance.dismiss(['3']);
          }}
        />
        <Then
          desc="check 'messages' should be expected"
          action={(_: any, context: any) => {
            expect(context.instance.messages.length).toBe(0);
          }}
        />
        <When
          desc="Call 'dismissAll' with an array for changing 'messages'"
          action={(_: any, context: any) => {
            context.instance = getMockModule(
              new Alert({
                alertOptions: {} as AlertOptions,
              } as any),
            );
            context.instance._alert({
              allowDuplicates: true,
              id: '3',
              message: 'test',
              ttl: 1000,
              timestamp: Date.now(),
              level: 'info',
            });
            expect(context.instance.messages.length).toBe(2);
            context.instance.dismissAll();
          }}
        />
        <Then
          desc="check 'messages' should be expected"
          action={(_: any, context: any) => {
            expect(context.instance.messages.length).toBe(0);
          }}
        />
      </Scenario>
    );
  }
}
