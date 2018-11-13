import * as WebPhoneClient from 'webphone-client';

const HOST = 'http://webphone.lab.nordigy.ru';

const TTL = 1800000;
const WAIT_TIMEOUT = 300000;
const webPhoneEnvs = {
  xmnup: 'xmnup',
  itl: 'itldevxmn',
};

export const PhoneType = {
  PSTN: 'pstn',
  WebPhone: 'webphone'
};
export default class WebPhone {
  static async createWebPhone({
    phoneNumber, type, password, env
  }) {
    this._env = webPhoneEnvs[env];
    const apiClient = new WebPhoneClient.ApiClient(this.getHost());
    const apiInstance = new WebPhoneClient.CreatePhoneApi(apiClient);
    const request = {
      env: this._env,
      type,
      phoneNumber,
      password,
      TTL,
      reserve: false
    };
    const body = WebPhoneClient.CreateRequest.constructFromObject(request, null);
    const response = await this.statusChange(await apiInstance.phoneCreatePost(body), 'init');
    if (response.body.status !== 'loginSuccess') {
      console.error('problem with account sending request:', response.body);
      return null;
    }
    return response;
  }

  static async getServerStatus() {
    const apiClient = new WebPhoneClient.ApiClient(this.getHost());
    const apiInstance = new WebPhoneClient.HealthCheckApi(apiClient);
    const response = await apiInstance.healthGet();
    return response;
  }

  static async getAllAvailablePhones() {
    const apiClient = new WebPhoneClient.ApiClient(this.getHost());
    const apiInstance = new WebPhoneClient.ListPhoneApi(apiClient);
    const response = await apiInstance.phoneAvailableGet();
    return response;
  }

  static async getAllPhones() {
    const apiClient = new WebPhoneClient.ApiClient(this.getHost());
    const apiInstance = new WebPhoneClient.ListPhoneApi(apiClient);
    const response = await apiInstance.phoneGet();
    return response;
  }

  static async getPhonesById(phoneId) {
    const apiClient = new WebPhoneClient.ApiClient(this.getHost());
    const apiInstance = new WebPhoneClient.ListPhoneApi(apiClient);
    const response = await apiInstance.getPhoneById(phoneId);
    return response;
  }

  static async getPhonesByNumber(phoneNumber, env) {
    this._env = webPhoneEnvs[env];
    const apiClient = new WebPhoneClient.ApiClient(this.getHost());
    const apiInstance = new WebPhoneClient.ListPhoneApi(apiClient);
    const response = await apiInstance.getPhoneByEnvAndNum(this._env, phoneNumber);
    return response;
  }

  static async preOperate({ phoneId, sessionId, action, always = true }) {
    const apiClient = new WebPhoneClient.ApiClient(this.getHost());
    const apiInstance = new WebPhoneClient.PreOperatePhoneApi(apiClient);
    const request = {
      _id: phoneId,
      sessionId,
      action,
      always
    };
    const body = WebPhoneClient.PreOperateReqeust.constructFromObject(request, null);
    const response = await apiInstance.phonePreOperatePost(body);
    return response;
  }
  static async operate({ phoneId, sessionId, action, phoneNumber }) {
    //TODO 
    const apiClient = new WebPhoneClient.ApiClient(this.getHost());
    const phoneStatus = (await this.getPhonesById(phoneId)).body.status;
    const apiInstance = new WebPhoneClient.OperatePhoneApi(apiClient);
    const request = {
      _id: phoneId,
      sessionId,
      phoneNumber,
      action
    };
    const body = WebPhoneClient.OperationReqeust.constructFromObject(request, null);
    const response = await this.statusChange(await apiInstance.phoneOperatePost(body), phoneStatus);
    return response;
  }

  static getHost() {
    return `${HOST}/api`;
  }

  static async statusChange(response, phoneStatus, timeout = WAIT_TIMEOUT) {
    let res = response;
    const phoneId = response.body._id;
    const waitUntil = Date.now() + timeout;
    while ((res.body.status === phoneStatus || res.body.status === 'pageReady') && Date.now() < waitUntil) {
      await this.sleep(1000);
      res = await this.getPhonesById(phoneId);
    }
    return res;
  }

  static async sleep(msec) {
    console.log(`PAUSE: ${msec}`);
    return new Promise(resolve => setTimeout(resolve, msec));
  }
}

