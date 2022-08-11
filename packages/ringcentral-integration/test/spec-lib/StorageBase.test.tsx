import { Reducer } from 'redux';

import { usmAction } from '@ringcentral-integration/core';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import {
  And,
  autorun,
  Scenario,
  Step,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

import { actionTypesBase, getDataReducer } from '../../lib/StorageBase';

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
            const actionTypes = ObjectMap.prefixKeys(
              [...ObjectMap.keys(actionTypesBase)],
              'storage',
            );
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
          desc="should return action.data with usm-redux action"
          action={async (_: any, { reducer, foo, bar }: any) => {
            const data = {};
            expect(
              reducer(
                {},
                {
                  type: 'storage',
                  _usm: usmAction,
                  _state: {
                    data,
                  },
                },
              ),
            ).toEqual(data);
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
