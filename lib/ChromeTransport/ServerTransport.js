"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.reflect.construct.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerTransport = void 0;
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _ObjectProxy = require("../ObjectProxy");
var _TransportBase2 = require("../TransportBase");
var _constants = require("./constants");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/* global chrome */
var ServerTransport = exports.ServerTransport = /*#__PURE__*/function (_TransportBase) {
  function ServerTransport() {
    var _this;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, ServerTransport);
    _this = _callSuper(this, ServerTransport, [_objectSpread(_objectSpread({}, options), {}, {
      name: _constants.TRANSPORT_NAME
    })]);

    // Get current tabs
    _this._activeTabIds = new Set();
    _this._ports = new Set();
    _this._requests = new Map();
    _this._getActiveTabIds();
    // Keep active tabs up to date
    _ObjectProxy.proxyChrome.tabs.onActivated.addListener(function () {
      return _this._getActiveTabIds();
    });
    chrome.runtime.onConnect.addListener(function (port) {
      if (port.name === _constants.CONNECT_PORT_NAME) {
        _this._ports.add(port);
        port.onMessage.addListener(function (_ref) {
          var type = _ref.type,
            requestId = _ref.requestId,
            payload = _ref.payload;
          if (type === _this._events.send) {
            _this.emit(_this._events.send, payload);
          }
          if (type === _this._events.request && requestId && payload) {
            _this._requests.set(requestId, port);
            _this.emit(_this._events.request, {
              requestId: requestId,
              payload: payload
            });
          }
        });
        port.onDisconnect.addListener(function () {
          _this._ports["delete"](port);
        });
      }
    });
    return _this;
  }
  _inherits(ServerTransport, _TransportBase);
  return _createClass(ServerTransport, [{
    key: "response",
    value: function response(_ref2) {
      var requestId = _ref2.requestId,
        result = _ref2.result,
        error = _ref2.error;
      var port = this._requests.get(requestId);
      if (port) {
        this._requests["delete"](requestId);
        if (error instanceof Error) {
          error = error.message;
        }
        port.postMessage({
          type: this._events.response,
          requestId: requestId,
          result: result,
          error: error
        });
      }
    }
  }, {
    key: "push",
    value: function push(_ref3) {
      var _this2 = this;
      var payload = _ref3.payload;
      var message = {
        type: this._events.push,
        payload: payload
      };
      // Since postMessage is really expensive,
      // we only send messages to those ports on active tabs.
      this._ports.forEach(function (port) {
        var _port$sender, _port$sender$tab;
        if (((_port$sender = port.sender) === null || _port$sender === void 0 ? void 0 : (_port$sender$tab = _port$sender.tab) === null || _port$sender$tab === void 0 ? void 0 : _port$sender$tab.id) && (
        // send to all instances if app failed to query active tabs
        !_this2._activeTabIds.size || _this2._activeTabIds.has(port.sender.tab.id))) {
          port.postMessage(message);
        }
      });
    }
  }, {
    key: "_getActiveTabIds",
    value: function _getActiveTabIds() {
      var _this3 = this;
      try {
        _ObjectProxy.proxyChrome.tabs.query({
          active: true
        }, function (tabs) {
          _this3._activeTabIds.clear();
          if (Array.isArray(tabs)) {
            tabs.forEach(function (tab) {
              if (tab.id) {
                _this3._activeTabIds.add(tab.id);
              }
            });
          }
        });
      } catch (error) {
        console.log('[ServerTransport]', error);
      }
    }
  }, {
    key: "send",
    value: function send(_ref4) {
      var payload = _ref4.payload;
      var message = {
        type: this._events.send,
        payload: payload
      };
      // Since postMessage is really expensive,
      // we only send messages to those ports on active tabs.
      this._ports.forEach(function (port) {
        var _port$sender2, _port$sender2$tab;
        if ((_port$sender2 = port.sender) === null || _port$sender2 === void 0 ? void 0 : (_port$sender2$tab = _port$sender2.tab) === null || _port$sender2$tab === void 0 ? void 0 : _port$sender2$tab.id // TODO: implement change active tab for syncing state
        // send to all instances if app failed to query active tabs
        // (!this._activeTabIds.size || this._activeTabIds.has(port.sender.tab.id))
        ) {
          port.postMessage(message);
        }
      });
    }
  }]);
}(_TransportBase2.TransportBase);
//# sourceMappingURL=ServerTransport.js.map
