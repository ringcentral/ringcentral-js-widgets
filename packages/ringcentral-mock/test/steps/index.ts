import {
  BaseStep,
  StepFunction as BaseStepFunction,
} from '@ringcentral-integration/test-utils';

import { Context } from '../interfaces';

export {
  And,
  autorun,
  beforeEach,
  examples,
  Given,
  Scenario,
  Then,
  title,
  When,
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
