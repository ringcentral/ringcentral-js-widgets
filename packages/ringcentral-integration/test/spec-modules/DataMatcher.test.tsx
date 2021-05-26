import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
} from '@ringcentral-integration/test-utils';
import { DataMatcher } from '../../lib/DataMatcherV2';
import { mockModuleGenerator } from '../lib/mockModule';

const getMockModule = () =>
  mockModuleGenerator({
    data: {},
    _lastCleanUp: 0,
    _ttl: 30 * 60 * 1000,
  });

@autorun(test)
@title('DataMatcher Module "insertMatchEntries" action')
export class InsertMatchEntries extends Step {
  run() {
    return (
      <Scenario desc="DataMatcher Module 'insertMatchEntries' action">
        <Given
          desc="Create a 'DataMatcher' instance and initial state should be null"
          action={(_: any, context: any) => {
            const dataMatcher = new DataMatcher({} as any, 'ContactMatcher');
            expect(dataMatcher.data).toEqual({});
            expect((dataMatcher as any)._ttl).toBe(30 * 60 * 1000);
            expect((dataMatcher as any)._noMatchTtl).toBe(30 * 1000);
          }}
        />
        <When
          desc="Execute 'insertMatchEntries' method with mockModule"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            DataMatcher.prototype.insertMatchEntries.call(context.mockModule, {
              name: 'rc',
              queries: ['6509988123'],
              data: {
                6509988123: [
                  {
                    id: '1',
                    type: 'contact',
                    phoneNumber: '6509988123',
                  },
                ],
              },
            });
          }}
        />
        <Then
          desc="The mockModule 'data' should be the expected values"
          action={(_: any, context: any) => {
            expect(Object.keys(context.mockModule.data)).toEqual([
              '6509988123',
            ]);
            expect(
              context.mockModule.data['6509988123'].rc._t > 0,
            ).toBeTruthy();
            expect(context.mockModule.data['6509988123'].rc.data).toEqual([
              {
                id: '1',
                type: 'contact',
                phoneNumber: '6509988123',
              },
            ]);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('DataMatcher Module "_cleanUp" action')
export class CleanUp extends Step {
  run() {
    return (
      <Scenario desc="DataMatcher Module '_cleanUp' action">
        <Given
          desc="Create a 'DataMatcher' instance and initial state should be null"
          action={(_: any, context: any) => {
            const dataMatcher = new DataMatcher({} as any, 'ContactMatcher');
            expect(dataMatcher.data).toEqual({});
          }}
        />
        <When
          desc="Execute '_cleanUp' method with mockModule"
          action={(_: any, context: any) => {
            context.mockModule = {
              ...getMockModule(),
              data: {
                6509988123: {
                  rc: {
                    _t: 2605855995251,
                    data: [
                      {
                        id: '1',
                        type: 'contact',
                        phoneNumber: '6509988123',
                      },
                    ],
                  },
                  sf: {
                    _t: 100,
                    data: [
                      {
                        id: '2',
                        type: 'account',
                        phoneNumber: '6509988123',
                      },
                    ],
                  },
                },
              },
            };
            DataMatcher.prototype._cleanUp.call(context.mockModule);
          }}
        />
        <Then
          desc="The mockModule 'data' should be the expected values"
          action={(_: any, context: any) => {
            expect(Object.keys(context.mockModule.data)).toEqual([
              '6509988123',
            ]);
            expect(Object.keys(context.mockModule.data['6509988123'])).toEqual([
              'rc',
            ]);
            expect(
              context.mockModule.data['6509988123'].rc._t > 0,
            ).toBeTruthy();
            expect(context.mockModule.data['6509988123'].rc.data).toEqual([
              {
                id: '1',
                type: 'contact',
                phoneNumber: '6509988123',
              },
            ]);
          }}
        />
      </Scenario>
    );
  }
}
