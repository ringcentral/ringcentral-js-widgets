import RcModule from '../../lib/RcModule';
import proxify from '../../lib/proxy/proxify';
import { Module } from '../../lib/di';
import actionTypes from './actionTypes';
import getQuickAccessReducer from './getQuickAccessReducer';

@Module({
  deps: [
    'Auth',
    'Storage',
    'Webphone'
  ]
})
export default class QuickAccess extends RcModule {
  constructor({
    auth,
    webphone,
    ...options
  }) {
    super({
      actionTypes,
      ...options
    });
    this._auth = auth;
    this._webphone = webphone;
    this._reducer = getQuickAccessReducer(this.actionTypes);
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  async _onStateChange() {
    if (this._auth.ready && !this.ready) {
      this.store.dispatch({
        type: this.actionTypes.initSuccess
      });
    } else if (!this._auth.ready && this.ready) {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
    // When there is an incoming call,
    // the page should be dismissed
    if (
      this._webphone.ready &&
      this._webphone.ringSession &&
      this._webphone.ringSession !== this._lastRingSession
    ) {
      this._lastRingSession = this._webphone.ringSession;
      this.exit();
    }
  }


  @proxify
  async enter() {
    this.store.dispatch({
      type: this.actionTypes.updatePage,
      entered: true
    });
  }


  @proxify
  async exit() {
    this.store.dispatch({
      type: this.actionTypes.updatePage,
      entered: false
    });
  }

  get entered() {
    return this.state.entered;
  }

  get status() {
    return this.state.status;
  }
}

