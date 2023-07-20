import type { connectionStatus } from '@ringcentral-integration/commons/modules/Webphone';
import type { ObjectMapKey } from '@ringcentral-integration/core/lib/ObjectMap/ObjectMap';
import type { RcMock } from '@ringcentral-integration/mock';
import type { ReturnTypeOfRender } from '@ringcentral-integration/test-utils';

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
