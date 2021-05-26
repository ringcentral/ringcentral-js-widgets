"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ClientHistoryRequest = /*#__PURE__*/function () {
  function ClientHistoryRequest(requestContainer, client) {
    _classCallCheck(this, ClientHistoryRequest);

    this._requestContainer = requestContainer;
    this._client = client.service.client();
    this.init();
  }

  _createClass(ClientHistoryRequest, [{
    key: "init",
    value: function init() {
      var _this = this;

      this._client.on(this._client.events.beforeRequest, function (request) {
        _this._requestContainer.set(request.url, null);
      });

      this._client.on(this._client.events.requestSuccess, /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(response) {
          var res;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  res = response.clone();
                  _context.t0 = _this._requestContainer;
                  _context.t1 = res.url;
                  _context.next = 5;
                  return res.json();

                case 5:
                  _context.t2 = _context.sent;

                  _context.t0.set.call(_context.t0, _context.t1, _context.t2);

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());

      this._client.on(this._client.events.requestError, /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(error) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  console.error(error.request && error.request.url);
                  _context2.t0 = console;
                  _context2.t1 = error.response;

                  if (!_context2.t1) {
                    _context2.next = 7;
                    break;
                  }

                  _context2.next = 6;
                  return error.response.clone().json();

                case 6:
                  _context2.t1 = _context2.sent;

                case 7:
                  _context2.t2 = _context2.t1;

                  _context2.t0.error.call(_context2.t0, _context2.t2);

                  console.error(error.response && error.response.status);

                case 10:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }());
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
  callLog: '/restapi/v1.0/account/~/extension/~/call-log',
  dialingPlan: '/restapi/v1.0/account/~/dialing-plan',
  token: '/restapi/oauth/token',
  companyPager: '/restapi/v1.0/account/~/extension/~/company-pager',
  sms: '/restapi/v1.0/account/~/extension/~/sms',
  conferenceCall: '/restapi/v1.0/account/~/telephony/conference'
};
//# sourceMappingURL=ClientHistoryRequest.js.map
