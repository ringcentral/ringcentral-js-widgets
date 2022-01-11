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
  ContactSearch,
  contactSearchStatus,
  DefaultMinimalSearchLength,
  DefaultSearchingState,
} from '../../modules/ContactSearchV2';
import { mockModuleGenerator } from '../lib/mockModule';

const getMockModule = ({
  searching = DefaultSearchingState,
  contactSearch = {},
} = {}) =>
  mockModuleGenerator({
    contactSearch,
    searchStatus: contactSearchStatus.idle,
    searching,
  });

@autorun(test)
@title('ContactSearch Module "setSearchStatus" action')
export class SetSearchStatus extends Step {
  run() {
    return (
      <Scenario desc="ContactSearch Module 'setSearchStatus' action">
        <Given
          desc="Create a ContactSearch instance and initial state should be expected"
          action={() => {
            const contactSearch = new ContactSearch({} as any);
            expect(contactSearch.contactSearch).toEqual({});
            expect(contactSearch.searchStatus).toBe(contactSearchStatus.idle);
            expect(contactSearch.searching).toEqual(DefaultSearchingState);
            expect((contactSearch as any)._ttl).toBe(5 * 60 * 1000);
            expect((contactSearch as any)._minimalSearchLength).toBe(
              DefaultMinimalSearchLength,
            );
          }}
        />
        <When
          desc="Call ContactSearch 'setSearchStatus' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            ContactSearch.prototype.setSearchStatus.call(
              context.mockModule,
              contactSearchStatus.searching,
            );
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.searchStatus).toBe(
              contactSearchStatus.searching,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ContactSearch Module "setPrepareSearch" action')
export class SetPrepareSearch extends Step {
  run() {
    return (
      <Scenario desc="ContactSearch Module 'setPrepareSearch' action">
        <Given
          desc="Create a ContactSearch instance and initial state should be expected"
          action={() => {
            const contactSearch = new ContactSearch({} as any);
            expect(contactSearch.contactSearch).toEqual({});
            expect(contactSearch.searchStatus).toBe(contactSearchStatus.idle);
            expect(contactSearch.searching).toEqual(DefaultSearchingState);
            expect((contactSearch as any)._ttl).toBe(5 * 60 * 1000);
            expect((contactSearch as any)._minimalSearchLength).toBe(
              DefaultMinimalSearchLength,
            );
          }}
        />
        <When
          desc="Call ContactSearch 'setPrepareSearch' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            ContactSearch.prototype.setPrepareSearch.call(context.mockModule);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.searchStatus).toBe(
              contactSearchStatus.idle,
            );
            expect(context.mockModule.searching).toBe(DefaultSearchingState);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ContactSearch Module "setSearchSuccess" action')
export class SetSearchSuccess extends Step {
  @examples([
    {
      searching: {
        searchOnSources: ['a'],
        searchString: '',
        result: [{ id: '1', name: 'test', phoneNumber: '123' }],
      },
      input: {
        searchOnSources: ['a'],
        searchString: '12',
        entities: [{ id: '2', name: 'test', phoneNumber: '123' }],
      },
      state: {
        searchOnSources: ['a'],
        searchString: '12',
        result: [{ id: '2', name: 'test', phoneNumber: '123' }],
      },
    },
    {
      searching: {
        searchOnSources: ['b'],
        searchString: '12',
        result: [{ id: '1', name: 'test', phoneNumber: '123' }],
      },
      input: {
        searchOnSources: ['a'],
        searchString: '12',
        entities: [{ id: '2', name: 'test', phoneNumber: '123' }],
      },
      state: {
        searchOnSources: ['a'],
        searchString: '12',
        result: [{ id: '2', name: 'test', phoneNumber: '123' }],
      },
    },
    {
      searching: {
        searchOnSources: ['b', 'a'],
        searchString: '12',
        result: [{ id: '1', name: 'test', phoneNumber: '123' }],
      },
      input: {
        searchOnSources: ['a', 'b'],
        searchString: '12',
        entities: [
          { id: '1', name: 'test', phoneNumber: '1234' },
          { id: '2', name: 'test', phoneNumber: '123' },
        ],
      },
      state: {
        searchOnSources: ['b', 'a'],
        searchString: '12',
        result: [
          { id: '1', name: 'test', phoneNumber: '123' },
          { id: '2', name: 'test', phoneNumber: '123' },
        ],
      },
    },
    {
      searching: {
        searchOnSources: ['b', 'a'],
        searchString: '12',
        result: [{ id: '1', name: 'test', phoneNumber: '123' }],
      },
      input: {
        searchOnSources: ['a', 'b'],
        searchString: '123',
        entities: [
          { id: '1', name: 'test', phoneNumber: '1234' },
          { id: '2', name: 'test', phoneNumber: '123' },
        ],
      },
      state: {
        searchOnSources: ['a', 'b'],
        searchString: '123',
        result: [
          { id: '1', name: 'test', phoneNumber: '1234' },
          { id: '2', name: 'test', phoneNumber: '123' },
        ],
      },
    },
  ])
  run() {
    return (
      <Scenario desc="ContactSearch Module 'setSearchSuccess' action">
        <Given
          desc="Create a ContactSearch instance and initial state should be expected"
          action={() => {
            const contactSearch = new ContactSearch({} as any);
            expect(contactSearch.contactSearch).toEqual({});
            expect(contactSearch.searchStatus).toBe(contactSearchStatus.idle);
            expect(contactSearch.searching).toEqual(DefaultSearchingState);
            expect((contactSearch as any)._ttl).toBe(5 * 60 * 1000);
            expect((contactSearch as any)._minimalSearchLength).toBe(
              DefaultMinimalSearchLength,
            );
          }}
        />
        <When
          desc="Call ContactSearch 'setSearchSuccess' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule({
              searching: context.example.searching,
            });
            ContactSearch.prototype.setSearchSuccess.call(
              context.mockModule,
              context.example.input,
            );
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.searching).toEqual(context.example.state);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ContactSearch Module "setContactSearch" action')
export class SetContactSearch extends Step {
  @examples([
    {
      contactSearch: {
        'a-12': {
          entities: [{ id: '2', name: 'test', phoneNumber: '123' }],
          timestamp: Date.now(),
        },
      },
      input: {
        sourceName: 'a',
        searchString: '123',
        entities: [{ id: '2', name: 'test', phoneNumber: '123' }],
        ttl: 5 * 60 * 1000,
      },
      state: {
        'a-12': {
          entities: [{ id: '2', name: 'test', phoneNumber: '123' }],
        },
        'a-123': {
          entities: [{ id: '2', name: 'test', phoneNumber: '123' }],
        },
      },
    },
    {
      contactSearch: {
        'a-12': {
          entities: [{ id: '2', name: 'test', phoneNumber: '123' }],
          timestamp: Date.now(),
        },
        'a-1': {
          entities: [{ id: '1', name: 'test', phoneNumber: '123' }],
          timestamp: 0,
        },
      },
      input: {
        sourceName: 'a',
        searchString: '123',
        entities: [{ id: '2', name: 'test', phoneNumber: '123' }],
        ttl: 5 * 60 * 1000,
      },
      state: {
        'a-12': {
          entities: [{ id: '2', name: 'test', phoneNumber: '123' }],
        },
        'a-123': {
          entities: [{ id: '2', name: 'test', phoneNumber: '123' }],
        },
      },
    },
  ])
  run() {
    return (
      <Scenario desc="ContactSearch Module 'setContactSearch' action">
        <Given
          desc="Create a ContactSearch instance and initial state should be expected"
          action={() => {
            const contactSearch = new ContactSearch({} as any);
            expect(contactSearch.contactSearch).toEqual({});
            expect(contactSearch.searchStatus).toBe(contactSearchStatus.idle);
            expect(contactSearch.searching).toEqual(DefaultSearchingState);
            expect((contactSearch as any)._ttl).toBe(5 * 60 * 1000);
            expect((contactSearch as any)._minimalSearchLength).toBe(
              DefaultMinimalSearchLength,
            );
          }}
        />
        <When
          desc="Call ContactSearch 'setContactSearch' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule({
              contactSearch: context.example.contactSearch,
            });
            ContactSearch.prototype.setContactSearch.call(
              context.mockModule,
              context.example.input,
            );
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(Object.keys(context.mockModule.contactSearch)).toEqual(
              Object.keys(context.example.state),
            );
            expect(
              Object.values(context.mockModule.contactSearch).map(
                ({ entities }: any) => entities,
              ),
            ).toEqual(
              Object.values(context.example.state).map(
                ({ entities }: any) => entities,
              ),
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ContactSearch Module "cleanUp" action')
export class CleanUp extends Step {
  run() {
    return (
      <Scenario desc="ContactSearch Module 'cleanUp' action">
        <Given
          desc="Create a ContactSearch instance and initial state should be expected"
          action={() => {
            const contactSearch = new ContactSearch({} as any);
            expect(contactSearch.contactSearch).toEqual({});
            expect(contactSearch.searchStatus).toBe(contactSearchStatus.idle);
            expect(contactSearch.searching).toEqual(DefaultSearchingState);
            expect((contactSearch as any)._ttl).toBe(5 * 60 * 1000);
            expect((contactSearch as any)._minimalSearchLength).toBe(
              DefaultMinimalSearchLength,
            );
          }}
        />
        <When
          desc="Call ContactSearch 'cleanUp' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            ContactSearch.prototype.cleanUp.call(context.mockModule);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.contactSearch).toEqual({});
            expect(context.mockModule.searching).toEqual(DefaultSearchingState);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ContactSearch Module "resetContactSearch" action')
export class ResetContactSearch extends Step {
  run() {
    return (
      <Scenario desc="ContactSearch Module 'resetContactSearch' action">
        <Given
          desc="Create a ContactSearch instance and initial state should be expected"
          action={() => {
            const contactSearch = new ContactSearch({} as any);
            expect(contactSearch.contactSearch).toEqual({});
            expect(contactSearch.searchStatus).toBe(contactSearchStatus.idle);
            expect(contactSearch.searching).toEqual(DefaultSearchingState);
            expect((contactSearch as any)._ttl).toBe(5 * 60 * 1000);
            expect((contactSearch as any)._minimalSearchLength).toBe(
              DefaultMinimalSearchLength,
            );
          }}
        />
        <When
          desc="Call ContactSearch 'resetContactSearch' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            ContactSearch.prototype.resetContactSearch.call(context.mockModule);
          }}
        />
        <Then
          desc="Check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.contactSearch).toEqual({});
          }}
        />
      </Scenario>
    );
  }
}
