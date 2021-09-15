import { ObjectMapKey } from '../../../core/lib/ObjectMap/ObjectMap'
import { connectionStatus } from '@ringcentral-integration/commons/modules/WebphoneV2/connectionStatus';

export type connectionStatusEnum = ObjectMapKey<typeof connectionStatus>;

export interface Context {
  phone: any; // TODO: add type
  app: any;
  payload: {
    //
  };
}
