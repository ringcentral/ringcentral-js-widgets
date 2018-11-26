import { createProcess } from '../index';
import NavigateToSettings from '../commons/navigateTo/navigateToSettings';

export default class UnauthorizeOffice {
  static async unauthorize(context) {
    await $(context.app).waitForSelector('@authorizeButton');
    await $(context.app).click('@authorizeButton');
    await NavigateToSettings.getUnauthorizedLogo(context);
  }

  static get steps() {
    return [
      this.unauthorize
    ];
  }
}
