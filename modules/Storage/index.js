'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _dec, _class;

var _di = require('../../lib/di');

var _StorageBase2 = require('../../lib/StorageBase');

var _StorageBase3 = _interopRequireDefault(_StorageBase2);

var _loginStatus = require('../Auth/loginStatus');

var _loginStatus2 = _interopRequireDefault(_loginStatus);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_DISABLE_ALLOW_INACTIVE_TABS_WRITE = false;

/**
 * @class
 * @description Alternative implementation of the Storage class.
 *  Allows registeration of reducers so that persisted states can be computed with reducers.
 */
var Storage = (_dec = (0, _di.Module)({
  deps: ['Auth', { dep: 'TabManager', optional: true }, { dep: 'StorageOptions', optional: true }]
}), _dec(_class = function (_StorageBase) {
  (0, _inherits3.default)(Storage, _StorageBase);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {disableAllowInactiveTabsWrite} params.disableAllowInactiveTabsWrite - disable Allow Inactive Tabs Write
   * @param {Auth} params.auth - auth module instance
   * @param {TabManager} params.tabManager - tabManager module instance
   */
  function Storage(_ref) {
    var _ref$disableAllowInac = _ref.disableAllowInactiveTabsWrite,
        disableAllowInactiveTabsWrite = _ref$disableAllowInac === undefined ? DEFAULT_DISABLE_ALLOW_INACTIVE_TABS_WRITE : _ref$disableAllowInac,
        auth = _ref.auth,
        tabManager = _ref.tabManager,
        options = (0, _objectWithoutProperties3.default)(_ref, ['disableAllowInactiveTabsWrite', 'auth', 'tabManager']);
    (0, _classCallCheck3.default)(this, Storage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Storage.__proto__ || (0, _getPrototypeOf2.default)(Storage)).call(this, (0, _extends3.default)({
      name: 'storage'
    }, options)));

    _this._disableAllowInactiveTabsWrite = disableAllowInactiveTabsWrite;
    _this._auth = auth;
    _this._tabManager = tabManager;
    return _this;
  }

  (0, _createClass3.default)(Storage, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      var storedData = null;
      this.store.subscribe((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var storageKey, key, currentData, _key;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this2._auth.loginStatus === _loginStatus2.default.loggedIn && (!_this2._tabManager || _this2._tabManager.ready) && !_this2.ready)) {
                  _context.next = 20;
                  break;
                }

                storageKey = (_this2.prefix ? _this2.prefix + '-' : '') + 'storage-' + _this2._auth.ownerId;

                _this2._storage = new _this2._StorageProvider({
                  storageKey: storageKey
                });
                _context.next = 5;
                return _this2._storage.getData();

              case 5:
                storedData = _context.sent;
                _context.t0 = _regenerator2.default.keys(storedData);

              case 7:
                if ((_context.t1 = _context.t0()).done) {
                  _context.next = 15;
                  break;
                }

                key = _context.t1.value;

                if (_this2._reducers[key]) {
                  _context.next = 13;
                  break;
                }

                delete storedData[key];
                _context.next = 13;
                return _this2._storage.removeItem(key);

              case 13:
                _context.next = 7;
                break;

              case 15:
                _this2.store.dispatch({
                  type: _this2.actionTypes.initSuccess,
                  storageKey: storageKey,
                  // To fix same reference in redux store with storedData
                  data: (0, _extends3.default)({}, storedData)
                });
                _this2._storageHandler = function (_ref3) {
                  var key = _ref3.key,
                      value = _ref3.value;

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
                _context.next = 21;
                break;

              case 20:
                if ((!!_this2._tabManager && !_this2._tabManager.ready || _this2._auth.notLoggedIn) && _this2.ready) {
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

              case 21:
                if (_this2.status === _moduleStatuses2.default.ready && (!_this2._disableAllowInactiveTabsWrite || !_this2._tabManager || _this2._tabManager.active)) {
                  // save new data to storage when changed
                  currentData = _this2.data;

                  for (_key in currentData) {
                    if (storedData[_key] !== currentData[_key]) {
                      _this2._storage.setItem(_key, currentData[_key]);
                      storedData[_key] = currentData[_key];
                    }
                  }
                }

              case 22:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      })));
    }
  }]);
  return Storage;
}(_StorageBase3.default)) || _class);
exports.default = Storage;
//# sourceMappingURL=index.js.map
