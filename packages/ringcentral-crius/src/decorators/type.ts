import type { TestType } from '../constant';
import { testTypes } from '../constant';
import type { Step } from '../step';

function type(value: TestType) {
  if (typeof value === 'undefined' || value === null) {
    throw new Error('TestType value is required.');
  }
  if (testTypes.indexOf(value) <= -1) {
    throw new Error(
      `TestType value should be in ${JSON.stringify(testTypes)}.`,
    );
  }
  return function (target: Object) {
    (target as typeof Step).type = value;
  };
}

export const it = type('it');

export const ut = type('ut');

export const e2e = type('e2e');

export const manual = type('manual');
