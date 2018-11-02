//import Account from './account';

export const RC_SCRIPT_ROOT_LITERAL = {
  office: 'runner._client',
  widgets: 'phone',
  salesforce: 'phone',
};

export default class Settings {
  static async enterSettings() {
    await $(app).waitFor(1000);
    await $(app).waitForSelector('[title="More Menu"]', { selector: 'css' });
    await $(app).click('[title="More Menu"]', { selector: 'css' });
    await $(app).waitForSelector('[title="Settings"]', { selector: 'css' });
    await $(app).click('[title="Settings"]', { selector: 'css' });
    await $(app).waitFor(1000);
  }




  static async logout({ options: { option, isVirtual,tag }, driver: { app } }) {
    if (isVirtual) {
      option.playload.loginAccount = {
        username: '',
        password: '',
      };
    }
    if (!option.playload.loginAccount) throw new Error('Invalid logout account');
    const logout = `${RC_SCRIPT_ROOT_LITERAL[tag.project]}.auth.logout({
      username: '${option.playload.loginAccount.username}',
      password: '${option.playload.loginAccount.password}'
    })`;
    if (isVirtual) {
      const { phone } = app.props();
      // eslint-disable-next-line
      Function('phone', logout).call(null, phone);
    } else {
      await $(app).execute(logout);
    }
    await $(app).waitFor('[class*=loginButton]');
  }


  static get steps() {
    return [
      this.enterSettings,
      this.logout,
    ];
  }
}