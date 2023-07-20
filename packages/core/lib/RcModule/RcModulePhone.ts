import type { RcModuleV2 } from './RcModule';
import type { RcModuleType } from './RcModuleType';

export type RcModulePhoneType<T> = {
  [key in keyof T]: T[key] extends RcModuleV2 ? RcModuleType<T[key]> : T[key];
};
