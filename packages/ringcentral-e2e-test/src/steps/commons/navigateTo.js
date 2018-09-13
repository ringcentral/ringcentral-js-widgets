/* global $ */
export default class NavigateTo {
  static async go({ driver: { app } }, router) {
    console.log(router, app);
  }

  static get steps() {
    return [
      this.go,
    ];
  }
}
