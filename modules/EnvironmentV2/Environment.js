"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Environment = void 0;

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _sdk = require("@ringcentral/sdk");

var _di = require("../../lib/di");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var DEFAULT_RECORDING_HOST = 'https://s3.ap-northeast-2.amazonaws.com/fetch-call-recording/test/index.html'; // Tips: there is a difference between v1 and v2 which make EnvironmentV2 depend on SdkConfig,
// instead of making SdkConfig a property of EnvironmentOptions

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
      this._initClientService();
    }
  }, {
    key: "setEnvData",
    value: function setEnvData(_ref) {
      var server = _ref.server,
          recordingHost = _ref.recordingHost,
          enabled = _ref.enabled,
          environmentChanged = _ref.environmentChanged;
      this.server = server;
      this.recordingHostState = recordingHost;
      this.enabled = enabled;

      if (environmentChanged) {
        this.changeCounter++;
      }
    }
  }, {
    key: "_initClientService",
    value: function _initClientService() {
      if (this.enabled) {
        this._deps.client.service = new _sdk.SDK(_objectSpread(_objectSpread({}, this._deps.sdkConfig), {}, {
          discoveryServer: this.server,
          server: this.server
        }));
      }
    }
  }, {
    key: "_changeEnvironment",
    value: function _changeEnvironment(enabled, server) {
      var newConfig = _objectSpread({}, this._deps.sdkConfig);

      if (enabled) {
        newConfig.server = server;
        newConfig.discoveryServer = server;
      }

      this._deps.client.service = new _sdk.SDK(newConfig);
    }
  }, {
    key: "setData",
    value: function () {
      var _setData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
        var server, recordingHost, enabled, environmentChanged;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                server = _ref2.server, recordingHost = _ref2.recordingHost, enabled = _ref2.enabled;
                environmentChanged = this.enabled !== enabled || enabled && this.server !== server;

                if (environmentChanged) {
                  // recordingHost changed no need to set to SDK
                  this._changeEnvironment(enabled, server);
                }

                this.setEnvData({
                  server: server,
                  recordingHost: recordingHost,
                  enabled: enabled,
                  environmentChanged: environmentChanged
                });

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
}), _applyDecoratedDescriptor(_class2.prototype, "setEnvData", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setEnvData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setData", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setData"), _class2.prototype)), _class2)) || _class);
exports.Environment = Environment;
//# sourceMappingURL=Environment.js.map
