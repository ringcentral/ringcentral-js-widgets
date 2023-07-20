import type { Step } from '../step';

/**
 * Mark the case as a common case
 */
export const common = (target: Object) => {
  (target as typeof Step).common = true;
};
