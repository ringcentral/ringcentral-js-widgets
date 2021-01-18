import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const EVENTS = ObjectMap.fromKeys([
  'callRing',
  'callStart',
  'callEnd',
  'callHold',
  'callResume',
  'beforeCallResume',
  'beforeCallEnd',
  'callInit',
  'webphoneRegistered',
  'webphoneUnregistered',
]);
