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

var _NamedStorage = require('../../lib/NamedStorage');

var _NamedStorage2 = _interopRequireDefault(_NamedStorage);

var _storageStatus = require('./storageStatus');

var _storageStatus2 = _interopRequireDefault(_storageStatus);

var _storageActionTypes = require('./storageActionTypes');

var _storageActionTypes2 = _interopRequireDefault(_storageActionTypes);

var _getStorageReducer = require('./getStorageReducer');

var _getStorageReducer2 = _interopRequireDefault(_getStorageReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Storage = function (_RcModule) {
  (0, _inherits3.default)(Storage, _RcModule);

  function Storage() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        auth = _ref.auth,
        _ref$StorageProvider = _ref.StorageProvider,
        StorageProvider = _ref$StorageProvider === undefined ? _NamedStorage2.default : _ref$StorageProvider,
        options = (0, _objectWithoutProperties3.default)(_ref, ['auth', 'StorageProvider']);

    (0, _classCallCheck3.default)(this, Storage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Storage.__proto__ || (0, _getPrototypeOf2.default)(Storage)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _storageActionTypes2.default
    })));

    _this._auth = auth;
    _this._StorageProvider = StorageProvider;
    _this._storage = null;
    _this._reducer = (0, _getStorageReducer2.default)(_this.prefix);
    return _this;
  }

  (0, _createClass3.default)(Storage, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        if (_this2._auth.status === _this2._auth.authStatus.loggedIn && _this2.status !== _storageStatus2.default.ready) {
          var storageKey = (_this2.prefix ? _this2.prefix + '-' : '') + 'storage-' + _this2._auth.ownerId;
          _this2._storage = new _this2._StorageProvider({ storageKey: storageKey });

          var initialData = _this2._storage.getData() || {};
          _this2.store.dispatch({
            type: _this2.actionTypes.init,
            storageKey: storageKey,
            data: initialData
          });
          _this2._unsubscribe = _this2._storage.subscribe(function (updatedData) {
            if (_this2.status === _storageStatus2.default.ready) {
              _this2.store.dispatch({
                type: _this2.actions.load,
                data: updatedData
              });
            }
          });
        } else if (_this2._auth.status === _this2._auth.authStatus.notLoggedIn && _this2.status !== _storageStatus2.default.pending) {
          _this2.store.dispatch({
            type: _this2.actionTypes.reset
          });
          if (_this2._unsubscribe) {
            _this2._unsubscribe();
          }
          if (_this2._storage) {
            _this2._storage.destroy();
            _this2._storage = null;
          }
        }
      });
      this._auth.addBeforeLogoutHandler(function () {
        _this2.store.dispatch({
          type: _this2.actionTypes.reset
        });
        if (_this2._unsubscribe) {
          _this2._unsubscribe();
        }
        if (_this2._storage) {
          _this2._storage.destroy();
          _this2._storage = null;
        }
      });
    }
  }, {
    key: 'getItem',
    value: function getItem(key) {
      return this.data[key];
    }
  }, {
    key: 'setItem',
    value: function setItem(key, value) {
      this.store.dispatch({
        type: this.actionTypes.set,
        key: key,
        value: value
      });
      this._storage.setData(this.data);
    }
  }, {
    key: 'hasItem',
    value: function hasItem(key) {
      var _context;

      return (_context = this.data, Object.prototype.hasOwnProperty).call(_context, key);
    }
  }, {
    key: 'removeItem',
    value: function removeItem(key) {
      this.store.dispatch({
        type: this.actionTypes.remove,
        key: key
      });
      this._storage.setData(this.data);
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
    key: 'storageStatus',
    get: function get() {
      return _storageStatus2.default;
    }
  }]);
  return Storage;
}(_RcModule3.default);

exports.default = Storage;
//# sourceMappingURL=index.js.map
