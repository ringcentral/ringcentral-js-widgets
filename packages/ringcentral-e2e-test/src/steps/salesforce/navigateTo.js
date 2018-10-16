/* global $ */
export default class NavigateTo {
  static async go({ driver: { app }, options: { isVirtual } }) {
    // TODO
    await $(app).waitFor(3000);
    if (isVirtual) {
      app.props().phone.routerInteraction.push('/');
    } else {
      await $(app).execute('phone.routerInteraction.push(\'/\')');
    }
  }
  static get steps() {
    return [
      this.go,
    ];
  }
}
