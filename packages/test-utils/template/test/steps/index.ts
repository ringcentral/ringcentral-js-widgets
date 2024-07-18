import type { StepFunction as BaseStepFunction } from '@ringcentral-integration/test-utils';
import { BaseStep } from '@ringcentral-integration/test-utils';

import type { Context } from '../interfaces';

export {
  Scenario,
  Given,
  When,
  Then,
  And,
  autorun,
  title,
  examples,
  beforeEach,
} from '@ringcentral-integration/test-utils';

export interface StepFunction<P = {}, C = {}>
  extends BaseStepFunction<P, C & Context> {}

export abstract class Step<P = {}, C = {}> extends BaseStep<P, C & Context> {
  static override context: Context = {
    payload: {
      //
    },
  };
}
