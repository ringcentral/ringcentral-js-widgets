export default class Entry {
  static async goto() {
    // nothing
  }
  static get steps() {
    return [
      this.goto,
    ];
  }
}
