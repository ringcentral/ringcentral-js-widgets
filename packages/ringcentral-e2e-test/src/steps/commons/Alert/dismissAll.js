import sleep from 'ringcentral-integration/lib/sleep';
import srcriptRootLiteral from '../../../enums/srcriptRootLiteral';

export default class DismissAllAlert {
  static async dismissAll({ options: { tag }, app }) {
    const dismissBtn = '[class*="node_modules-ringcentral-widgets-components-Message-_styles_dismiss"]';
    await $(app).execute(`${srcriptRootLiteral[tag.project]}.alert.dismissAll()`);
    const alertHandlers = await $(app).$$(dismissBtn);
    for (const alertHandler of alertHandlers) {
      try {
        await alertHandler.click();
      } catch (e) {
        // ...
      }
    }
    // for alerts to disappear
    await sleep(2000);
  }

  static get steps() {
    return [
      this.dismissAll
    ];
  }
}
