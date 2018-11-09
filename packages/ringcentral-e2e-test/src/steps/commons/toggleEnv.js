import { ENV_URLS } from '../../lib/accountManager';

export const RC_SCRIPT_ROOT_LITERAL = {
  office: 'runner._client',
  widgets: 'phone',
  salesforce: 'phone',
};

export default class ToggleEnv {
  static async setEnv({ app, options: { tag } }) {
    const env = tag.envs;
    const envServer = await $(app).execute(`${RC_SCRIPT_ROOT_LITERAL[tag.project]}.environment.server`);
    if (envServer != ENV_URLS[env]){
      await $(app).execute('toggleEnv()');
      await $(app).click('@envToggle');
      await $(app).clear('@envServerUrl');
      await $(app).type('@envServerUrl', ENV_URLS[env]);
      await $(app).click('@envSave');
    }
  }

  static get steps() {
    return [
      this.setEnv,
    ];
  }
}
