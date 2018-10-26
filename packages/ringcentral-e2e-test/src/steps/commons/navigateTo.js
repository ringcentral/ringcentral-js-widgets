/* global $ */
export default function NavigateTo(router = '') {
  return (
    class {
      static async go({ driver: { app }, options: { isVirtual } }) {
        // TODO
        await $(app).waitFor(300);
        if (isVirtual) {
          app.props().phone.routerInteraction.push(`/${router}`);
        } else {
          await $(app).execute(`phone.routerInteraction.push('/${router}')`);
        }
      }

      static get steps() {
        return [
          this.go,
        ];
      }
    }
  );
}
