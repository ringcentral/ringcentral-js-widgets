"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.map");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectivityManager = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _core = require("@ringcentral-integration/core");
var _connectivityTypes = require("./connectivityTypes");
var _dec, _dec2, _dec3, _class, _class2;
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
var ConnectivityManager = (_dec = (0, _di.Module)({
  name: 'ConnectivityManager',
  deps: ['Alert', 'OAuth', 'Auth', 'ConnectivityMonitor', {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'CallingSettings',
    optional: true
  }, {
    dep: 'AudioSettings',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.connectivityMonitor.networkLoss, that._deps.connectivityMonitor.connectivity, that.proxyRetryCount, that.isVoIPOnlyModeActivated, that.isLimitedModeActivated, that.webphoneAvailable, that.webphoneUnavailable];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.connectivityType];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(ConnectivityManager, _RcModuleV);
  var _super = _createSuper(ConnectivityManager);
  function ConnectivityManager(deps) {
    _classCallCheck(this, ConnectivityManager);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(ConnectivityManager, [{
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this = this;
      (0, _core.watch)(this, function () {
        return _this.connectivityType;
      }, function () {
        if (_this.ready) {
          _this.showConnectivityAlert();
        }
      });
    }
  }, {
    key: "checkWebphoneAndConnect",
    value: function () {
      var _checkWebphoneAndConnect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!this._deps.callingSettings || this._deps.callingSettings && (!this._deps.callingSettings.ready || !this._deps.callingSettings.isWebphoneMode))) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return");
              case 2:
                if (this._deps.audioSettings && this._deps.audioSettings.ready) {
                  this._deps.audioSettings.showAlert();
                  this._deps.audioSettings.getUserMedia();
                }
                if (this._deps.webphone && this._deps.webphone.ready) {
                  this._deps.webphone.connect({
                    force: true,
                    skipConnectDelay: true
                  });
                }
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function checkWebphoneAndConnect() {
        return _checkWebphoneAndConnect.apply(this, arguments);
      }
      return checkWebphoneAndConnect;
    }()
  }, {
    key: "checkStatus",
    value: function () {
      var _checkStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this._deps.availabilityMonitor) {
                  _context2.next = 2;
                  break;
                }
                return _context2.abrupt("return");
              case 2:
                this._deps.availabilityMonitor.healthCheck();
              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function checkStatus() {
        return _checkStatus.apply(this, arguments);
      }
      return checkStatus;
    }()
  }, {
    key: "_showAlert",
    value: function _showAlert(message) {
      if (message) {
        this._deps.alert.danger({
          message: message,
          allowDuplicates: false
        });
      }
    }
  }, {
    key: "_hideAlerts",
    value: function _hideAlerts() {
      var alertIds = this._deps.alert.messages.filter(function (m) {
        for (var type in _connectivityTypes.connectivityTypes) {
          if (m.message === _connectivityTypes.connectivityTypes[type]) return true;
        }
        return false;
      }).map(function (m) {
        return m.id;
      });
      if (alertIds.length) {
        this._deps.alert.dismiss(alertIds);
      }
    }
  }, {
    key: "showConnectivityAlert",
    value: function () {
      var _showConnectivityAlert = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.connectivityType || this.connectivityType === _connectivityTypes.connectivityTypes.webphoneUnavailable) {
                  this._hideAlerts();
                } else {
                  this._showAlert(this.connectivityType);
                }
              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function showConnectivityAlert() {
        return _showConnectivityAlert.apply(this, arguments);
      }
      return showConnectivityAlert;
    }()
  }, {
    key: "webphoneAvailable",
    get: function get() {
      return this._deps.webphone && this._deps.callingSettings && this._deps.audioSettings && this._deps.audioSettings.ready && this._deps.callingSettings.ready && this._deps.auth.ready && this._deps.auth.loggedIn && this._deps.callingSettings.isWebphoneMode && this._deps.audioSettings.userMedia && this._deps.webphone.connected;
    }
  }, {
    key: "isWebphoneInitializing",
    get: function get() {
      var _this$_deps$callingSe;
      return !!((_this$_deps$callingSe = this._deps.callingSettings) === null || _this$_deps$callingSe === void 0 ? void 0 : _this$_deps$callingSe.isWebphoneMode) && (
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      !this._deps.webphone.ready ||
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this._deps.webphone.disconnected ||
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this._deps.webphone.connecting ||
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      this._deps.webphone.connectFailed);
    }
  }, {
    key: "webphoneConnecting",
    get: function get() {
      var _this$_deps$webphone;
      return !!((_this$_deps$webphone = this._deps.webphone) === null || _this$_deps$webphone === void 0 ? void 0 : _this$_deps$webphone.ready) && (this._deps.webphone.connecting || this._deps.webphone.reconnecting);
    }
  }, {
    key: "webphoneUnavailable",
    get: function get() {
      return this._deps.webphone && this._deps.callingSettings && this._deps.audioSettings && this._deps.audioSettings.ready && this._deps.auth.ready && this._deps.auth.loggedIn && this._deps.callingSettings.isWebphoneMode && (!this._deps.audioSettings.userMedia || this._deps.webphone.reconnecting || this._deps.webphone.connectError || this._deps.webphone.inactive);
    } // TODO: fix oAuth type
  }, {
    key: "proxyRetryCount",
    get: function get() {
      // @ts-expect-error TS(2339): Property 'proxyRetryCount' does not exist on type ... Remove this comment to see the full error message
      return this._deps.oAuth && this._deps.oAuth.proxyRetryCount > 0;
    }
  }, {
    key: "isVoIPOnlyModeActivated",
    get: function get() {
      return !!this._deps.availabilityMonitor && this._deps.availabilityMonitor.isVoIPOnlyMode;
    }
  }, {
    key: "isLimitedModeActivated",
    get: function get() {
      return !!this._deps.availabilityMonitor && this._deps.availabilityMonitor.isLimitedMode;
    }
  }, {
    key: "hasLimitedStatusError",
    get: function get() {
      return !!this._deps.availabilityMonitor && this._deps.availabilityMonitor.hasLimitedStatusError;
    }
  }, {
    key: "connectivityType",
    get: function get() {
      if (this._deps.connectivityMonitor.networkLoss) return _connectivityTypes.connectivityTypes.networkLoss;
      if (this.proxyRetryCount) return _connectivityTypes.connectivityTypes.offline;
      if (!this._deps.connectivityMonitor.connectivity) return _connectivityTypes.connectivityTypes.offline;
      if (this.isVoIPOnlyModeActivated) {
        if (this.webphoneAvailable) return _connectivityTypes.connectivityTypes.voipOnly;
        return _connectivityTypes.connectivityTypes.serverUnavailable;
      }
      if (this.webphoneUnavailable) return _connectivityTypes.connectivityTypes.webphoneUnavailable;
      if (this.isLimitedModeActivated) return _connectivityTypes.connectivityTypes.survival;
      return null;
    }
  }, {
    key: "mode",
    get: function get() {
      if (this.connectivityType === _connectivityTypes.connectivityTypes.networkLoss || this.connectivityType === _connectivityTypes.connectivityTypes.serverUnavailable) return _connectivityTypes.connectivityTypes.offline;
      return this.connectivityType;
    }
  }, {
    key: "isWebphoneUnavailableMode",
    get: function get() {
      return this.mode === _connectivityTypes.connectivityTypes.webphoneUnavailable;
    }
  }, {
    key: "isOfflineMode",
    get: function get() {
      return this.mode === _connectivityTypes.connectivityTypes.offline;
    }
  }, {
    key: "isVoipOnlyMode",
    get: function get() {
      return this.mode === _connectivityTypes.connectivityTypes.voipOnly;
    }
  }]);
  return ConnectivityManager;
}(_core.RcModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "checkWebphoneAndConnect", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "checkWebphoneAndConnect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkStatus", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "checkStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showConnectivityAlert", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "showConnectivityAlert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connectivityType", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "connectivityType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mode", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "mode"), _class2.prototype)), _class2)) || _class);
exports.ConnectivityManager = ConnectivityManager;
//# sourceMappingURL=ConnectivityManager.js.map
