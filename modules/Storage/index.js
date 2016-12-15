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

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _SynchronizedStorage = require('../../lib/SynchronizedStorage');

var _SynchronizedStorage2 = _interopRequireDefault(_SynchronizedStorage);

var _loginStatus = require('../Auth/loginStatus');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

var _getStorageReducer = require('./getStorageReducer');

var _getStorageReducer2 = _interopRequireDefault(_getStorageReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class
 * @description Alternative implementation of the Storage class.
 *  Allows registeration of reducers so that persisted states can be computed with reducers.
 */
var StorageAlt = function (_RcModule) {
  (0, _inherits3.default)(StorageAlt, _RcModule);

  function StorageAlt(_ref) {
    var auth = _ref.auth,
        _ref$StorageProvider = _ref.StorageProvider,
        StorageProvider = _ref$StorageProvider === undefined ? _SynchronizedStorage2.default : _ref$StorageProvider,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'StorageProvider']);
    (0, _classCallCheck3.default)(this, StorageAlt);

    var _this = (0, _possibleConstructorReturn3.default)(this, (StorageAlt.__proto__ || (0, _getPrototypeOf2.default)(StorageAlt)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._auth = auth;
    _this._StorageProvider = StorageProvider;
    _this._reducers = {};
    _this._reducer = (0, _getStorageReducer2.default)({ types: _this.actionTypes, reducers: _this._reducers });
    return _this;
  }

  (0, _createClass3.default)(StorageAlt, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      var storedData = null;
      this.store.subscribe(function () {
        if (_this2._auth.loginStatus === _loginStatus2.default.loggedIn && !_this2.ready) {
          var storageKey = (_this2.prefix ? _this2.prefix + '-' : '') + 'storage-' + _this2._auth.ownerId;
          _this2._storage = new _this2._StorageProvider({
            storageKey: storageKey
          });
          storedData = _this2._storage.getData();
          for (var key in storedData) {
            if (!_this2._reducers[key]) {
              delete storedData[key];
              _this2._storage.removeItem(key);
            }
          }
          _this2.store.dispatch({
            type: _this2.actionTypes.init,
            storageKey: storageKey,
            data: storedData
          });
          _this2._storageHandler = function (_ref2) {
            var key = _ref2.key,
                value = _ref2.value;

            if (_this2.ready) {
              storedData[key] = value;
              _this2.store.dispatch({
                type: _this2.actionTypes.sync,
                key: key,
                value: value
              });
            }
          };
          _this2._storage.on('storage', _this2._storageHandler);
        } else if (_this2._auth.loginStatus === _loginStatus2.default.notLoggedIn && _this2.ready) {
          _this2.store.dispatch({
            type: _this2.actionTypes.reset
          });
          if (_this2._storageHandler) {
            _this2._storage.off('storage', _this2._storageHandler);
            _this2._storageHandler = null;
          }
          if (_this2._storage) {
            _this2._storage.destroy();
            _this2._storage = null;
          }
          _this2.store.dispatch({
            type: _this2.actionTypes.resetSuccess
          });
        }
        if (_this2.status !== _moduleStatus2.default.pending) {
          // save new data to storage when changed
          var currentData = _this2.data;
          for (var _key in currentData) {
            if (storedData[_key] !== currentData[_key]) {
              _this2._storage.setItem(_key, currentData[_key]);
              storedData[_key] = currentData[_key];
            }
          }
        }
      });
    }
  }, {
    key: 'registerReducer',
    value: function registerReducer(_ref3) {
      var key = _ref3.key,
          reducer = _ref3.reducer;

      if (this._initialized) {
        throw new Error('Reducers must be registered before initialize');
      }
      if (this._reducers[key]) {
        throw new Error('Reducer of key: \'' + key + '\' already exists');
      }
      this._reducers[key] = reducer;
    }
  }, {
    key: 'getItem',
    value: function getItem(key) {
      return this.state.data[key];
    }
  }, {
    key: 'data',
    get: function get() {
      return this.state.data;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'storageKey',
    get: function get() {
      return this.state.storageKey;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.status === _moduleStatus2.default.ready;
    }
  }]);
  return StorageAlt;
}(_RcModule3.default);

exports.default = StorageAlt;
//# sourceMappingURL=index.js.map
