"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.for-each");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ClientHistoryRequest = /*#__PURE__*/function () {
  function ClientHistoryRequest(requestContainer, client) {
    _classCallCheck(this, ClientHistoryRequest);

    this._requestContainer = requestContainer;
    this._client = client.service.platform().client();
    this.init();
  }

  _createClass(ClientHistoryRequest, [{
    key: "init",
    value: function init() {
      var _this = this;

      this._client.on(this._client.events.beforeRequest, function (apiResponse) {
        _this._requestContainer.set(apiResponse._request.url, null);
      });

      this._client.on(this._client.events.requestSuccess, function (apiResponse) {
        _this._requestContainer.set(apiResponse._request.url, JSON.parse(apiResponse._text));
      });

      this._client.on(this._client.events.requestError, function (error) {
        console.error(error.apiResponse._request && error.apiResponse.headers && error.apiResponse.json && error.apiResponse.json());
        console.error(error.apiResponse && error.apiResponse._response && error.apiResponse._response.status);
      });
    }
  }, {
    key: "getRawResponse",
    value: function getRawResponse(endPoint) {
      var rawResponse = null;

      this._requestContainer.forEach(function (value, key) {
        if (key.indexOf(endPoint) > -1) {
          rawResponse = value;
        }
      });

      if (rawResponse == null) {
        throw new Error("Cannot find rawResponse from endPoint:'".concat(endPoint, "'"));
      } else {
        return rawResponse;
      }
    }
  }, {
    key: "debugHistoryRequest",
    value: function debugHistoryRequest() {
      this._requestContainer.forEach(function (value, key) {
        console.debug("Request  URL:'".concat(key, "' Response:'").concat(value, "'"));
      });
    }
  }, {
    key: "requestLog",
    get: function get() {
      return this._requestContainer;
    }
  }]);

  return ClientHistoryRequest;
}();

exports["default"] = ClientHistoryRequest;
ClientHistoryRequest.endPoints = {
  callLog: '/account/~/extension/~/call-log',
  dialingPlan: '/account/~/dialing-plan',
  token: '/restapi/oauth/token',
  companyPager: '/restapi/v1.0/account/~/extension/~/company-pager',
  sms: '/restapi/v1.0/account/~/extension/~/sms',
  conferenceCall: '/restapi/v1.0/account/~/telephony/conference'
};
//# sourceMappingURL=ClientHistoryRequest.js.map
