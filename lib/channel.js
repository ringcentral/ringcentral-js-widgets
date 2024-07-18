"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.map");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Channel = void 0;
require("regenerator-runtime/runtime");
var _ObjectProxy = require("@ringcentral-integration/commons/lib/ObjectProxy");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Channel = /*#__PURE__*/function () {
  function Channel(type) {
    _classCallCheck(this, Channel);
    this._mux = {};
    this._type = void 0;
    this._type = type;
    this._make();
  }
  _createClass(Channel, [{
    key: "select",
    value: function select(actionType, handler) {
      this._mux[actionType] = handler;
      return this;
    }
  }, {
    key: "send",
    value: function () {
      var _send = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(packet) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return chrome.runtime.sendMessage(_objectSpread({
                  type: this._type
                }, packet));
              case 2:
                return _context.abrupt("return", _context.sent);
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function send(_x) {
        return _send.apply(this, arguments);
      }
      return send;
    }()
  }, {
    key: "broadcast",
    value: function () {
      var _broadcast = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(packet) {
        var _this = this;
        var tabs;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _ObjectProxy.proxyChrome.tabs.query({
                  discarded: false
                });
              case 2:
                tabs = _context2.sent;
                _context2.next = 5;
                return Promise.allSettled(tabs.map(function (tab) {
                  return _ObjectProxy.proxyChrome.tabs.sendMessage(tab.id, _objectSpread({
                    type: _this._type
                  }, packet));
                }));
              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      function broadcast(_x2) {
        return _broadcast.apply(this, arguments);
      }
      return broadcast;
    }()
  }, {
    key: "_make",
    value: function _make() {
      var _this2 = this;
      chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        var type = message.type,
          action = message.action;
        if (type === _this2._type) {
          var handler = _this2._mux[action];
          if (typeof handler === 'function') {
            Promise.resolve(handler(message, sender)).then(function (value) {
              sendResponse(value);
            })["catch"](function (err) {
              console.error(err);
              sendResponse();
            });
            // Async
            return true;
          }
        }
        return false;
      });
    }
  }]);
  return Channel;
}();
exports.Channel = Channel;
//# sourceMappingURL=channel.js.map
