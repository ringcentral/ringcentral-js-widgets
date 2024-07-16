import type { callErrors } from '../modules/Call';

export type CallErrorsKeys = keyof typeof callErrors;
export type CallErrorsType = (typeof callErrors)[CallErrorsKeys];
