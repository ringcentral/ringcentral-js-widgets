import { connectionStatus } from '@ringcentral-integration/commons/modules/WebphoneV2/connectionStatus';
import { ReturnTypeOfRender } from '@ringcentral-integration/test-utils/lib/render';
import { ObjectMapKey } from '@ringcentral-integration/core/lib/ObjectMap/ObjectMap';

export type connectionStatusEnum = ObjectMapKey<typeof connectionStatus>;

export interface Context {
  phone: any; // TODO: add type
  app: ReturnTypeOfRender;
  payload: {
    //
  };
}
