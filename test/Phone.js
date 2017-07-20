import { combineReducers } from 'redux';
import RcModule from 'ringcentral-integration/lib/RcModule';

import Alert from 'ringcentral-integration/modules/Alert';
import Locale from 'ringcentral-integration/modules/Locale';
import Brand from 'ringcentral-integration/modules/Brand';

export default class Phone extends RcModule {
  constructor({ brandConfig, appVersion, ...options }) {
    super();
    const reducers = {};
    this.addModule('brand', new Brand({
      ...options,
      ...brandConfig,
      getState: () => this.state.brand,
    }));
    reducers.brand = this.brand.reducer;
    this.addModule('locale', new Locale({
      ...options,
      getState: () => this.state.locale,
    }));
    reducers.locale = this.locale.reducer;
    this.addModule('alert', new Alert({
      ...options,
      getState: () => this.state.alert,
    }));
    reducers.alert = this.alert.reducer;
    this._reducer = combineReducers({
      ...reducers,
      app: (state = { name: brandConfig.appName, version: appVersion }) => state
    });
  }

  initialize() { }
}
