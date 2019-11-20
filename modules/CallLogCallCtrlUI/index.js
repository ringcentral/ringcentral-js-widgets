"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.function.bind");

var _di = require("ringcentral-integration/lib/di");

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _dec, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CallLogCallCtrlUI = (_dec = (0, _di.Module)({
  name: 'CallLogCallCtrlUI',
  deps: ['ActiveCallControl', 'ConnectivityMonitor', 'RateLimiter', 'RouterInteraction']
}), _dec(_class = (_temp =
/*#__PURE__*/
function (_RcUIModule) {
  _inherits(CallLogCallCtrlUI, _RcUIModule);

  function CallLogCallCtrlUI(_ref) {
    var _this;

    var activeCallControl = _ref.activeCallControl,
        connectivityMonitor = _ref.connectivityMonitor,
        rateLimiter = _ref.rateLimiter,
        routerInteraction = _ref.routerInteraction,
        options = _objectWithoutProperties(_ref, ["activeCallControl", "connectivityMonitor", "rateLimiter", "routerInteraction"]);

    _classCallCheck(this, CallLogCallCtrlUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CallLogCallCtrlUI).call(this, _objectSpread({}, options)));
    _this._activeCallControl = void 0;
    _this._connectivityMonitor = void 0;
    _this._rateLimiter = void 0;
    _this._routerInteraction = void 0;
    _this._activeCallControl = activeCallControl;
    _this._connectivityMonitor = connectivityMonitor;
    _this._rateLimiter = rateLimiter;
    _this._routerInteraction = routerInteraction;
    return _this;
  }

  _createClass(CallLogCallCtrlUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref2) {
      var telephonySessionId = _ref2.telephonySessionId;

      var currentSession = this._activeCallControl.getActiveSession(telephonySessionId);

      return {
        currentSession: currentSession,
        disableLinks: !this._connectivityMonitor.connectivity || this._rateLimiter.throttling,
        telephonySessionId: telephonySessionId
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this2 = this;

      return {
        mute: this._activeCallControl.mute.bind(this._activeCallControl),
        unmute: this._activeCallControl.unmute.bind(this._activeCallControl),
        hangUp: this._activeCallControl.hangUp.bind(this._activeCallControl),
        reject: this._activeCallControl.reject.bind(this._activeCallControl),
        onHold: this._activeCallControl.hold.bind(this._activeCallControl),
        onUnHold: this._activeCallControl.unhold.bind(this._activeCallControl),
        onTransfer: function onTransfer(telephonySessionId) {
          return _this2._routerInteraction.push("/transfer/".concat(telephonySessionId, "/active"));
        }
      };
    }
  }]);

  return CallLogCallCtrlUI;
}(_RcUIModule2["default"]), _temp)) || _class);
exports["default"] = CallLogCallCtrlUI;
//# sourceMappingURL=index.js.map
