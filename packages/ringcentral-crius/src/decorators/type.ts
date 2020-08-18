import { Step } from '../step';

const testTypes = ['ut', 'it', 'e2e'] as const;

export type TestType = typeof testTypes[number];

function type(value: TestType) {
  if (typeof value === 'undefined' || value === null) {
    throw new Error('TestType value is required.');
  }
  if (testTypes.indexOf(value) <= -1) {
    throw new Error("TestType value should be in ['ut', 'it', 'e2e'].");
  }
  return function(target: Object) {
    (target as typeof Step).type = value;
  };
}

export const it = type('it');

export const ut = type('ut');

export const e2e = type('e2e');
