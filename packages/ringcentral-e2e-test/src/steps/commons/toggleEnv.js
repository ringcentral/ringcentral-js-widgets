import { ENV_URLS } from '../../lib/accountManager';
import srcriptRootLiteral from '../../enums/srcriptRootLiteral';

export default class ToggleEnv {
  static async setEnv({ app, options: { tag } }) {
    const env = tag.envs;
    const envServer = await $(app).execute(`${srcriptRootLiteral[tag.project]}.environment.server`);
    if (envServer !== ENV_URLS[env]){
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
