import srcriptRootLiteral from '../../enums/srcriptRootLiteral';

export default function NavigateTo(router = '') {
  return (
    class {
      static async go({ app, options: { isVirtual, tag } }) {
        // TODO implement real navigate to.
        await $(app).waitFor(300);
        if (isVirtual) {
          app.props().phone.routerInteraction.push(`/${router}`);
          app.update();
        } else {
          await $(app).execute(`${srcriptRootLiteral[tag.project]}.routerInteraction.push('/${router}')`);
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
