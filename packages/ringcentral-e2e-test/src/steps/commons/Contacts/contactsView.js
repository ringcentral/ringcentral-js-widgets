import sleep from 'ringcentral-integration/lib/sleep';

export default class ContactSourceFilter {
  static async clickContactSourceFilterButton({ app }) {
    await $(app).click('@contactSourceFilterButton');
    await sleep(600);
  }

  static async getContactItems({ page }) {
    return $(page).$$('@contactItem');
  }

  static async getContactsSearchInputProperty({ app }, property) {
    return $(app).getAttribute('@contactsSearchInput', property);
  }

  static async searchContactViaSearchInput({ app }, searchText) {
    await $(app).clear('@contactsSearchInput');
    await $(app).type('@contactsSearchInput', searchText);
    await sleep(800);
  }

  static async getContactSourceFilterList({ app }) {
    await this.clickContactSourceFilterButton({ app });
    await $(app).waitForSelector('@contactSourceList');
    const listText = await $(app).getText('@contactSourceList');
    await this.clickContactSourceFilterButton({ app });
    return listText.split('\n');
  }

  static async chooseContactFilter({ app }, index) {
    await this.clickContactSourceFilterButton({ app });
    await $(app).waitForSelector('@contactSourceList');
    const targetFilterItem = await $(app).$$('[class*=contactSourceItem]');
    await targetFilterItem[index].click();
  }

  static async getAllContactListItemName({ app }) {
    const contactItemSelector = '[data-sign="contactItem"] > div:nth-child(2)';
    return $(app).execute(`Array.from(document.querySelectorAll('${contactItemSelector}')).map(i => i.innerText)`);;
  }

  static async getCilterIconContainerProperty({ app }, property) {
    return $(app).getAttribute('@filterIconContainer', property);
  }
}
