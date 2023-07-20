import type { Priority } from '../constant';
import { priorities } from '../constant';
import type { Step } from '../step';

function priority(value: Priority) {
  if (typeof value === 'undefined' || value === null) {
    throw new Error('Priority value is required.');
  }
  if (priorities.indexOf(value) <= -1) {
    throw new Error(
      `Priority value should be in ${JSON.stringify(priorities)}.`,
    );
  }
  return function (target: Object) {
    (target as typeof Step).priority = value;
  };
}

export const p0 = priority('p0');

export const p1 = priority('p1');

export const p2 = priority('p2');

export const p3 = priority('p3');
