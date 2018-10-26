import request from 'request';
import { autoAsyncRetry } from './helper';
import accountTypes from './accountTypes';

export const BASE_URL = 'http://10.32.36.75:7789/env';
export const ENV_URLS = {
  xmnup: 'https://api-xmnup.lab.nordigy.ru',
  itl: 'https://api-itldevxmn.lab.nordigy.ru'
};
export const envList = Object.keys(ENV_URLS);

export default class AccountHelper {
  static get baseUrl() {
    return BASE_URL;
  }

  static get env() {
    return this._env;
  }

  static async getAccountList(context, accountsList) {
    this._env = context.options.tag.envs;
    const promises = accountsList.map(async (acc) => {
      const result = await this.retryAccount(acc);
      if (result.length === 0) {
        console.error(`Failed getting account using ${acc}`);
      } else if (acc.includes('forwarding')) {
        return result;
      }
      return result[0];
    });
    const accAry = await Promise.all(promises).then(values => values);
    const destroyer = async () => {
      await Promise.all(
        accAry.map(async acc => this.releaseAccount(acc.uuid))
      );
    };
    return { accounts: accAry, destroyer };
  }

  static async retryAccount(type) {
    const scenarioTag = accountTypes[type];
    if (!Object.values(accountTypes).includes(scenarioTag)) {
      return Promise.reject(new Error(`Invalid tag: ${scenarioTag}`));
    }
    const response = autoAsyncRetry(this.getAccount.bind(this), scenarioTag)
      .catch((e) => { throw new Error(e); });
    // const response = this.getAccount(scenarioTag);
    return response;
  }

  static async releaseAccount(uuid) {
    if (!uuid) return Promise.reject(new Error(`Invalid uuid: ${uuid}`));
    const response = await this.recycleAccount(uuid);
    return response;
  }

  static async baseReq(method, path, param) {
    console.log(`${this.baseUrl}/${this.env}/account/${path}/${param}`);
    const options = {
      headers: {
        charset: 'UTF-8'
      },
      url: `${this.baseUrl}/${this.env}/account/${path}/${param}`,
      method,
      json: true
    };
    // TODO Replace with logger
    return new Promise((resolve, reject) => (request(options, (err, response, body) => {
      if (err) {
        console.error('AccountHelper_Error:', err);
        reject(err);
      } else {
        console.log('AccountHelper_Body:', body);
        resolve(body);
      }
    })));
  }

  static async getAccount(scenarioTag) {
    const response = await this.baseReq('GET', 'tag', scenarioTag);
    return response;
  }

  static async getAccountByUUid(uuid) {
    const response = await this.baseReq('GET', 'id', uuid);
    return response;
  }

  static async lockAccount(uuid) {
    const response = await this.baseReq('PUT', 'occupy', uuid);
    return response;
  }

  static async recycleAccount(uuid) {
    const response = await this.baseReq('PUT', 'recycle', uuid);
    return response;
  }
}
