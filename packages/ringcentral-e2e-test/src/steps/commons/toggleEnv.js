/* global $ */
import { ENV_URLS } from '../../lib/accountManager';

export default class ToggleEnv {
  static async setEnv({ driver: { app }, options: { tag: { envs } } }) {
    await $(app).execute('toggleEnv()');
    await $(app).click('@envToggle');
    await $(app).clear('@envServerUrl');
    await $(app).type('@envServerUrl', ENV_URLS[envs]);
    await $(app).click('@envSave');
  }

  static get steps() {
    return [
      this.setEnv,
    ];
  }
}
