import { createProcess } from 'marten';
import ToggleEnv from './toggleEnv';
import Account from './account';
import { PuppeteerUtils } from '../../lib/utils';

export const RC_SCRIPT_ROOT_LITERAL = {
  office: 'runner._client',
  widgets: 'phone',
  salesforce: 'phone',
};

export default function Login(account) {
  return (
    class {
      static async preset(context) {
        if (toString.call(context.options.option.playload) !== '[object Object]') {
          context.options.option.playload = {};
        }
      }

      static async prepare(context) {
        await $(context.app).waitForSelector('@loginButton');
        if (context.options.isVirtual) return;
        const { username, password } = context.options.option;
        if (username && password) {
          context.options.option.playload.loginAccount = {
            username,
            password,
          };
        }
        if (account) {
          context.options.option.playload.loginAccount = account;
        }
        const process = createProcess(
          ToggleEnv,
          Account,
        )(context);
        await process.exec();
      }

      static async login({ options: { option, isVirtual, tag }, app, page}) {
        if (isVirtual) {
          option.playload.loginAccount = {
            username: '',
            password: '',
          };
        }
        if (!option.playload.loginAccount) throw new Error('Invalid login account');
        const login = `${RC_SCRIPT_ROOT_LITERAL[tag.project]}.auth.login({
          username: '${option.playload.loginAccount.username}',
          password: '${option.playload.loginAccount.password}'
        })`;
        if (isVirtual) {
          const { phone } = app.props();
          // eslint-disable-next-line
          Function('phone', login).call(null, phone);
        } else {
          await this.realLogin({ did: option.playload.loginAccount.username, password: option.playload.loginAccount.password }, app, page);
        }
        await $(app).waitForSelector('@tabNavigationView');
      }


      // TODO apply to case.
      static async realLogin({ did, password }, app, page) {
        await $(app).waitForClickable('[class*=loginButton]');
        await $(app).click('[class*=loginButton]');
        const loginPage = await PuppeteerUtils.waitForNewPage(page);
        // loginpage-1
        await $(loginPage).waitForSelector('[data-test-automation-id=loginCredentialNext]', { visible: true });
        // todo clear
        await $(loginPage).type('[data-test-automation-id=input]', did);
        await $(loginPage).click('[data-test-automation-id=loginCredentialNext]');
        // loginpage-2
        await $(loginPage).waitForSelector('[data-test-automation-id=signInBtn]', { visible: true });
        // cannot remove this, cause of it will blink
        await $(loginPage).waitFor(1000);
        await $(loginPage).type('[id=password]', password);
        await $(loginPage).click('[data-test-automation-id=signInBtn]');
      }

      static get steps() {
        return [
          this.preset,
          this.prepare,
          this.login,
        ];
      }
    }
  );
}

export const LoginCTI = Login();
