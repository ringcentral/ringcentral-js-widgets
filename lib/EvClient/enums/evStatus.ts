import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const evStatus = ObjectMap.fromKeys([
  'START',
  'CONNECTING',
  'CONNECTED',
  'CONNECT_FAILURE',
  'LOGIN',
  'LOGINED',
  'LOGIN_FAILURE',
  'CLOSED',
]);
