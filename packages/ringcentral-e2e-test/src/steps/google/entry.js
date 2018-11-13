export default class Entry {
  static async goto(context) {
    context.app = context.page;
  }
  static get steps() {
    return [
      this.goto,
    ];
  }
}
