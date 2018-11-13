export default class Settings {
  static async enterSettings() {
    await $(app).waitFor(1000);
    await $(app).waitForSelector('[title="More Menu"]', { selector: 'css' });
    await $(app).click('[title="More Menu"]', { selector: 'css' });
    await $(app).waitForSelector('[title="Settings"]', { selector: 'css' });
    await $(app).click('[title="Settings"]', { selector: 'css' });
    await $(app).waitFor(1000);
  }


  static async logout({ options: { option, isVirtual }, driver: { app } }) {
    if (isVirtual) {
      app.props().phone.auth.logout({ username: option.account1[0]['mainNumber'], password: option.account1[0]['password'] });
    } else {
      await $(app).execute(`phone.auth.logout({username: '${option.account1[0]['mainNumber']}', password: '${option.account1[0]['password']}'})`);
    }
    await $(app).waitFor('[class*=loginButton]', { selector: 'css' });
  }


  static get steps() {
    return [
      this.enterSettings,
      this.logout,
    ];
  }
}