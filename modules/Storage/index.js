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

var _dec, _class;

var _di = require('../../lib/di');

var _StorageBase2 = require('../../lib/StorageBase');

var _StorageBase3 = _interopRequireDefault(_StorageBase2);

var _loginStatus = require('../Auth/loginStatus');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class
 * @description Alternative implementation of the Storage class.
 *  Allows registeration of reducers so that persisted states can be computed with reducers.
 */
var Storage = (_dec = (0, _di.Module)({
  deps: ['Auth', { dep: 'StorageOptions', optional: true }]
}), _dec(_class = function (_StorageBase) {
  (0, _inherits3.default)(Storage, _StorageBase);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   */
  function Storage(_ref) {
    var auth = _ref.auth,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth']);
    (0, _classCallCheck3.default)(this, Storage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Storage.__proto__ || (0, _getPrototypeOf2.default)(Storage)).call(this, (0, _extends3.default)({
      name: 'storage'
    }, options)));

    _this._auth = auth;
    return _this;
  }

  (0, _createClass3.default)(Storage, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      var storedData = null;
      var self = this;
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
            type: _this2.actionTypes.initSuccess,
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
        if (_this2.status !== _moduleStatuses2.default.pending) {
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
  }]);
  return Storage;
}(_StorageBase3.default)) || _class);
exports.default = Storage;
//# sourceMappingURL=index.js.map
