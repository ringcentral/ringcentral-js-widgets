import type { RcMock } from '@ringcentral-integration/internal-mock';
import type { App } from '@ringcentral-integration/next-core';

import type { PhoneAppView } from '../../src/app/App.view';

export interface Context {
  app: App<PhoneAppView, any, any>;
  rcMock: RcMock;
  example?: any;
  payload: {
    //
  };
}
