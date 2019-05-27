"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.map");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.set");

var _TransportBase2 = _interopRequireDefault(require("../TransportBase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* global chrome */
var ServerTransport =
/*#__PURE__*/
function (_TransportBase) {
  _inherits(ServerTransport, _TransportBase);

  function ServerTransport(options) {
    var _this;

    _classCallCheck(this, ServerTransport);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ServerTransport).call(this, _objectSpread({}, options, {
      name: 'ChromeTransport'
    })));
    _this._ports = new Set();
    _this._requests = new Map(); // Keep active tabs up to date

    _this._activeTabs = [];

    _this._getActiveTabs();

    chrome.tabs.onActivated.addListener(function () {
      _this._getActiveTabs();
    });
    chrome.runtime.onConnect.addListener(function (port) {
      if (port.name === 'transport') {
        _this._ports.add(port);

        port.onMessage.addListener(function (_ref) {
          var type = _ref.type,
              requestId = _ref.requestId,
              payload = _ref.payload;

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

  _createClass(ServerTransport, [{
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

      var isOnActiveTabs = function isOnActiveTabs(port) {
        // Ensure tabs are still accessible (may be closed)
        // otherwise, give up pushing messages to that tab at this point
        if (port.sender && port.sender.tab) {
          return !!_this2._activeTabs.find(function (tab) {
            return tab && tab.id === port.sender.tab.id;
          });
        }

        return false;
      }; // Since postMessage is really expensive,
      // we only send messages to those ports on active tabs.


      Array.from(this._ports).filter(function (port) {
        return isOnActiveTabs(port);
      }).forEach(function (port) {
        return port.postMessage(message);
      });
    }
  }, {
    key: "_getActiveTabs",
    value: function _getActiveTabs() {
      var _this3 = this;

      try {
        chrome.tabs.query({
          active: true
        }, function (tabs) {
          _this3._activeTabs = tabs;
        });
      } catch (error) {
        console.log(error);
      }
    }
  }]);

  return ServerTransport;
}(_TransportBase2["default"]);

exports["default"] = ServerTransport;
//# sourceMappingURL=ServerTransport.js.map
