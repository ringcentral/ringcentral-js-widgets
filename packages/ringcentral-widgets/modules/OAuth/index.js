import background from 'ringcentral-integration/lib/background';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import popWindow from 'ringcentral-integration/lib/popWindow';
import { Module } from 'ringcentral-integration/lib/di';

import OAuthBase from '../../lib/OAuthBase';

@Module({
  name: 'OAuth',
  deps: [
    { dep: 'OAuthOptions', optional: true }
  ],
})
export default class OAuth extends OAuthBase {
  constructor({
    redirectUri = './redirect.html',
    ...options
  }) {
    super({
      redirectUri,
      ...options,
    });
  }
  get name() {
    return 'OAuth';
  }

  @background
  async setupOAuth() {
    if (
      !this.oAuthReady
    ) {
      window.oAuthCallback = callbackUri => this._handleCallbackUri(callbackUri);
      this.store.dispatch({
        type: this.actionTypes.setupOAuth,
      });
    }
  }
  @background
  async destroyOAuth() {
    if (
      this.oAuthReady
    ) {
      window.oAuthCallback = null;
      this.store.dispatch({
        type: this.actionTypes.destroyOAuth,
      });
    }
  }

  @proxify
  openOAuthPage() {
    if (this.oAuthReady) {
      popWindow(this.oAuthUri, 'rc-oauth', 600, 600);
    }
  }
}
