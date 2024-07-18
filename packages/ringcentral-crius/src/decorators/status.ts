import type { Step } from '../step';

const testStatus = ['partial', 'complete'] as const;

export type TestStatus = (typeof testStatus)[number];

export function status(value: TestStatus) {
  return function (target: Object) {
    (target as typeof Step).status = value;
  };
}
