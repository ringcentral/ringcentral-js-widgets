import { BasePhone } from '@ringcentral-integration/commons/interfaces/BasePhone.interface';
import { StepFunction as BaseStepFunction } from '@ringcentral-integration/test-utils';

export interface StepFunction<P = {}, C = {}>
  extends BaseStepFunction<P, C & Context> {}

export interface Context {
  phone: BasePhone;
}
