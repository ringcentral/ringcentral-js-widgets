export default class ClientHistoryRequest {
  static endPoints = {
    callLog: '/restapi/v1.0/account/~/extension/~/call-log',
    dialingPlan: '/restapi/v1.0/account/~/dialing-plan',
    token: '/restapi/oauth/token',
    companyPager: '/restapi/v1.0/account/~/extension/~/company-pager',
    sms: '/restapi/v1.0/account/~/extension/~/sms',
    conferenceCall: '/restapi/v1.0/account/~/telephony/conference',
  };

  constructor(requestContainer, client) {
    this._requestContainer = requestContainer;
    this._client = client.service.client();
    this.init();
  }

  init() {
    this._client.on(this._client.events.beforeRequest, (request) => {
      this._requestContainer.set(request.url, null);
    });
    this._client.on(this._client.events.requestSuccess, async (response) => {
      const res = response.clone();
      this._requestContainer.set(res.url, await res.json());
    });
    this._client.on(this._client.events.requestError, async (error) => {
      console.error(error.request && error.request.url);
      console.error(error.response && (await error.response.clone().json()));
      console.error(error.response && error.response.status);
    });
  }

  getRawResponse(endPoint) {
    let rawResponse = null;
    this._requestContainer.forEach((value, key) => {
      if (key.indexOf(endPoint) > -1) {
        rawResponse = value;
      }
    });
    if (rawResponse == null) {
      throw new Error(`Cannot find rawResponse from endPoint:'${endPoint}'`);
    } else {
      return rawResponse;
    }
  }

  debugHistoryRequest() {
    this._requestContainer.forEach((value, key) => {
      console.debug(`Request  URL:'${key}' Response:'${value}'`);
    });
  }

  get requestLog() {
    return this._requestContainer;
  }
}
