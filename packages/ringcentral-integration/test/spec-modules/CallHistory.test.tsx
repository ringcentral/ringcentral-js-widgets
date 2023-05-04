import {
  autorun,
  Given,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { Call } from '../../interfaces/Call.interface';
import { CallHistory, HistoryCall } from '../../modules/CallHistory';
import { mockModuleGenerator } from '../lib/mockModule';

const getMockModule = () =>
  mockModuleGenerator({
    endedCalls: [] as Call[],
    searchInput: '',
    filteredCalls: [] as HistoryCall[],
  });

@autorun(test)
@title('CallHistory Module "filterSuccess" action')
export class FilterSuccess extends Step {
  run() {
    return (
      <Scenario desc="CallHistory Module 'updatePageStatus' action">
        <Given
          desc="Create an CallHistory instance with default value"
          action={(_: any, context: any) => {
            const instance = new CallHistory({} as any);
            expect(instance.endedCalls).toEqual([]);
            expect(instance.searchInput).toBe('');
            expect(instance.filteredCalls).toEqual([]);
            context.instance = instance;
          }}
        />
        <When
          desc="Call CallHistory 'filterSuccess' action"
          action={(_: any, context: any) => {
            context.calls = [{}, {}];
            context.mockModule = getMockModule();
            context.instance.filterSuccess.call(
              context.mockModule,
              context.calls,
            );
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.filteredCalls).toEqual(context.calls);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('CallHistory Module "setSearchInput" action')
export class SetSearchInput extends Step {
  run() {
    return (
      <Scenario desc="CallHistory Module 'setSearchInput' action">
        <Given
          desc="Create an CallHistory instance with default value"
          action={(_: any, context: any) => {
            const instance = new CallHistory({} as any);
            expect(instance.endedCalls).toEqual([]);
            expect(instance.searchInput).toBe('');
            expect(instance.filteredCalls).toEqual([]);
            context.instance = instance;
          }}
        />
        <When
          desc="Call CallHistory 'setSearchInput' action"
          action={(_: any, context: any) => {
            context.input = 'test';
            context.mockModule = getMockModule();
            context.instance.setSearchInput.call(
              context.mockModule,
              context.input,
            );
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.searchInput).toBe(context.input);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('CallHistory Module "setEndedCalls" action')
export class SetEndedCalls extends Step {
  run() {
    return (
      <Scenario desc="CallHistory Module 'setEndedCalls' action">
        <Given
          desc="Create an CallHistory instance with default value"
          action={(_: any, context: any) => {
            const instance = new CallHistory({} as any);
            expect(instance.endedCalls).toEqual([]);
            expect(instance.searchInput).toBe('');
            expect(instance.filteredCalls).toEqual([]);
            context.instance = instance;
          }}
        />
        <When
          desc="Call CallHistory 'setEndedCalls' action"
          action={(_: any, context: any) => {
            const now = Date.now();
            context.calls = [
              { telephonySessionId: '2', startTime: now - 10000 },
              { telephonySessionId: '1', startTime: now - 3000 },
            ];
            context.mockModule = getMockModule();
            context.mockModule.endedCalls = [
              { telephonySessionId: '0', startTime: 0 },
              { telephonySessionId: '1', startTime: 0 },
            ];
            context.instance.setEndedCalls.call(
              context.mockModule,
              context.calls,
              now,
            );
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.endedCalls).toEqual([
              { telephonySessionId: '0', startTime: 0 },
              {
                ...context.calls[1],
                duration: 3,
              },
              {
                ...context.calls[0],
                duration: 10,
              },
            ]);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('CallHistory Module "removeEndedCalls" action')
export class RemoveEndedCalls extends Step {
  run() {
    return (
      <Scenario desc="CallHistory Module 'updatePageStatus' action">
        <Given
          desc="Create an CallHistory instance with default value"
          action={(_: any, context: any) => {
            const instance = new CallHistory({} as any);
            expect(instance.endedCalls).toEqual([]);
            expect(instance.searchInput).toBe('');
            expect(instance.filteredCalls).toEqual([]);
            context.instance = instance;
          }}
        />
        <When
          desc="Call CallHistory 'removeEndedCalls' action"
          action={(_: any, context: any) => {
            const now = Date.now();
            context.calls = [
              { telephonySessionId: '1', startTime: now - 3000 },
            ];
            context.mockModule = getMockModule();
            context.mockModule.endedCalls = [
              { telephonySessionId: '0', startTime: 0 },
              { telephonySessionId: '1', startTime: now - 100000 },
              { telephonySessionId: '2', startTime: now - 10000 },
            ];
            context.expectedList = [
              { telephonySessionId: '2', startTime: now - 10000 },
            ];
            context.instance.removeEndedCalls.call(
              context.mockModule,
              context.calls,
            );
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.endedCalls).toEqual(context.expectedList);
          }}
        />
      </Scenario>
    );
  }
}
