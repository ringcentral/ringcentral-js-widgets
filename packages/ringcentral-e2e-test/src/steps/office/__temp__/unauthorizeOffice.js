import { createProcess } from '../index';
import NavigateToSettings from '../commons/navigateToSettings';

export default class UnauthorizeOffice {
  static async unauthorize(context) {
    await $(context.app).waitForSelector('@authorizeButton');
    await $(context.app).click('@authorizeButton');
    console.info('[unauthorize]getUnauthorizedLogo');
    await NavigateToSettings.getUnauthorizedLogo(context);
  }

  static get steps() {
    return [
      this.unauthorize
    ];
  }
}
