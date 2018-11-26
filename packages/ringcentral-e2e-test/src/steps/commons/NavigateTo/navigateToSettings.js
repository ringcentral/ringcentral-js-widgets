import NavigateTo from '../NavigateTo';

const AUTHORIZED_STATUS = 'authorized';
const UNAUTHORIZED_STATUS = 'unauthorized';

export default class NavigateToSettings extends NavigateTo('settings') {
  static async getAuthorizedLogo({ app }) {
    const targetItem = await $(app).waitForSelector('@authorizedLogo');
    return targetItem;
  }
  static async getUnauthorizedLogo({ app }) {
    const targetItem = await $(app).waitForSelector('@unauthorizedLogo');
    return targetItem;
  }
  static async getAuthorizeButtonText({ app }) {
    const targetItem = await $(app).getText('@authorizeButton');
    return targetItem;
  }
  static async getAuthorizeMailtipText({ app }) {
    const targetItem = await $(app).getText('@authorizeMailtip');
    return targetItem;
  }
}
