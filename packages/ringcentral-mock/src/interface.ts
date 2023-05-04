import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import {
  NumberData,
  PartyStatusCode,
} from '@ringcentral-integration/commons/integration-test/mock/telephonySessionBuilder';
import { OpenAPIV3 } from 'openapi-types';

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

type CallDirectionsKeys = keyof typeof callDirections;

type CallDirections = typeof callDirections[CallDirectionsKeys];

export interface MakeCallProps {
  phoneNumber?: string;
  isWebRTC?: boolean;
  useUserAgentSession?: boolean;
  direction?: CallDirections;
  telephonySessionId?: string;
  sessionId?: string;
  fromNumberData?: NumberData;
  toNumberData?: NumberData;
  startTime?: string;
  isRecording?: boolean;
  status?: PartyStatusCode;
  queueCall?: boolean;
}

export interface MessageProps {
  message?: string;
  type?: string;
  readStatus?: string;
  availability?: string;
  repeat?: number;
  conversationId?: string;
}
