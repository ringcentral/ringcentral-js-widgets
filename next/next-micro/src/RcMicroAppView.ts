import { RcViewModule } from '@ringcentral-integration/next-core';

/**
 * RcMicroAppView is a view module for micro app.
 */
export abstract class RcMicroAppView extends RcViewModule {
  constructor() {
    super();
  }

  /**
   * Whether this app is a shell app
   */
  isAppShell = true;
}
