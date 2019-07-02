"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.bind");

var _RcModule2 = _interopRequireDefault(require("ringcentral-integration/lib/RcModule"));

var _di = require("ringcentral-integration/lib/di");

var _ensureExist = _interopRequireDefault(require("ringcentral-integration/lib/ensureExist"));

var _selector = require("ringcentral-integration/lib/selector");

var _proxify = _interopRequireDefault(require("ringcentral-integration/lib/proxy/proxify"));

var _moduleStatuses = _interopRequireDefault(require("ringcentral-integration/enums/moduleStatuses"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getConnectivityMangerReducer = _interopRequireDefault(require("./getConnectivityMangerReducer"));

var _connectivityTypes = _interopRequireDefault(require("./connectivityTypes"));

var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var ConnectivityManager = (
/**
 * @class
 * @description Connectivity monitor module
 */
_dec = (0, _di.Module)({
  deps: ['Alert', 'OAuth', 'Auth', 'ConnectivityMonitor', 'AvailabilityMonitor', {
    dep: 'CallingSettings',
    optional: true
  }, {
    dep: 'AudioSettings',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_RcModule) {
  _inherits(ConnectivityManager, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Alert} params.alert - alert module instance
   * @param {Client} params.client - client module instance
   * @param {Environment} params.environment - environment module instance
   * @param {Number} params.timeToRetry - time to Retry
   * @param {Number} params.heartBeatInterval - heart beat interval
   * @param {Function} params.checkConnectionFunc - function to check network
   */
  function ConnectivityManager(_ref) {
    var _context;

    var _this;

    var auth = _ref.auth,
        oAuth = _ref.oAuth,
        alert = _ref.alert,
        callingSettings = _ref.callingSettings,
        audioSettings = _ref.audioSettings,
        webphone = _ref.webphone,
        connectivityMonitor = _ref.connectivityMonitor,
        availabilityMonitor = _ref.availabilityMonitor,
        options = _objectWithoutProperties(_ref, ["auth", "oAuth", "alert", "callingSettings", "audioSettings", "webphone", "connectivityMonitor", "availabilityMonitor"]);

    _classCallCheck(this, ConnectivityManager);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConnectivityManager).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes["default"]
    })));

    _initializerDefineProperty(_this, "connectivityType", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "mode", _descriptor2, _assertThisInitialized(_this));

    _this._auth = auth;
    _this._oAuth = oAuth;
    _this._callingSettings = callingSettings;
    _this._audioSettings = audioSettings;
    _this._webphone = webphone;
    _this._availabilityMonitor = availabilityMonitor;
    _this._alert = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, alert, 'alert');
    _this._connectivityMonitor = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, connectivityMonitor, 'connectivityMonitor');
    _this._reducer = (0, _getConnectivityMangerReducer["default"])(_this.actionTypes);
    _this.showConnectivityAlert = (_context = _assertThisInitialized(_this), _this.showConnectivityAlert).bind(_context);
    _this.checkWebphoneAndConnect = (_context = _assertThisInitialized(_this), _this.checkWebphoneAndConnect).bind(_context);
    _this._oldConnectivityType = '';
    return _this;
  }

  _createClass(ConnectivityManager, [{
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this._shouldInit()) {
                  this.store.dispatch({
                    type: this.actionTypes.initSuccess
                  });
                } else if (this.ready && this.connectivityType !== this._oldConnectivityType) {
                  this._oldConnectivityType = this.connectivityType;
                  this.showConnectivityAlert();
                }

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _onStateChange2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return (!this._callingSettings || this._callingSettings.ready) && (!this._audioSettings || this._audioSettings.ready) && (!this._webphone || this._webphone.ready) && (!this._availabilityMonitor || this._availabilityMonitor.ready) && this.pending;
    }
  }, {
    key: "checkWebphoneAndConnect",
    value: function checkWebphoneAndConnect() {
      if (!this._callingSettings || !this._callingSettings.ready || !this._callingSettings.isWebphoneMode) {
        return;
      }

      if (this._audioSettings && this._audioSettings.ready) {
        this._audioSettings.showAlert();

        this._audioSettings.getUserMedia();
      }

      if (this._webphone && this._webphone.ready) {
        this._webphone.connect();
      }
    }
  }, {
    key: "checkStatus",
    value: function checkStatus() {
      if (!this._availabilityMonitor) {
        return;
      }

      this._availabilityMonitor.healthCheck();
    }
  }, {
    key: "_showAlert",
    value: function _showAlert(message) {
      if (message) {
        this._alert.danger({
          message: message,
          allowDuplicates: false
        });
      }
    }
  }, {
    key: "_hideAlerts",
    value: function _hideAlerts() {
      var alertIds = this._alert.messages.filter(function (m) {
        for (var type in _connectivityTypes["default"]) {
          if (m.message === _connectivityTypes["default"][type]) return true;
        }

        return false;
      }).map(function (m) {
        return m.id;
      });

      if (alertIds.length) {
        this._alert.dismiss(alertIds);
      }
    }
  }, {
    key: "showConnectivityAlert",
    value: function showConnectivityAlert() {
      if (!this.connectivityType || this.connectivityType === _connectivityTypes["default"].webphoneUnavailable) {
        this._hideAlerts();
      } else {
        this._showAlert(this.connectivityType);
      }
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "pending",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].pending;
    }
  }, {
    key: "webphoneAvailable",
    get: function get() {
      return this._webphone && this._callingSettings && this._audioSettings && this._audioSettings.ready && this._callingSettings.ready && this._auth.ready && this._auth.loggedIn && this._callingSettings.isWebphoneMode && this._audioSettings.userMedia && this._webphone.connected;
    }
  }, {
    key: "isWebphoneInitializing",
    get: function get() {
      return this._callingSettings.isWebphoneMode && (!this._webphone.ready || this._webphone.disconnected || this._webphone.connectionStatus === null || this._webphone.connecting || this._webphone.connectFailed);
    }
  }, {
    key: "webphoneConnecting",
    get: function get() {
      return this._webphone && this._webphone.ready && (this._webphone.connecting || this._webphone.reconnecting);
    }
  }, {
    key: "webphoneUnavailable",
    get: function get() {
      return this._webphone && this._callingSettings && this._audioSettings && this._audioSettings.ready && this._auth.ready && this._auth.loggedIn && this._callingSettings.isWebphoneMode && (!this._audioSettings.userMedia || this._webphone.reconnecting || this._webphone.connectError);
    }
  }, {
    key: "proxyRetryCount",
    get: function get() {
      return this._oAuth && this._oAuth.proxyRetryCount > 0;
    }
  }, {
    key: "isVoIPOnlyModeActivated",
    get: function get() {
      return !!this._availabilityMonitor && this._availabilityMonitor.isVoIPOnlyMode;
    }
  }, {
    key: "isLimitedModeActivated",
    get: function get() {
      return !!this._availabilityMonitor && this._availabilityMonitor.isLimitedMode;
    }
  }, {
    key: "hasLimitedStatusError",
    get: function get() {
      return !!this._availabilityMonitor && this._availabilityMonitor.hasLimitedStatusError;
    }
  }, {
    key: "isWebphoneUnavailableMode",
    get: function get() {
      return this.mode === _connectivityTypes["default"].webphoneUnavailable;
    }
  }, {
    key: "isOfflineMode",
    get: function get() {
      return this.mode === _connectivityTypes["default"].offline;
    }
  }, {
    key: "isVoipOnlyMode",
    get: function get() {
      return this.mode === _connectivityTypes["default"].voipOnly;
    }
  }]);

  return ConnectivityManager;
}(_RcModule2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "checkWebphoneAndConnect", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "checkWebphoneAndConnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkStatus", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "checkStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showConnectivityAlert", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "showConnectivityAlert"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "connectivityType", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return [function () {
      return _this3._connectivityMonitor.networkLoss;
    }, function () {
      return _this3._connectivityMonitor.connectivity;
    }, function () {
      return _this3.proxyRetryCount;
    }, function () {
      return _this3.isVoIPOnlyModeActivated;
    }, function () {
      return _this3.isLimitedModeActivated;
    }, function () {
      return _this3.webphoneAvailable;
    }, function () {
      return _this3.webphoneUnavailable;
    }, function (networkLoss, connectivity, proxyRetryCount, isVoIPOnlyModeActivated, isLimitedModeActivated, webphoneAvailable, webphoneUnavailable) {
      if (networkLoss) return _connectivityTypes["default"].networkLoss;
      if (proxyRetryCount) return _connectivityTypes["default"].offline;
      if (!connectivity) return _connectivityTypes["default"].offline;

      if (isVoIPOnlyModeActivated) {
        if (webphoneAvailable) return _connectivityTypes["default"].voipOnly;
        return _connectivityTypes["default"].serverUnavailable;
      }

      if (webphoneUnavailable) return _connectivityTypes["default"].webphoneUnavailable;
      if (isLimitedModeActivated) return _connectivityTypes["default"].survival;
      return null;
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "mode", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;

    return [function () {
      return _this4.connectivityType;
    }, function (connectivityType) {
      if (connectivityType === _connectivityTypes["default"].networkLoss || connectivityType === _connectivityTypes["default"].serverUnavailable) return _connectivityTypes["default"].offline;
      return connectivityType;
    }];
  }
})), _class2)) || _class);
exports["default"] = ConnectivityManager;
//# sourceMappingURL=index.js.map
