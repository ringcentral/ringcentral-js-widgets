import NavigateTo from './navigateTo';
/* global $ */

export default class NavigateToMessages extends NavigateTo('messages') {
  static async getFirstItemText({ driver: { app } }) {
    const messageItemText = await $(app).getText('@messageItem');
    return messageItemText;
  }
}
