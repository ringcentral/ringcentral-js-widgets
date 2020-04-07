"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

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

require("regenerator-runtime/runtime");

var _ringcentral = _interopRequireDefault(require("ringcentral"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getEnvironmentReducer = _interopRequireWildcard(require("./getEnvironmentReducer"));

var _dec, _class, _class2;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var Environment = (
/**
 * @class
 * @description Environment module manages which api server the app calls.
 */
_dec = (0, _di.Module)({
  deps: ['Client', 'GlobalStorage', {
    dep: 'EnvironmentOptions'
  }]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_RcModule) {
  _inherits(Environment, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {GlobalStorage} params.globalStorage - globalStorage module instance
   * @param {String} params.defaultRecordingHost - default recording host uri
   * @param {Object} params.sdkConfig - sdk config
   */
  function Environment(_ref) {
    var _this;

    var client = _ref.client,
        globalStorage = _ref.globalStorage,
        defaultRecordingHost = _ref.defaultRecordingHost,
        sdkConfig = _ref.sdkConfig,
        options = _objectWithoutProperties(_ref, ["client", "globalStorage", "defaultRecordingHost", "sdkConfig"]);

    _classCallCheck(this, Environment);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Environment).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes["default"]
    })));
    _this._client = client;
    _this._globalStorage = globalStorage;
    _this._sdkConfig = sdkConfig;
    _this._reducer = (0, _getEnvironmentReducer["default"])(_this.actionTypes);
    _this._serverStorageKey = 'environmentServer';
    _this._recordingHostStoragekey = 'environmentRecordingHost';
    _this._enabledStorageKey = 'environmentEnabled';
    _this._defaultRecordingHost = defaultRecordingHost || 'https://s3.ap-northeast-2.amazonaws.com/fetch-call-recording/test/index.html';

    _this._globalStorage.registerReducer({
      key: _this._serverStorageKey,
      reducer: (0, _getEnvironmentReducer.getServerReducer)({
        types: _this.actionTypes,
        defaultServer: _ringcentral["default"].server.sandbox
      })
    });

    _this._globalStorage.registerReducer({
      key: _this._recordingHostStoragekey,
      reducer: (0, _getEnvironmentReducer.getRecordingHostReducer)({
        types: _this.actionTypes,
        defaultRecordingHost: _this._defaultRecordingHost
      })
    });

    _this._globalStorage.registerReducer({
      key: _this._enabledStorageKey,
      reducer: (0, _getEnvironmentReducer.getEnabledReducer)(_this.actionTypes)
    });

    return _this;
  }

  _createClass(Environment, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this._initClientService();

        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
      }
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._globalStorage.ready && !this.ready;
    }
  }, {
    key: "_initClientService",
    value: function _initClientService() {
      if (this.enabled) {
        this._client.service = new _ringcentral["default"](_objectSpread({}, this._sdkConfig, {
          server: this.server
        }));
      }
    }
  }, {
    key: "_changeEnvironment",
    value: function _changeEnvironment(enabled, server) {
      var newConfig = _objectSpread({}, this._sdkConfig);

      if (enabled) {
        newConfig.server = server;
      }

      this._client.service = new _ringcentral["default"](newConfig);
    }
  }, {
    key: "setData",
    value: function setData(_ref2) {
      var server, recordingHost, enabled, environmentChanged;
      return regeneratorRuntime.async(function setData$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              server = _ref2.server, recordingHost = _ref2.recordingHost, enabled = _ref2.enabled;
              environmentChanged = this.enabled !== enabled || enabled && this.server !== server;

              if (environmentChanged) {
                // recordingHost changed no need to set to SDK
                this._changeEnvironment(enabled, server);
              }

              this.store.dispatch({
                type: this.actionTypes.setData,
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
      }, null, this);
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
    key: "server",
    get: function get() {
      return this._globalStorage.getItem(this._serverStorageKey);
    }
  }, {
    key: "recordingHost",
    get: function get() {
      if (this.enabled) {
        return this._globalStorage.getItem(this._recordingHostStoragekey);
      }

      return this._defaultRecordingHost;
    }
  }, {
    key: "enabled",
    get: function get() {
      return this._globalStorage.getItem(this._enabledStorageKey);
    }
  }, {
    key: "changeCounter",
    get: function get() {
      return this.state.changeCounter;
    }
  }]);

  return Environment;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "setData", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setData"), _class2.prototype)), _class2)) || _class);
exports["default"] = Environment;
//# sourceMappingURL=index.js.map
