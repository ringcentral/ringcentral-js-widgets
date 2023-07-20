"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
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
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
var DEFAULT_RECORDING_HOST = 'https://apps.ringcentral.com/integrations/recording/v3.0/rc/index.html';
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
        enabled = _ref.enabled;
      this.server = server;
      this.recordingHostState = recordingHost;
      this.enabled = enabled;
    }
  }, {
    key: "updateChangeCounter",
    value: function updateChangeCounter() {
      this.changeCounter++;
    }
  }, {
    key: "changeEnvironment",
    value: function changeEnvironment() {
      var sdkConfig = this.getSdkConfig();
      this._deps.client.service = new _sdk.SDK(sdkConfig);
    }
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
      var _setData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
        var server, recordingHost, enabled, _ref2$environmentChan, environmentChanged, isEnvChanged;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                server = _ref2.server, recordingHost = _ref2.recordingHost, enabled = _ref2.enabled, _ref2$environmentChan = _ref2.environmentChanged, environmentChanged = _ref2$environmentChan === void 0 ? false : _ref2$environmentChan;
                // `recordingHost` change no need to set to SDK
                isEnvChanged = environmentChanged || this.enabled !== enabled || enabled && this.server !== server;
                this.setEnvData({
                  server: server,
                  recordingHost: recordingHost,
                  enabled: enabled
                });
                if (isEnvChanged) {
                  // apply changes
                  this.changeEnvironment();
                  // notify change at last
                  this.updateChangeCounter();
                }
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function setData(_x) {
        return _setData.apply(this, arguments);
      }
      return setData;
    }()
  }, {
    key: "recordingHost",
    get: function get() {
      return this.enabled ? this.recordingHostState : this._defaultRecordingHost;
    }
  }, {
    key: "_defaultRecordingHost",
    get: function get() {
      var _this$_deps$environme, _this$_deps$environme2;
      return (_this$_deps$environme = (_this$_deps$environme2 = this._deps.environmentOptions) === null || _this$_deps$environme2 === void 0 ? void 0 : _this$_deps$environme2.defaultRecordingHost) !== null && _this$_deps$environme !== void 0 ? _this$_deps$environme : DEFAULT_RECORDING_HOST;
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
