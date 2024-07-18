"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Environment = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _sdk = require("@ringcentral/sdk");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _enabledDataTrackingTimestamp = require("./enabledDataTrackingTimestamp");
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_RECORDING_HOST = 'https://apps.ringcentral.com/integrations/recording/v3.0/rc/index.html';
var TWO_HOURS_IN_MILLISECONDS = 2 * 60 * 60 * 1000;
var Environment = (_dec = (0, _di.Module)({
  name: 'Environment',
  deps: ['Client', 'GlobalStorage', 'SdkConfig', {
    dep: 'EnvironmentOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Environment, _RcModuleV);
  var _super = _createSuper(Environment);
  function Environment(deps) {
    var _this;
    _classCallCheck(this, Environment);
    _this = _super.call(this, {
      deps: deps,
      enableGlobalCache: true,
      storageKey: 'environment'
    });
    _initializerDefineProperty(_this, "server", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "recordingHostState", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "enabled", _descriptor3, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "changeCounter", _descriptor4, _assertThisInitialized(_this));
    _this.recordingHostState = _this._defaultRecordingHost;
    return _this;
  }
  _createClass(Environment, [{
    key: "onInit",
    value: function onInit() {
      if (this.enabled) {
        this.changeEnvironment();
      }
    }
  }, {
    key: "setEnvData",
    value: function setEnvData(_ref) {
      var server = _ref.server,
        recordingHost = _ref.recordingHost,
        enabled = _ref.enabled,
        allowDataTracking = _ref.allowDataTracking;
      this.server = server;
      this.recordingHostState = recordingHost;
      this.enabled = enabled;
      _enabledDataTrackingTimestamp.localStorageDataTrackingTimestamp.set(allowDataTracking ? Date.now() : null);
    }
  }, {
    key: "updateChangeCounter",
    value: function updateChangeCounter() {
      this.changeCounter++;
    }
  }, {
    key: "changeEnvironment",
    value: function () {
      var _changeEnvironment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var sdkConfig, discovery, _discovery$removeExte, _discovery$removeInit;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sdkConfig = this.getSdkConfig();
                if (!sdkConfig.enableDiscovery) {
                  _context.next = 8;
                  break;
                }
                // Clear discovery data before switching to new env
                discovery = this._deps.client.service.platform().discovery();
                if (!discovery) {
                  _context.next = 8;
                  break;
                }
                _context.next = 6;
                return (_discovery$removeExte = discovery.removeExternalData) === null || _discovery$removeExte === void 0 ? void 0 : _discovery$removeExte.call(discovery);
              case 6:
                _context.next = 8;
                return (_discovery$removeInit = discovery.removeInitialData) === null || _discovery$removeInit === void 0 ? void 0 : _discovery$removeInit.call(discovery);
              case 8:
                this._deps.client.service = new _sdk.SDK(sdkConfig);
                if (sdkConfig.enableDiscovery && sdkConfig.discoveryAutoInit === false) {
                  // make sure to init discovery API if discoveryAutoInit is deliberately set to false
                  this._deps.client.service.platform().initDiscovery();
                }
              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function changeEnvironment() {
        return _changeEnvironment.apply(this, arguments);
      }
      return changeEnvironment;
    }()
  }, {
    key: "getSdkConfig",
    value: function getSdkConfig() {
      var newConfig = _objectSpread({}, this._deps.sdkConfig);
      if (this.enabled) {
        newConfig.server = this.server;
        newConfig.discoveryServer = this.server;
      }
      return newConfig;
    }
  }, {
    key: "setData",
    value: function () {
      var _setData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
        var server, recordingHost, enabled, _ref2$allowDataTracki, allowDataTracking, _ref2$environmentChan, environmentChanged, isEnvChanged;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                server = _ref2.server, recordingHost = _ref2.recordingHost, enabled = _ref2.enabled, _ref2$allowDataTracki = _ref2.allowDataTracking, allowDataTracking = _ref2$allowDataTracki === void 0 ? false : _ref2$allowDataTracki, _ref2$environmentChan = _ref2.environmentChanged, environmentChanged = _ref2$environmentChan === void 0 ? false : _ref2$environmentChan;
                // `recordingHost` change no need to set to SDK
                isEnvChanged = environmentChanged || this.enabled !== enabled || enabled && this.server !== server;
                this.setEnvData({
                  server: server,
                  recordingHost: recordingHost,
                  enabled: enabled,
                  allowDataTracking: allowDataTracking
                });
                if (!isEnvChanged) {
                  _context2.next = 7;
                  break;
                }
                _context2.next = 6;
                return this.changeEnvironment();
              case 6:
                // notify change at last
                this.updateChangeCounter();
              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function setData(_x) {
        return _setData.apply(this, arguments);
      }
      return setData;
    }()
  }, {
    key: "enabledDataTrackingTimestamp",
    get: function get() {
      return _enabledDataTrackingTimestamp.localStorageDataTrackingTimestamp.get();
    }
  }, {
    key: "recordingHost",
    get: function get() {
      return this.enabled ? this.recordingHostState : this._defaultRecordingHost;
    }
  }, {
    key: "allowDataTracking",
    get: function get() {
      if (!this.useDataTrackingSetting) return true;
      var timestamp = this.enabledDataTrackingTimestamp;
      if (!timestamp) return false;
      var isWithinTwoHours = Date.now() - timestamp < TWO_HOURS_IN_MILLISECONDS;
      if (!isWithinTwoHours) {
        // clear data tracking setting if it's expired for prevent get Date.now() anymore
        _enabledDataTrackingTimestamp.localStorageDataTrackingTimestamp.set(null);
      }
      return isWithinTwoHours;
    }
  }, {
    key: "useDataTrackingSetting",
    get: function get() {
      var _this$_deps$environme;
      return (_this$_deps$environme = this._deps.environmentOptions) === null || _this$_deps$environme === void 0 ? void 0 : _this$_deps$environme.useDataTrackingSetting;
    }
  }, {
    key: "_defaultRecordingHost",
    get: function get() {
      var _this$_deps$environme2, _this$_deps$environme3;
      return (_this$_deps$environme2 = (_this$_deps$environme3 = this._deps.environmentOptions) === null || _this$_deps$environme3 === void 0 ? void 0 : _this$_deps$environme3.defaultRecordingHost) !== null && _this$_deps$environme2 !== void 0 ? _this$_deps$environme2 : DEFAULT_RECORDING_HOST;
    }
  }]);
  return Environment;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "server", [_core.globalStorage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _sdk.SDK.server.sandbox;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "recordingHostState", [_core.globalStorage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "enabled", [_core.globalStorage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "changeCounter", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setEnvData", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setEnvData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateChangeCounter", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "updateChangeCounter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setData"), _class2.prototype)), _class2)) || _class);
exports.Environment = Environment;
//# sourceMappingURL=Environment.js.map
