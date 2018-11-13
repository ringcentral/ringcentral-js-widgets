import NavigateTo from './navigateTo';


export default class NavigateToMessages extends NavigateTo('messages') {
  static async getFirstItemText({ app }) {
    const messageItemText = await $(app).getText('@messageItem');
    return messageItemText;
  }
}
