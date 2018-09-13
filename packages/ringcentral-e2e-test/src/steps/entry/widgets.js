export default class Entry {
  static async goto(context) {
    context.driver.app = context.driver.page;
    global.app = context.driver.app;
  }
  static get steps() {
    return [
      this.goto,
    ];
  }
}
