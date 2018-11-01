import request from 'request';
import { autoAsyncRetry } from './helper';
import accountTypes from './accountTypes';

export const BASE_URL = 'http://10.32.36.75:7789/env';
export const ENV_URLS = {
  xmnup: 'https://api-xmnup.lab.nordigy.ru',
  itl: 'https://api-itldevxmn.lab.nordigy.ru',
  prod: 'https://api-rcapps.ringcentral.com'
};
export const envList = Object.keys(ENV_URLS);

export default class AccountHelper {
  static get baseUrl() {
    return BASE_URL;
  }

  static get env() {
    return this._env;
  }

  static async getAccountList(context, accountsTypeList) {
    this._env = context.options.tag.envs;
    const accAry = await this.retryAccount(accountsTypeList);
    const destroyer = async () => {
      await Promise.all(
        accAry.map(async acc => this.releaseAccount(acc.uuid))
      );
    };
    return { accounts: accAry, destroyer };
  }
  

  static async retryAccount(accountsTypeList) {
    const scenario = accountsTypeList.map((type) => {
      const scenarioTag = accountTypes[type];
      if (!Object.values(accountTypes).includes(scenarioTag)) {
        throw new Error(`Invalid tag: ${type}`);
      } 
      return scenarioTag;
    });
    const response = this.getGroupAccount(scenario)
      .catch((e) => { 
        console.error(e);
        throw new Error(e); 
      });
    return response;
  }

  static async getGroupAccount(tagAry) {
    return this.getAccount(tagAry.join('&'));
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
