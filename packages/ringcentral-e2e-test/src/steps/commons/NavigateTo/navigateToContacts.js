import sleep from 'ringcentral-integration/lib/sleep';

import NavigateTo from '../NavigateTo';
import srcriptRootLiteral from '../../../enums/srcriptRootLiteral';

export default class NavigateToContacts extends NavigateTo('contacts') {
  static async waitForFetching({ app }) {
    await $(app).waitFor('@spinnerOverlay', { hidden: true, timeout: 120000 });
    await sleep(4000);
  }

  static get steps() {
    return [
      this.go,
      this.waitForFetching,
    ];
  }
}
