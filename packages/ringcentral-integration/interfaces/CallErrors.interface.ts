import { callErrors } from '../modules/CallV2';

export type CallErrorsKeys = keyof typeof callErrors;
export type CallErrorsType = typeof callErrors[CallErrorsKeys];
