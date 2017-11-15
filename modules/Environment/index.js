'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class, _desc, _value, _class2;

var _ringcentral = require('ringcentral');

var _ringcentral2 = _interopRequireDefault(_ringcentral);

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getEnvironmentReducer = require('./getEnvironmentReducer');

var _getEnvironmentReducer2 = _interopRequireDefault(_getEnvironmentReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/**
 * @class
 * @description Environment module manages which api server the app calls.
 */
var Environment = (_dec = (0, _di.Module)({
  deps: ['Client', 'GlobalStorage', { dep: 'EnvironmentOptions' }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(Environment, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {GlobalStorage} params.globalStorage - globalStorage module instance
   * @param {String} params.defaultRecordingHost - default recording host uri
   * @param {Object} params.sdkConfig - sdk config
   */
  function Environment(_ref) {
    var client = _ref.client,
        globalStorage = _ref.globalStorage,
        defaultRecordingHost = _ref.defaultRecordingHost,
        sdkConfig = _ref.sdkConfig,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'globalStorage', 'defaultRecordingHost', 'sdkConfig']);
    (0, _classCallCheck3.default)(this, Environment);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Environment.__proto__ || (0, _getPrototypeOf2.default)(Environment)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._client = client;
    _this._globalStorage = globalStorage;
    _this._sdkConfig = sdkConfig;
    _this._reducer = (0, _getEnvironmentReducer2.default)(_this.actionTypes);
    _this._serverStorageKey = 'environmentServer';
    _this._recordingHostStoragekey = 'environmentRecordingHost';
    _this._enabledStorageKey = 'environmentEnabled';
    _this._globalStorage.registerReducer({
      key: _this._serverStorageKey,
      reducer: (0, _getEnvironmentReducer.getServerReducer)({
        types: _this.actionTypes,
        defaultServer: _ringcentral2.default.server.sandbox
      })
    });
    _this._globalStorage.registerReducer({
      key: _this._recordingHostStoragekey,
      reducer: (0, _getEnvironmentReducer.getRecordingHostReducer)({
        types: _this.actionTypes,
        defaultRecordingHost: defaultRecordingHost || 'https://s3.ap-northeast-2.amazonaws.com/fetch-call-recording/test/index.html'
      })
    });
    _this._globalStorage.registerReducer({
      key: _this._enabledStorageKey,
      reducer: (0, _getEnvironmentReducer.getEnabledReducer)(_this.actionTypes)
    });
    return _this;
  }

  (0, _createClass3.default)(Environment, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: '_onStateChange',
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this._initClientService();
        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
      }
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this._globalStorage.ready && !this.ready;
    }
  }, {
    key: '_initClientService',
    value: function _initClientService() {
      if (this.enabled) {
        this._client.service = new _ringcentral2.default((0, _extends3.default)({}, this._sdkConfig, {
          server: this.server
        }));
      }
    }
  }, {
    key: '_changeEnvironment',
    value: function _changeEnvironment(enabled, server) {
      var newConfig = (0, _extends3.default)({}, this._sdkConfig);
      if (enabled) {
        newConfig.server = server;
      }
      this._client.service = new _ringcentral2.default(newConfig);
    }
  }, {
    key: 'setData',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref3) {
        var server = _ref3.server,
            recordingHost = _ref3.recordingHost,
            enabled = _ref3.enabled;
        var environmentChanged;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
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

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setData(_x) {
        return _ref2.apply(this, arguments);
      }

      return setData;
    }()
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.state.status === _moduleStatuses2.default.ready;
    }
  }, {
    key: 'server',
    get: function get() {
      return this._globalStorage.getItem(this._serverStorageKey);
    }
  }, {
    key: 'recordingHost',
    get: function get() {
      return this._globalStorage.getItem(this._recordingHostStoragekey);
    }
  }, {
    key: 'enabled',
    get: function get() {
      return this._globalStorage.getItem(this._enabledStorageKey);
    }
  }, {
    key: 'changeCounter',
    get: function get() {
      return this.state.changeCounter;
    }
  }]);
  return Environment;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'setData', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'setData'), _class2.prototype)), _class2)) || _class);
exports.default = Environment;
//# sourceMappingURL=index.js.map
