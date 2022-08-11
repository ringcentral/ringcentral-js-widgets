import { connectionStatus } from '@ringcentral-integration/commons/modules/Webphone';
import { ObjectMapKey } from '@ringcentral-integration/core/lib/ObjectMap/ObjectMap';
import { RcMock } from '@ringcentral-integration/mock';
import { ReturnTypeOfRender } from '@ringcentral-integration/test-utils/lib/render';

export type connectionStatusEnum = ObjectMapKey<typeof connectionStatus>;

export interface Context {
  phone: any; // TODO: add type
  app: ReturnTypeOfRender;
  rcMock: RcMock;
  example?: any;
  payload: {
    //
  };
}
