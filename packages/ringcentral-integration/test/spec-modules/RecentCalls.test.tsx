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

import { HistoryCall } from '../../modules/CallHistoryV2';
import { callStatus, RecentCalls } from '../../modules/RecentCallsV2';
import { mockModuleGenerator } from '../lib/mockModule';

const getMockModule = () =>
  mockModuleGenerator({
    calls: {} as Record<string, HistoryCall[]>,
    callStatus: null as string,
  });

@autorun(test)
@title('RecentCalls Module "initLoad" action')
export class InitLoad extends Step {
  run() {
    return (
      <Scenario desc="RecentCalls Module 'initLoad' action">
        <Given
          desc="Create an RecentCalls instance with default value"
          action={(_: any, context: any) => {
            const instance = new RecentCalls({} as any);
            expect(instance.calls).toEqual({});
            expect(instance.callStatus).toBeNull();
            context.instance = instance;
          }}
        />
        <When
          desc="Call RecentCalls 'initLoad' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance.initLoad.call(context.mockModule);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.callStatus).toBe(callStatus.loading);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('RecentCalls Module "loadSuccess" action')
export class LoadSuccess extends Step {
  @examples(`
    | sessionId |
    | null      |
    | '1'       |
  `)
  run() {
    return (
      <Scenario desc="RecentCalls Module 'loadSuccess' action">
        <Given
          desc="Create an RecentCalls instance with default value"
          action={(_: any, context: any) => {
            const instance = new RecentCalls({} as any);
            expect(instance.calls).toEqual({});
            expect(instance.callStatus).toBeNull();
            context.instance = instance;
          }}
        />
        <When
          desc="Call RecentCalls 'loadSuccess' action"
          action={(_: any, context: any) => {
            context.contact = {
              id: 'contactId1',
            };
            context.calls = [{}, {}];
            context.mockModule = getMockModule();
            context.instance.loadSuccess.call(context.mockModule, {
              calls: context.calls,
              contact: context.contact,
              sessionId: context.example.sessionId,
            });
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.callStatus).toBe(callStatus.loaded);
            const id = context.example.sessionId
              ? `${context.contact.id}-${context.example.sessionId}`
              : context.contact.id;
            expect(context.mockModule.calls).toEqual({ [id]: context.calls });
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('RecentCalls Module "cleanUpCalls" action')
export class CleanUpCalls extends Step {
  @examples(`
    | sessionId |
    | null      |
    | '1'       |
  `)
  run() {
    return (
      <Scenario desc="RecentCalls Module 'cleanUpCalls' action">
        <Given
          desc="Create an RecentCalls instance with default value"
          action={(_: any, context: any) => {
            const instance = new RecentCalls({} as any);
            expect(instance.calls).toEqual({});
            expect(instance.callStatus).toBeNull();
            context.instance = instance;
          }}
        />
        <When
          desc="Call RecentCalls 'cleanUpCalls' action"
          action={(_: any, context: any) => {
            context.contact = {
              id: '1',
            };
            context.mockModule = getMockModule();
            context.mockModule.calls = {
              '1-1': [{}],
              '1': [{}],
            };
            context.instance.cleanUpCalls.call(context.mockModule, {
              contact: context.contact,
              sessionId: context.example.sessionId,
            });
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.callStatus).toBe(callStatus.loaded);
            const expectedValue = context.example.sessionId
              ? {
                  '1': [{}],
                }
              : {
                  '1-1': [{}],
                };
            expect(context.mockModule.calls).toEqual(expectedValue);
          }}
        />
      </Scenario>
    );
  }
}
