import RcModule from '../../lib/rc-module';
import SymbolMap from '../../lib/symbol-map';
import Enum from '../../lib/enum';
import getReducer from './contact-reducer';
import actions from './contact-actions';

import { fetchList, extractData } from '../../lib/utils';

const symbols = new SymbolMap([
  'api',
  'platform',
  'settings',
]);

/**
 * @class
 * @description Contact module
 */
export default class Contact extends RcModule {
  /**
   * @function
   */
  constructor(options) {
    super({
      ...options,
      actions,
    });
    const {
      api,
      platform,
      settings,
    } = options;
    this[symbols.api] = api;
    this[symbols.platform] = platform;
    this[symbols.settings] = settings;

    platform.on(platform.events.loginSuccess, () => {
      this.loadCompanyContact();
    });

    (async () => {
      if (await platform.loggedIn()) {
        await this.loadCompanyContact();
      }
    })();
  }

  async loadCompanyContact() {
    const contacts = extractData(await this::fetchList(options => (
      this[symbols.api].account().extension().list(options)
    )));
  }

  get reducer() {
    return getReducer(this.prefix);
  }
}
