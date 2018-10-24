import request from 'request';
// import { flatten } from 'ramda';
import { autoAsyncRetry } from './helper';

const BASE_URL = 'http://10.32.36.75:7789/env';
export const TagsEnum = {
  // myRCPhone: 'myRCPhone',
  CM_RC_US: 'rc_us_common',
  CM_RC_EU: 'rc_eu_common',
  CM_RC_UK: 'rc_uk_common',
  CM_RC_CA: 'rc_ca_common',
  SF_RC_EU: 'rc_eu_sfentity',
  SF_RC_US: 'rc_us_sfentity',
  SF_RC_UK: 'rc_uk_sfentity',
  SF_RC_CA: 'rc_ca_sfentity'
};
Object.freeze(TagsEnum);

export default class AccountHelper {
  constructor({ baseUrl = BASE_URL } = {}) {
    this._baseUrl = baseUrl;
  }

  getEnv() {
    let env;
    switch (context.options.config.env) {
      case 'xmnup':
        env = 'xmnup';
        break;
      case 'itl':
        env = 'itl';
        break;
      default:
        env = 'itl';
    }
    return env;
  }

  static getInstance() {
    if (this._instance === undefined) {
      this._instance = new AccountHelper();
    }
    return this._instance;
  }

  static getAccountList = async (tags) => {
    const promises = tags.map(async (acc) => {
      const result = await AccountHelper.retryAccount(acc, false);
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
        accAry.map(async acc => AccountHelper.releaseAccount(acc.uuid))
      );
    };
    return { accounts: accAry, destroyer };
  }

  static retryAccount = async (scenarioTag, lock = false) => {
    // console.log(scenarioTag);
    if (!Object.values(TagsEnum).includes(scenarioTag)) {
      return Promise.reject(new Error(`Invalid tag: ${scenarioTag}`));
    }
    const instance = AccountHelper.getInstance();
    const response = autoAsyncRetry(instance.getAccount, scenarioTag);
    // if (lock) {
    //   response = response.then((accAry) => {
    //     const { uuid } = accAry[0];
    //     return autoAsyncRetry(instance.lockAccount, uuid).then(() => accAry);
    //   });
    // }
    return response;
  }

  static releaseAccount = async (uuid) => {
    if (!uuid) return Promise.reject(new Error(`Invalid uuid: ${uuid}`));
    const instance = AccountHelper.getInstance();
    // const response = autoAsyncRetry(instance.recycleAccount, uuid)
    //   .catch(err => console.error(err));
    const response = await instance.recycleAccount(uuid);
    return response;
  }

  baseReq = async (method, path, param) => {
    const env = this.getEnv();
    const options = {
      headers: {
        charset: 'UTF-8'
      },
      url: `${this._baseUrl}/${env}/account/${path}/${param}`,
      method,
      json: true
    };
    // TODO Replace with logger
    console.log(`${this._baseUrl}/${path}/${param}`);
    return new Promise((resolve, reject) => (request(options, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    })));
  }

  getAccount = async (scenarioTag) => {
    const response = await this.baseReq('GET', 'tag', scenarioTag);
    return response;
  }

  async getAccountByUUid(uuid) {
    const response = await this.baseReq('GET', 'id', uuid);
    return response;
  }

  lockAccount = async (uuid) => {
    const response = await this.baseReq('PUT', 'occupy', uuid);
    return response;
  }

  recycleAccount = async (uuid) => {
    const response = await this.baseReq('PUT', 'recycle', uuid);
    return response;
  }
}
