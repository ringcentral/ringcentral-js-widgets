'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClientHistoryRequest = (_temp = _class = function () {
  function ClientHistoryRequest(requestContainer, client) {
    (0, _classCallCheck3.default)(this, ClientHistoryRequest);

    this._requestContainer = requestContainer;
    this._client = client.service.platform().client();
    this.init();
  }

  (0, _createClass3.default)(ClientHistoryRequest, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this._client.on(this._client.events.beforeRequest, function (apiResponse) {
        _this._requestContainer.set(apiResponse._request.url, null);
      });
      this._client.on(this._client.events.requestSuccess, function (apiResponse) {
        _this._requestContainer.set(apiResponse._request.url, JSON.parse(apiResponse._text));
      });
      this._client.on(this._client.events.requestError, function (error) {
        console.error(error);
      });
    }
  }, {
    key: 'getRawResponse',
    value: function getRawResponse(endPoint) {
      var rawResponse = null;
      this._requestContainer.forEach(function (value, key) {
        if (key.indexOf(endPoint) > -1) {
          rawResponse = value;
        }
      });
      if (rawResponse == null) {
        throw new Error('Cannot find rawResponse from endPoint:\'' + endPoint + '\'');
      } else {
        return rawResponse;
      }
    }
  }, {
    key: 'debugHistoryRequest',
    value: function debugHistoryRequest() {
      this._requestContainer.forEach(function (value, key) {
        console.debug('Request  URL:\'' + key + '\' Response:\'' + value + '\'');
      });
    }
  }, {
    key: 'requestLog',
    get: function get() {
      return this._requestContainer;
    }
  }]);
  return ClientHistoryRequest;
}(), _class.endPoints = {
  callLog: '/account/~/extension/~/call-log',
  dialingPlan: '/account/~/dialing-plan',
  token: '/restapi/oauth/token',
  companyPager: '/restapi/v1.0/account/~/extension/~/company-pager',
  sms: '/restapi/v1.0/account/~/extension/~/sms'
}, _temp);
exports.default = ClientHistoryRequest;
//# sourceMappingURL=ClientHistoryRequest.js.map
