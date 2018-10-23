import * as WebPhoneClient from 'webphone-client';
const TTL = 1800000;
const WAIT_TIMEOUT = 300000;

export default class WebPhone {

  async createWebPhone(phone, type, password) {
    let apiClient = new WebPhoneClient.ApiClient(this.getHost());
    let apiInstance = new WebPhoneClient.CreatePhoneApi(apiClient);
    let request = {
      env: this.getEnv(),
      type: type,
      phoneNumber: phone,
      password: password,
      TTL: TTL,
      reserve: false
    };
    let body = WebPhoneClient.CreateRequest.constructFromObject(request, null);
    let response = await this.statusChange(await apiInstance.phoneCreatePost(body), 'init');
    if (response.body.status === 'loginSuccess') {
      return response;
    } else {
      return console.error('problem with account sending request:', response.body);
    }
  }

  async getServerStatus() {
    let apiClient = new WebPhoneClient.ApiClient(this.getHost());
    let apiInstance = new WebPhoneClient.HealthCheckApi(apiClient);
    let response = await apiInstance.healthGet();
    return response;
  }

  async getAllAvailablePhones() {
    let apiClient = new WebPhoneClient.ApiClient(this.getHost());
    let apiInstance = new WebPhoneClient.ListPhoneApi(apiClient);
    let response = await apiInstance.phoneAvailableGet();
    return response;
  }

  async getAllPhones() {
    let apiClient = new WebPhoneClient.ApiClient(this.getHost());
    let apiInstance = new WebPhoneClient.ListPhoneApi(apiClient);
    let response = await apiInstance.phoneGet();
    return response;
  }

  async getPhonesById(phoneId) {
    let apiClient = new WebPhoneClient.ApiClient(this.getHost());
    let apiInstance = new WebPhoneClient.ListPhoneApi(apiClient);
    let response = await apiInstance.getPhoneById(phoneId);
    return response;
  }

  async getPhonesByNumber(phoneNumber) {
    let apiClient = new WebPhoneClient.ApiClient(this.getHost());
    let apiInstance = new WebPhoneClient.ListPhoneApi(apiClient);
    let response = await apiInstance.getPhoneByEnvAndNum(this.getEnv(), phoneNumber);
    return response;
  }

  async preOperate({ phoneId, sessionId, action, always = true }) {
    let apiClient = new WebPhoneClient.ApiClient(this.getHost());
    let apiInstance = new WebPhoneClient.PreOperatePhoneApi(apiClient);
    let request = {
      _id: phoneId,
      sessionId: sessionId,
      action: action,
      always: always
    };
    let body = WebPhoneClient.PreOperateReqeust.constructFromObject(request, null);
    let response = await apiInstance.phonePreOperatePost(body);
    return response;
  }
  async operate({ phoneId, sessionId, action, phoneNumber }) {
    let apiClient = new WebPhoneClient.ApiClient(this.getHost());
    let phoneStatus = (await this.getPhonesById(phoneId)).body.status;
    let apiInstance = new WebPhoneClient.OperatePhoneApi(apiClient);
    let request = {
      _id: phoneId,
      sessionId: sessionId,
      phoneNumber: phoneNumber,
      action: action
    };
    let body = WebPhoneClient.OperationReqeust.constructFromObject(request, null);
    let response = await this.statusChange(await apiInstance.phoneOperatePost(body), phoneStatus);
    return response;
  }

  getEnv() {
    let env;
    switch (context.options.config.env) {
      case 'xmnup':
        env = 'xmnup';
        break;
      case 'itl':
        env = 'itldevxmn';
        break;
      default:
        env = 'itldevxmn';
    }
    return env;
  }

  getHost() {
    return 'http://webphone.lab.nordigy.ru/api';
    // if (this.options.host) {
    //   return this.options.host;
    // } else {
    //   console.warn('WebPhone.host is not set, use default webphone host');
    //   return 'http://webphone.lab.nordigy.ru/api';
    // }
  }

  async statusChange(response, phoneStatus, timeout = WAIT_TIMEOUT) {
    let res = response;
    let phoneId = response.body._id;
    const waitUntil = Date.now() + timeout;
    while ((res.body.status === phoneStatus || res.body.status === 'pageReady') && Date.now() < waitUntil) {
      await this.sleep(1000);
      res = await this.getPhonesById(phoneId);
    }
    return res;
  }

  async sleep(msec) {
    console.log('PAUSE: ' + msec);
    return new Promise(resolve => setTimeout(resolve, msec));
  }

}

