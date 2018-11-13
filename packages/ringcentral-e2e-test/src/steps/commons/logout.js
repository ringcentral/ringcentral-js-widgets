import { createProcess } from 'marten';
import NavigateToSettings from './navigateToSettings';
import srcriptRootLiteral from '../../enums/srcriptRootLiteral';

export default class Logout {
  static async prepare(context) {
    const process = createProcess(
      NavigateToSettings,
    )(context);
    await process.exec();
    await $(context.app).waitForSelector('@logoutButton');
  }

  static async logout({ options: { option, isVirtual, tag }, app }) {
    if (isVirtual) {
      const logout = `${srcriptRootLiteral[tag.project]}.auth.logout()`;
      Function('phone', logout)(app.props().phone);
    } else{
      await $(app).waitForSelector('@logoutButton');
      await $(app).click('@logoutButton');
    }
    await $(app).waitForSelector('@loginButton');
  }

  static get steps() {
    return [
      this.prepare,
      this.logout,
    ];
  }
}