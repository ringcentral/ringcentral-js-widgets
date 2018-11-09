import { createProcess } from 'marten';
import Account from './account';
import NavigateToSettings from './navigateToSettings';
import { PuppeteerUtils } from '../../lib/utils';

export const RC_SCRIPT_ROOT_LITERAL = {
  office: 'runner._client',
  widgets: 'phone',
  salesforce: 'phone',
};

export default function Logout(context) {
  return (
    class {
      static async preset(context) {
        if (toString.call(context.options.option.playload) !== '[object Object]') {
          context.options.option.playload = {};
        }
      }

      static async prepare(context) {
        // await $(context.app).waitForSelector('@moreMenu:-1');
        // console.log("click more");
        // await $(context.app).click('@moreMenu:-1');
        // const mode = context.options.option.playload.modes;
        // if (mode == "classic"){
        //   await $(context.app).waitForSelector('@settings');
        //   await $(context.app).click('@settings');
        // }
        const process = createProcess(
          NavigateToSettings,
        )(context);
        await process.exec();
        await $(context.app).waitForSelector('@logoutButton');
      }

      static async logout({ options: { option, isVirtual, tag }, app }) {
        if (isVirtual) {
          await $(app).execute(`${RC_SCRIPT_ROOT_LITERAL[tag.project]}.auth.logout()`);
        } else{
          await $(app).waitForSelector('@logoutButton');
          await $(app).click('@logoutButton');
        }
        await $(app).waitForSelector('@loginButton');
      }

      static get steps() {
        return [
          this.preset,
          this.prepare,
          this.logout,
        ];
      }
    }
  );
}

export const LogoutCTI = Logout();