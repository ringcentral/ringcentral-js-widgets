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
import { produceWithPatches, enablePatches } from 'immer';

import { checkPatches } from '../../lib/usm-redux/checkPatches';

enablePatches();

const checkFunction: (
  ...args: Parameters<typeof produceWithPatches>
) => boolean = (state, changes) => {
  const [nextState, patches] = produceWithPatches(state, changes);
  return checkPatches(state, {
    _patches: patches,
    method: '',
    type: '',
    params: undefined,
    _state: nextState,
    _usm: 'USM-REDUX',
  });
};

@autorun(test)
@title('CheckPatches::basic')
export class CheckPatches extends Step {
  @examples([
    {
      data: { field: {} },
      change: (data: any) => {
        data.field.x = [];
        data.field.x1 = 0;
        data.field.x2 = 'str';
        data.field.x3 = {};
        data.field.x4 = false;
        data.field.x5 = true;
        data.field.x6 = null;
      },
      expectWarning: false,
    },
    {
      data: { field: {} },
      change: (data: any) => {
        Object.assign(data.field, { x: 0 });
      },
      expectWarning: false,
    },
    {
      data: { field: null },
      change: (data: any) => {
        data.field = { x: 0 };
      },
      expectWarning: false,
    },
    {
      data: { field: {} },
      change: (data: any) => {
        data.field = { x: 0 };
      },
      expectWarning: false,
    },
    {
      data: { field: { x: 0 } },
      change: (data: any) => {
        data.field = {};
      },
      expectWarning: false,
    },
    {
      data: { field: { y: 1 } },
      change: (data: any) => {
        data.field = { x: 0 };
      },
      expectWarning: true,
    },
    {
      data: { field: { y: 1 } },
      change: (data: any) => {
        data.field = null;
        data.field = { x: 0 };
      },
      expectWarning: true,
    },
    {
      data: { field: { y: 0 } },
      change: (data: any) => {
        Object.keys(data.field).forEach((key) => {
          delete data.field[key];
        });
        Object.assign(data.field, { x: 0, z: 0 });
      },
      expectWarning: false,
    },
    {
      data: { field: [] },
      change: (data: any) => {
        data.field.push('1');
      },
      expectWarning: false,
    },
    {
      data: { field: [] },
      change: (data: any) => {
        data.field = ['1'];
      },
      expectWarning: false,
    },
    {
      data: { field: ['1'] },
      change: (data: any) => {
        data.field = [];
      },
      expectWarning: false,
    },
    {
      data: { field: null },
      change: (data: any) => {
        data.field = ['1'];
      },
      expectWarning: false,
    },
    {
      data: { field: ['0'] },
      change: (data: any) => {
        data.field = data.field.concat(['1']);
      },
      expectWarning: true,
    },
    {
      data: { field: ['0'] },
      change: (data: any) => {
        const old = data.field;
        data.field = null;
        data.field = old.concat(['1']);
      },
      expectWarning: true,
    },
    {
      data: { field: ['0'] },
      change: (data: any) => {
        data.field.length = 0;
        data.field.push('1');
      },
      expectWarning: false,
    },
  ])
  run() {
    const { data, change, expectWarning } = this.context.example;
    let requiredWarning: boolean;
    return (
      <Scenario desc="">
        <When
          desc="call 'checkPatches' with old state and patches."
          action={() => {
            requiredWarning = checkFunction(data, change);
          }}
        />
        <Then
          desc="'console.warn' should be called as expected."
          action={() => {
            expect(requiredWarning).toBe(expectWarning);
          }}
        />
      </Scenario>
    );
  }
}
