import { createProcess } from '../../steps';
import Logout from './logout';
import { LoginCTI } from './login';

export default class Relogin {
  static async relogin(context) {
    const process = createProcess(
      Logout,
      LoginCTI
    )(context);
    await process.exec();
  }

  static get steps() {
    return [
      this.relogin,
    ];
  }
}
