import {
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { CallLog, CallLogData } from '../../modules/CallLogV2';
import { mockModuleGenerator } from '../lib/mockModule';

const getMockModule = () =>
  mockModuleGenerator({
    data: {
      list: [],
      map: {},
      token: null,
      timestamp: null,
    } as CallLogData,
  });

@autorun(test)
@title('CallLog Module "resetData" action')
export class ResetData extends Step {
  run() {
    return (
      <Scenario desc="CallLog Module 'resetData' action">
        <Given
          desc="Create an CallLog instance with default value"
          action={(_: any, context: any) => {
            const instance = new CallLog({} as any);
            expect(instance.data).toEqual({
              list: [],
              map: {},
              token: null,
              timestamp: null,
            });
            context.instance = instance;
          }}
        />
        <When
          desc="Call Contacts 'resetData' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance.resetData.call(context.mockModule);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.data).toEqual({
              list: [],
              map: {},
              token: null,
              timestamp: null,
            });
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('CallLog Module "clearToken" action')
export class ClearToken extends Step {
  run() {
    return (
      <Scenario desc="CallLog Module 'clearToken' action">
        <Given
          desc="Create an CallLog instance with default value"
          action={(_: any, context: any) => {
            const instance = new CallLog({} as any);
            expect(instance.data).toEqual({
              list: [],
              map: {},
              token: null,
              timestamp: null,
            });
            context.instance = instance;
          }}
        />
        <When
          desc="Call Contacts 'clearToken' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.mockModule.data = {
              list: [{}],
              token: 'mockToken',
              timestamp: 0,
            };
            context.instance.clearToken.call(context.mockModule);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.data).toEqual({
              list: [{}],
              token: null,
              timestamp: null,
            });
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('CallLog Module "filterExpiredCalls" action')
export class FilterExpiredCalls extends Step {
  run() {
    return (
      <Scenario desc="CallLog Module 'filterExpiredCalls' action">
        <Given
          desc="Create an CallLog instance with default value"
          action={(_: any, context: any) => {
            const instance = new CallLog({} as any);
            expect(instance.data).toEqual({
              list: [],
              map: {},
              token: null,
              timestamp: null,
            });
            context.instance = instance;
          }}
        />
        <When
          desc="Call Contacts 'filterExpiredCalls' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.mockCalls = [
              {
                id: '1',
                startTime: 0,
              },
              {
                id: '2',
                startTime: Date.now(),
              },
            ];
            context.mockModule.data = {
              list: context.mockCalls.map((item: { id: string }) => item.id),
              map: context.mockCalls.reduce(
                (map: Record<string, any>, item: any) =>
                  Object.assign(map, { [item.id]: item }),
                {},
              ),
              token: 'mockToken',
              timestamp: 0,
            };
            context.instance.filterExpiredCalls.call(context.mockModule, 7);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.data).toEqual({
              list: [context.mockCalls[1].id],
              map: {
                [context.mockCalls[1].id]: context.mockCalls[1],
              },
              token: 'mockToken',
              timestamp: 0,
            });
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('CallLog Module "syncSuccess" action')
export class SyncSuccess extends Step {
  run() {
    return (
      <Scenario desc="CallLog Module 'syncSuccess' action">
        <Given
          desc="Create an CallLog instance with default value"
          action={(_: any, context: any) => {
            const instance = new CallLog({} as any);
            expect(instance.data).toEqual({
              list: [],
              map: {},
              token: null,
              timestamp: null,
            });
            context.instance = instance;
          }}
        />
        <When
          desc="Call Contacts 'syncSuccess' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.mockRecords = [
              {
                id: '1',
                startTime: 0,
              },
              {
                id: '3',
                startTime: Date.now(),
              },
            ];
            context.mockSupplementRecords = [
              {
                id: '2',
                startTime: Date.now(),
                result: 'Received',
              },
              {
                id: '4',
                startTime: Date.now(),
              },
              {
                id: '5',
                startTime: 0,
              },
            ];
            context.mockModule.data = {
              list: ['0', '2'],
              map: {
                '0': {
                  id: '0',
                  startTime: 0,
                },
                '2': {
                  id: '2',
                  startTime: Date.now(),
                  result: 'Call connected',
                },
              },
              token: 'mockToken',
              timestamp: 0,
            };
            context.instance.syncSuccess.call(context.mockModule, {
              timestamp: 1,
              syncToken: 'mockToken1',
              records: context.mockRecords,
              supplementRecords: context.mockSupplementRecords,
              daySpan: 7,
            });
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.data).toEqual({
              list: [
                context.mockSupplementRecords[0].id,
                context.mockRecords[1].id,
                context.mockSupplementRecords[1].id,
              ],
              map: {
                [context.mockSupplementRecords[0].id]:
                  context.mockSupplementRecords[0],
                [context.mockRecords[1].id]: context.mockRecords[1],
                [context.mockSupplementRecords[1].id]:
                  context.mockSupplementRecords[1],
              },
              timestamp: 1,
              token: 'mockToken1',
            });
          }}
        />
      </Scenario>
    );
  }
}
