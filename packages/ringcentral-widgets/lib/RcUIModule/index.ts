import moduleStatuses from '@ringcentral-integration/commons/enums/moduleStatuses';
import RcModule from '@ringcentral-integration/commons/lib/RcModule';

export default class RcUIModule extends RcModule {
  get status() {
    return moduleStatuses.ready;
  }

  uiProps() {
    throw Error(`${this.constructor.name}::uiProps is not implemented`);
  }

  uiFunctions() {
    throw Error(`${this.constructor.name}::uiFunctions is not implemented`);
  }
}
