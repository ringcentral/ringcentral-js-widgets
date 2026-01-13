import type { TelephonySessionBuilderParams } from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
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

export type MakeCallProps = {
  isWebRTC?: boolean;
  useUserAgentSession?: boolean;
  sessionId?: string;
  mockUserAgentSessionPartyData?: boolean;
  triggerWebphoneOnCallInit?: boolean;
  /**
   * when you want to make a call to a queue, you can set this to the queue name
   */
  callQueueName?: string;
  // mock webSession fromUserName
  fromUserName?: string;
  // mock webSession toUserName
  toUserName?: string;
} & TelephonySessionBuilderParams;

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
