export default class ClientHistoryRequest {

  static endPoints = {
    callLog: '/account/~/extension/~/call-log',
    dialingPlan: '/account/~/dialing-plan',
    token: '/restapi/oauth/token',
    companyPager: '/restapi/v1.0/account/~/extension/~/company-pager',
    sms: '/restapi/v1.0/account/~/extension/~/sms',
    conferenceCall: '/restapi/v1.0/account/~/telephony/conference',
  }

  constructor(requestContainer, client) {
    this._requestContainer = requestContainer;
    this._client = client.service.platform().client();
    this.init();
  }

  init() {
    this._client.on(this._client.events.beforeRequest, (apiResponse) => {
      this._requestContainer.set(apiResponse._request.url, null);
    });
    this._client.on(this._client.events.requestSuccess, (apiResponse) => {
      this._requestContainer.set(apiResponse._request.url, JSON.parse(apiResponse._text));
    });
    this._client.on(this._client.events.requestError, (error) => {
      console.error(error);
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
