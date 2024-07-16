import type { CallDirection } from '@ringcentral-integration/commons/enums/callDirections';
import type {
  NumberData,
  PartyStatusCode,
  Party,
} from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
import type { OpenAPIV3 } from 'openapi-types';

import type { GetMessageInfoResponse } from './platform/interfaces';

interface RedefinedSchema {
  additionalProperties?: boolean | SchemaObject;
  properties?: Record<string, SchemaObject>;
  allOf?: SchemaObject[];
  oneOf?: SchemaObject[];
  anyOf?: SchemaObject[];
  not?: SchemaObject;
  faker?: object | string;
}

type BaseSchemaObject = Pick<
  OpenAPIV3.BaseSchemaObject,
  Exclude<keyof OpenAPIV3.BaseSchemaObject, keyof RedefinedSchema>
> &
  RedefinedSchema;

type NonArraySchemaObjectType =
  | 'boolean'
  | 'object'
  | 'number'
  | 'string'
  | 'integer';
type ArraySchemaObjectType = 'array';
export interface ArraySchemaObject extends BaseSchemaObject {
  type: ArraySchemaObjectType;
  items: SchemaObject;
}
interface NonArraySchemaObject extends BaseSchemaObject {
  type?: NonArraySchemaObjectType;
}

export type SchemaObject = ArraySchemaObject | NonArraySchemaObject;

export interface MakeCallProps {
  phoneNumber?: string;
  isWebRTC?: boolean;
  useUserAgentSession?: boolean;
  direction?: CallDirection;
  telephonySessionId?: string;
  sessionId?: string;
  fromNumberData?: NumberData;
  toNumberData?: NumberData;
  startTime?: string;
  isRecording?: boolean;
  status?: PartyStatusCode;
  queueCall?: boolean;
  originType?: string;
  peerId?: Party['status']['peerId'];
  reason?: string;
}

export interface MessageProps {
  message?: string;
  type?: string;
  readStatus?: string;
  availability?: string;
  repeat?: number;
  conversationId?: string;
  query?: MessageSyncQuery;
  syncType?: 'ISync' | 'FSync';
}

export type SupportMessageType = GetMessageInfoResponse['type'];

export interface MessageSyncQuery {
  messageType?: SupportMessageType[] | SupportMessageType;
}
