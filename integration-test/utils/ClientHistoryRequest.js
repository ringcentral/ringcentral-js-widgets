"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("regenerator-runtime/runtime");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
