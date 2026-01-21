import {
  injectable,
  PortManager,
  RcViewModule,
} from '@ringcentral-integration/next-core';

@injectable({
  name: 'CoWorkerAppView',
})
export class CoWorkerAppView extends RcViewModule {
  constructor(protected _portManager: PortManager) {
    super();
  }

  component() {
    return null;
  }
}
