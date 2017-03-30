'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

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

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports.defaultIdentityFunction = defaultIdentityFunction;
exports.convertListToMap = convertListToMap;

var _RcModule2 = require('../RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _Enum = require('../Enum');

var _ensureExist = require('../ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _baseActionTypes = require('./baseActionTypes');

var _baseActionTypes2 = _interopRequireDefault(_baseActionTypes);

var _getDefaultReducer = require('./getDefaultReducer');

var _getDefaultReducer2 = _interopRequireDefault(_getDefaultReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function defaultIdentityFunction
 * @description Identity function returns a deterministic id value for each item.
 * @param {Object} item
 * @return {String}
 */
function defaultIdentityFunction(item) {
  return item.id;
}

/**
 * @function
 * @description Convert array of { name, id } objects into a map.
 * @param {[{ name: String, id: String }]} loggingList
 * @return {{ [ids]: { [names]: true } }}
 */
function convertListToMap(loggingList) {
  var mapping = {};
  loggingList.forEach(function (item) {
    if (!mapping[item.id]) {
      mapping[item.id] = (0, _defineProperty3.default)({}, item.name, true);
    } else {
      mapping[item.id][item.name] = true;
    }
  });
  return mapping;
}

/**
 * @class
 * @description Base class implementation for loggers.
 */

var LoggerBase = function (_RcModule) {
  (0, _inherits3.default)(LoggerBase, _RcModule);

  /**
   * @constructor
   * @param {String} params.name - name of the class
   * @param {Object} params.actionTypes
   * @param {Function} params.getReducer
   * @param {Function} params.identityFunction - function that can derive an unique
   *    id from items.
   */
  function LoggerBase(_ref) {
    var name = _ref.name,
        _ref$actionTypes = _ref.actionTypes,
        actionTypes = _ref$actionTypes === undefined ? (0, _Enum.prefixEnum)({ base: _baseActionTypes2.default, prefix: name }) : _ref$actionTypes,
        _ref$getReducer = _ref.getReducer,
        getReducer = _ref$getReducer === undefined ? _getDefaultReducer2.default : _ref$getReducer,
        _ref$identityFunction = _ref.identityFunction,
        identityFunction = _ref$identityFunction === undefined ? defaultIdentityFunction : _ref$identityFunction,
        options = (0, _objectWithoutProperties3.default)(_ref, ['name', 'actionTypes', 'getReducer', 'identityFunction']);
    (0, _classCallCheck3.default)(this, LoggerBase);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LoggerBase.__proto__ || (0, _getPrototypeOf2.default)(LoggerBase)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: actionTypes
    })));

    _this._name = _ensureExist2.default.call(_this, name, 'name');
    _this._identityFunction = _ensureExist2.default.call(_this, identityFunction, 'identityFunction');

    _this._reducer = getReducer(_this.actionTypes);

    _this._logPromises = new _map2.default();
    _this._logProviders = new _map2.default();

    _this.addSelector('loggingMap', function () {
      return _this.loggingList;
    }, convertListToMap);
    return _this;
  }

  (0, _createClass3.default)(LoggerBase, [{
    key: 'addLogProvider',
    value: function addLogProvider() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var name = _ref2.name,
          logFn = _ref2.logFn,
          readyCheckFn = _ref2.readyCheckFn,
          options = (0, _objectWithoutProperties3.default)(_ref2, ['name', 'logFn', 'readyCheckFn']);

      if (!name) {
        throw new Error(this.constructor.name + ': "name" is required.');
      }
      if (this._logProviders.has(name)) {
        throw new Error(this.constructor.name + ': A provider named "' + name + '" already exists.');
      }
      if (typeof logFn !== 'function') {
        throw new Error(this.constructor.name + ': "logFn" must be a function.');
      }
      if (typeof readyCheckFn !== 'function') {
        throw new Error(this.constructor.name + ': "readyCheckFn" must be a function.');
      }
      this._logProviders.set(name, (0, _extends3.default)({
        logFn: logFn,
        readyCheckFn: readyCheckFn
      }, options));
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this.pending && this.logProvidersReady;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return this.ready && !this.logProvidersReady;
    }
  }, {
    key: '_onStateChange',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._shouldInit()) {
                  _context.next = 8;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.init
                });

                if (!(typeof this._onInit === 'function')) {
                  _context.next = 5;
                  break;
                }

                _context.next = 5;
                return this._onInit();

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });
                _context.next = 14;
                break;

              case 8:
                if (!this._shouldReset()) {
                  _context.next = 14;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.reset
                });

                if (!(typeof this._onReset === 'function')) {
                  _context.next = 13;
                  break;
                }

                _context.next = 13;
                return this._onReset();

              case 13:
                this.store.dispatch({
                  type: this.actionTypes.resetSuccess
                });

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _ref3.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: '_log',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var item = _ref5.item,
            name = _ref5.name,
            options = (0, _objectWithoutProperties3.default)(_ref5, ['item', 'name']);
        var id, key, promise;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.ready) {
                  _context2.next = 2;
                  break;
                }

                throw new Error(this.constructor.name + '._log: module is not ready.');

              case 2:
                if (item) {
                  _context2.next = 4;
                  break;
                }

                throw new Error(this.constructor.name + '._log: options.item is undefined.');

              case 4:
                if (name) {
                  _context2.next = 6;
                  break;
                }

                throw new Error(this.constructor.name + '._log: options.name is undefined.');

              case 6:
                if (this._logProviders.has(name)) {
                  _context2.next = 8;
                  break;
                }

                throw new Error(this.constructor.name + '._log: provider \'' + name + '\' does not exist.');

              case 8:
                id = this._identityFunction(item);
                key = name + '-' + id;
                // wait for the previous log action to finish

                if (!this._logPromises.has(key)) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 13;
                return this._logPromises.get(key);

              case 13:
                _context2.prev = 13;

                this.store.dispatch({
                  type: this.actionTypes.log,
                  name: name,
                  id: id
                });
                promise = this._logProviders.get(name).logFn((0, _extends3.default)({ item: item }, options));

                this._logPromises.set(key, promise);
                _context2.next = 19;
                return promise;

              case 19:
                this._logPromises.delete(key);
                this.store.dispatch({
                  type: this.actionTypes.logSuccess,
                  name: name,
                  id: id
                });
                _context2.next = 28;
                break;

              case 23:
                _context2.prev = 23;
                _context2.t0 = _context2['catch'](13);

                this._logPromises.delete(key);
                this.store.dispatch({
                  type: this.actionTypes.logError,
                  error: _context2.t0,
                  name: name,
                  id: id
                });
                throw _context2.t0;

              case 28:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[13, 23]]);
      }));

      function _log() {
        return _ref4.apply(this, arguments);
      }

      return _log;
    }()
  }, {
    key: 'log',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref7) {
        var _this3 = this;

        var item = _ref7.item,
            name = _ref7.name,
            options = (0, _objectWithoutProperties3.default)(_ref7, ['item', 'name']);
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.ready) {
                  _context3.next = 2;
                  break;
                }

                throw new Error(this.constructor.name + '.log: module is not ready.');

              case 2:
                if (item) {
                  _context3.next = 4;
                  break;
                }

                throw new Error(this.constructor.name + '.log: options.item is undefined.');

              case 4:
                if (!name) {
                  _context3.next = 11;
                  break;
                }

                if (this._logProviders.has(name)) {
                  _context3.next = 7;
                  break;
                }

                throw new Error(this.constructor.name + '.log: provider \'' + name + '\' does not exist.');

              case 7:
                _context3.next = 9;
                return this._log((0, _extends3.default)({ item: item, name: name }, options));

              case 9:
                _context3.next = 13;
                break;

              case 11:
                _context3.next = 13;
                return _promise2.default.all([].concat((0, _toConsumableArray3.default)(this._logProviders.keys())).map(function (key) {
                  return _this3._log((0, _extends3.default)({ item: item, name: key }, options));
                }));

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function log(_x3) {
        return _ref6.apply(this, arguments);
      }

      return log;
    }()
  }, {
    key: 'logProvidersReady',
    get: function get() {
      return [].concat((0, _toConsumableArray3.default)(this._logProviders.values())).every(function (provider) {
        return provider.readyCheckFn();
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
    key: 'pending',
    get: function get() {
      return this.state.status === _moduleStatuses2.default.pending;
    }
  }, {
    key: 'loggingList',
    get: function get() {
      return this.state.loggingList;
    }
  }, {
    key: 'loggingMap',
    get: function get() {
      return this._selectors.loggingMap();
    }
  }]);
  return LoggerBase;
}(_RcModule3.default);

exports.default = LoggerBase;
//# sourceMappingURL=index.js.map
