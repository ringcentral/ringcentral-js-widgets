import { createProcess } from 'marten';
import ToggleEnv from './toggleEnv';
import Account from './account';
import { PuppeteerUtils } from '../../lib/utils';
import srcriptRootLiteral from '../../enums/srcriptRootLiteral';

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

      static async login({ options: { option, isVirtual, tag, config }, app, page}) {
        if (isVirtual) {
          option.playload.loginAccount = {
            username: '',
            password: '',
          };
        }
        if (!option.playload.loginAccount) throw new Error('Invalid login account');
        const login = `${srcriptRootLiteral[tag.project]}.auth.login({
          username: '${option.playload.loginAccount.username}',
          password: '${option.playload.loginAccount.password}'
        })`;
        if (isVirtual) {
          Function('phone', login)(app.props().phone);
        } else {
          // TODO temp solution before resolve support seleniumWebdriver with realLogin
          await $(app).execute(login);
          // await this.realLogin(option.playload.loginAccount, app, page);
        }
        await $(app).waitForSelector('@tabNavigationView');
        // TODO temp support extension
        if (config.type === 'extension') {
          await $(app).execute(`${srcriptRootLiteral[tag.project]}.userGuide.dismiss()`);
        }
      }

      static async realLogin({ username, password }, app, page) {
        await $(app).waitForSelector('[class*=loginButton]');
        await $(app).click('[class*=loginButton]');
        // TODO support seleniumWebdriver
        const loginPage = await PuppeteerUtils.waitForNewPage(page);
        await $(loginPage).waitForSelector('[data-test-automation-id=loginCredentialNext]', { visible: true });
        // TODO clear?
        await $(loginPage).type('[data-test-automation-id=input]', username);
        await $(loginPage).click('[data-test-automation-id=loginCredentialNext]');
        await $(loginPage).waitForSelector('[data-test-automation-id=signInBtn]', { visible: true });
        // TODO Optimization of waiting
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
