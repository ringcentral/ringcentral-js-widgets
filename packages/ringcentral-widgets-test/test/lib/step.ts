import {
  BaseStep,
  StepFunction as BaseStepFunction,
  StepProp as BaseStepProp,
} from '@ringcentral-integration/test-utils';

import { Context } from '../interfaces';

export {
  And,
  autorun,
  beforeEach,
  common,
  examples,
  Given,
  it,
  p1,
  p2,
  p3,
  Scenario,
  Then,
  title,
  When,
} from '@ringcentral-integration/test-utils';

export interface StepFunction<P = {}, C = {}>
  extends BaseStepFunction<P, C & Context> {}

export type StepProp =
  | BaseStepProp
  | StepFunction<any, any>
  | (StepFunction<any, any> | JSX.Element)[];

export abstract class Step<P = {}, C = {}> extends BaseStep<P, C & Context> {
  static override context: Context = {
    get phone() {
      return global.instance.phone;
    },
    get app() {
      return global.instance.app;
    },
    get rcMock() {
      return global.instance.rcMock;
    },
    payload: {
      //
    },
  };
}
