import OAuthBase from '../../lib/OAuthBase';
import background from 'ringcentral-integration/lib/background';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import popWindow from 'ringcentral-integration/lib/popWindow';
import { Module } from 'ringcentral-integration/lib/di';

@Module({
  name: 'OAuth',
  deps: [
    'OAuthOptions',
  ],
})
export default class OAuth extends OAuthBase {

  get name() {
    return 'oAuth';
  }

  @background
  async prepareOAuth() {
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
