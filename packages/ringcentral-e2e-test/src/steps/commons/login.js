import { createProcess } from 'marten';
import ToggleEnv from './toggleEnv';
import Account from './account';
import { PuppeteerUtils } from '../../lib/utils';
/* global $ */
export default function Login(account) {
  return (
    class {
      static async preset(context) {
        if (toString.call(context.options.option.playload) !== '[object Object]') {
          context.options.option.playload = {};
        }
      }

      static async prepare(context) {
        await $(context.driver.app).waitForSelector('@loginButton');
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

      static async login({ options: { option, isVirtual }, driver: { app } }) {
        if (isVirtual) {
          option.playload.loginAccount = {
            username: '',
            password: '',
          };
        }
        if (!option.playload.loginAccount) throw new Error('Invalid login account');
        const login = `phone.auth.login({
          username: '${option.playload.loginAccount.username}',
          password: '${option.playload.loginAccount.password}'
        })`;
        if (isVirtual) {
          const { phone } = app.props();
          // eslint-disable-next-line
          Function('phone', login).call(null, phone);
        } else {
          await $(app).execute(login);
        }
        await $(app).waitForSelector('@tabNavigationView');
      }

      static async realLogin({ did, password }, app, page) {
        await $(app).waitForClickable('[class*=loginButton]');
        await $(app).click('[class*=loginButton]');
        const loginPage = await PuppeteerUtils.waitForNewPage(page);
        // loginpage-1
        await $(loginPage).waitForSelector('[data-test-automation-id=loginCredentialNext]', { visible: true });
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
