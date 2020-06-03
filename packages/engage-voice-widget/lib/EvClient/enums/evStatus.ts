import { createEnum } from 'ringcentral-integration/lib/Enum';

export const evStatus = createEnum([
  'START',
  'CONNECTING',
  'CONNECTED',
  'CONNECT_FAILURE',
  'LOGIN',
  'LOGINED',
  'LOGIN_FAILURE',
  'CLOSED',
]);
