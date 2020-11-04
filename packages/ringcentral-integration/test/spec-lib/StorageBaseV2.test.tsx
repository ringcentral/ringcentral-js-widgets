import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  And,
  Step,
} from '@ringcentral-integration/test-utils';
import { Reducer } from 'redux';
import {
  getDataReducer,
  actionTypesBase as actionTypes,
} from '../../lib/StorageBaseV2';

@autorun(test)
@title('DataReducer::basic')
export class DataReducerBasic extends Step {
  run() {
    return (
      <Scenario desc="">
        <When
          desc="Basic DataReducer setup"
          action={(_: any, context: any) => {
            const foo: Reducer = (state = 0, { type }) => {
              if (type === 'counter') return state + 1;
              return state;
            };
            const bar: Reducer = (state = null, { type, value }) => {
              if (type === 'memorize') return value;
              return state;
            };
            const reducer = getDataReducer({
              types: actionTypes,
              reducers: {
                foo,
                bar,
              },
            });
            context.foo = foo;
            context.bar = bar;
            context.reducer = reducer;
            expect(typeof getDataReducer).toBe('function');
            expect(
              typeof getDataReducer({ types: actionTypes, reducers: {} }),
            ).toBe('function');
          }}
        />
        <Then
          desc="should have combined initial state of its reducers"
          action={async (_: any, { reducer, foo, bar }: any) => {
            expect(reducer(undefined, {})).toEqual({
              foo: foo(undefined, {}),
              bar: bar(undefined, {}),
            });
          }}
        />
        <And
          desc="should ignore unrecognized actions"
          action={async (_: any, { reducer, foo, bar }: any) => {
            expect(
              reducer(
                {
                  foo: 1,
                  bar: true,
                },
                {
                  type: 'rogue',
                },
              ),
            ).toEqual({
              foo: 1,
              bar: true,
            });
          }}
        />
        <And
          desc="should return action.data on initSuccess"
          action={async (_: any, { reducer, foo, bar }: any) => {
            const data = {};
            expect(
              reducer(
                {},
                {
                  type: actionTypes.initSuccess,
                  data,
                },
              ),
            ).toEqual(data);
          }}
        />
        <And
          desc="should sync the values from sync action to state"
          action={async (_: any, { reducer, foo, bar }: any) => {
            expect(
              reducer(
                {
                  foo: 0,
                  bar: null,
                },
                {
                  type: actionTypes.sync,
                  key: 'foo',
                  value: 30,
                },
              ),
            ).toEqual({
              foo: 30,
              bar: null,
            });
          }}
        />
        <And
          desc="should return initial states on resetSuccess"
          action={async (_: any, { reducer, foo, bar }: any) => {
            expect(
              reducer(
                {
                  foo: 32,
                  bar: 'test',
                },
                {
                  type: actionTypes.resetSuccess,
                },
              ),
            ).toEqual({
              foo: foo(undefined, {}),
              bar: bar(undefined, {}),
            });
          }}
        />
        <And
          desc="should computer new state from reducers"
          action={async (_: any, { reducer, foo, bar }: any) => {
            expect(
              reducer(
                {
                  foo: 32,
                  bar: 'test',
                },
                {
                  type: 'counter',
                },
              ),
            ).toEqual({
              foo: 33,
              bar: 'test',
            });
            expect(
              reducer(
                {
                  foo: 32,
                  bar: 'test',
                },
                {
                  type: 'memorize',
                  value: 'hello world',
                },
              ),
            ).toEqual({
              foo: 32,
              bar: 'hello world',
            });
          }}
        />
      </Scenario>
    );
  }
}
