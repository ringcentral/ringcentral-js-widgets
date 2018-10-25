/* global $ */

export default class ToggleEnv {
  static async setEnv({ driver: { app } }) {
    await $(app).execute('toggleEnv()');
    await $(app).click('@envToggle');
    await $(app).clear('@envServerUrl');
    await $(app).type('@envServerUrl', env);
    await $(app).click('@envSave');
  }

  static get steps() {
    return [
      this.setEnv,
    ];
  }
}
