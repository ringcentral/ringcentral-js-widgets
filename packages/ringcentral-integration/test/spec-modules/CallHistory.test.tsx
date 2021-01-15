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

import {
  CallHistory,
  EndedCall,
  HistoryCall,
} from '../../modules/CallHistoryV2';

const getMockModule = () => ({
  endedCalls: [] as EndedCall[],
  searchInput: '',
  filteredCalls: [] as HistoryCall[],
  state: {},
  _dispatch: () => {},
  parentModule: {},
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
            expect(instance._initialValue.endedCalls).toEqual([]);
            expect(instance._initialValue.searchInput).toBe('');
            expect(instance._initialValue.filteredCalls).toEqual([]);
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
            expect(instance._initialValue.endedCalls).toEqual([]);
            expect(instance._initialValue.searchInput).toBe('');
            expect(instance._initialValue.filteredCalls).toEqual([]);
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
            expect(instance._initialValue.endedCalls).toEqual([]);
            expect(instance._initialValue.searchInput).toBe('');
            expect(instance._initialValue.filteredCalls).toEqual([]);
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
            expect(instance._initialValue.endedCalls).toEqual([]);
            expect(instance._initialValue.searchInput).toBe('');
            expect(instance._initialValue.filteredCalls).toEqual([]);
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
