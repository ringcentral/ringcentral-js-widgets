/* global $ */
export default class NavigateTo {
  static async go({ driver: { page } }, router) {
    console.log(router);
  }

  static get steps() {
    return [
      this.go,
    ];
  }
}
