import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const webSocketReadyStates = ObjectMap.fromKeys([
  'connecting',
  'open',
  'ready',
  'closing',
  'closed',
]);

export type WebSocketReadyState = ObjectMapValue<typeof webSocketReadyStates>;
export type WebSocketReadyStates = Record<WebSocketReadyState, string>;
