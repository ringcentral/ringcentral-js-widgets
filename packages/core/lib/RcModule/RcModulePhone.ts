import { RcModuleType } from './RcModuleType';

export type RcModulePhoneType<T> = { [key in keyof T]: RcModuleType<T[key]> };
