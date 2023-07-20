import type { CriusElement, Props } from './step';

/**
 *
 */
export interface StepFunction<P = {}, C = {}> {
  (props: Props<P>, context: C): CriusElement;
  defaultProps?: Partial<P>;
}
