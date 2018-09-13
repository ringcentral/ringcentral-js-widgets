import { createProcess } from 'marten';
import ToggleEnv from './toggleEnv';
/* global $ */
export default class Login {
  static async prepare(context) {
    if (context.options.isVirtual) return;
    const process = createProcess(
      ToggleEnv,
    )(context);
    await process.exec();
  }

  static async login({ options: { option, isVirtual }, driver: { page } }) {
    if (isVirtual) {
      page.props().phone.auth.login({ username: option.username, password: option.password });
    } else {
      await $(page).execute(`phone.auth.login({username: '${option.username}', password: '${option.password}'})`);
    }
    await $(page).waitForSelector('tabNavigationView');
  }

  static get steps() {
    return [
      this.prepare,
      this.login,
    ];
  }
}
