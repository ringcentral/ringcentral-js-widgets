import RcModule from 'ringcentral-integration/lib/RcModule';
import moduleStatuses from 'ringcentral-integration/enums/moduleStatuses';

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
