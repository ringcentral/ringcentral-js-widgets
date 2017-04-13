'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _ringcentral = require('ringcentral');

var _ringcentral2 = _interopRequireDefault(_ringcentral);

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getEnvironmentReducer = require('./getEnvironmentReducer');

var _getEnvironmentReducer2 = _interopRequireDefault(_getEnvironmentReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class
 * @description Environment module manages which api server the app calls.
 */
var Environment = function (_RcModule) {
  (0, _inherits3.default)(Environment, _RcModule);

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
    value: function setData(_ref2) {
      var server = _ref2.server,
          recordingHost = _ref2.recordingHost,
          enabled = _ref2.enabled;

      var environmentChanged = this.enabled !== enabled || enabled && this.server !== server;
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
    }
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
}(_RcModule3.default);

exports.default = Environment;
//# sourceMappingURL=index.js.map
