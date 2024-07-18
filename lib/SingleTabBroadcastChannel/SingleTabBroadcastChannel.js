"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleTabBroadcastChannel = void 0;
require("regenerator-runtime/runtime");
var _utils = require("../../utils");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SingleTabBroadcastChannel = /*#__PURE__*/function () {
  _createClass(SingleTabBroadcastChannel, [{
    key: "tabId",
    get: function get() {
      return sessionStorage.getItem(this.key) || '';
    }
  }]);
  function SingleTabBroadcastChannel(key, option) {
    var checkTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3000;
    _classCallCheck(this, SingleTabBroadcastChannel);
    this.key = key;
    this.option = option;
    this.checkTime = checkTime;
    // @ts-expect-error TS(2564): Property '_req' has no initializer and is not defi... Remove this comment to see the full error message
    this._req = void 0;
    // @ts-expect-error TS(2564): Property '_res' has no initializer and is not defi... Remove this comment to see the full error message
    this._res = void 0;
  }
  _createClass(SingleTabBroadcastChannel, [{
    key: "onTabIdExist",
    value: function onTabIdExist() {
      var _this = this;
      return new Promise(function (resolve) {
        var intervalId = setInterval(function () {
          if (_this.tabId) {
            clearInterval(intervalId);
            _this.init();
            resolve(_this);
          }
        }, 300);
      });
    }
  }, {
    key: "init",
    value: function init() {
      this._req = new BroadcastChannel(this._createKey(this.option.from));
      this._res = new BroadcastChannel(this._createKey(this.option.to));
      return this;
    }
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(message) {
        var _this2 = this;
        var _resolve, listener, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                listener = function listener(_ref) {
                  var data = _ref.data;
                  var key = data.key,
                    value = data.value;
                  switch (key) {
                    case message.key:
                      _resolve(value);
                      break;
                    default:
                      break;
                  }
                };
                _context.prev = 1;
                _context.next = 4;
                return (0, _utils.waitUntilTo)(function () {
                  return new Promise(function (resolve) {
                    _resolve = resolve;
                    _this2._res.addEventListener('message', listener);
                    _this2._makeRequest(message);
                  });
                }, {
                  timeout: this.checkTime
                });
              case 4:
                result = _context.sent;
                return _context.abrupt("return", result);
              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", null);
              case 11:
                _context.prev = 11;
                // @ts-expect-error TS(2454): Variable '_resolve' is used before being assigned.
                _resolve();
                this._res.removeEventListener('message', listener);
                return _context.finish(11);
              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8, 11, 15]]);
      }));
      function request(_x) {
        return _request.apply(this, arguments);
      }
      return request;
    }()
  }, {
    key: "send",
    value: function send(message) {
      this._makeRequest(message);
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(cb) {
      this._res.onmessage = cb;
      return this;
    }
  }, {
    key: "_makeRequest",
    value: function _makeRequest(message) {
      this._req.postMessage(message);
    }
  }, {
    key: "_createKey",
    value: function _createKey(key) {
      return "".concat(this.key, "_").concat(key, "_channel$$_").concat(this.tabId);
    }
  }]);
  return SingleTabBroadcastChannel;
}();
exports.SingleTabBroadcastChannel = SingleTabBroadcastChannel;
//# sourceMappingURL=SingleTabBroadcastChannel.js.map
