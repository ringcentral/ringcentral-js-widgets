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

var _dec, _class, _desc, _value, _class2;

exports.defaultIdentityFunction = defaultIdentityFunction;
exports.convertListToMap = convertListToMap;

var _RcModule2 = require('../RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../di');

var _Enum = require('../Enum');

var _ensureExist = require('../ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _baseActionTypes = require('./baseActionTypes');

var _baseActionTypes2 = _interopRequireDefault(_baseActionTypes);

var _getDefaultReducer = require('./getDefaultReducer');

var _getDefaultReducer2 = _interopRequireDefault(_getDefaultReducer);

var _proxify = require('../proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

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
  loggingList.forEach(function (id) {
    mapping[id] = true;
  });
  return mapping;
}

/**
 * @class
 * @description Base class implementation for loggers.
 */
var LoggerBase = (_dec = (0, _di.Library)({
  deps: [{ dep: 'LoggerBaseOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
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
        logFunction = _ref.logFunction,
        readyCheckFunction = _ref.readyCheckFunction,
        options = (0, _objectWithoutProperties3.default)(_ref, ['name', 'actionTypes', 'getReducer', 'identityFunction', 'logFunction', 'readyCheckFunction']);
    (0, _classCallCheck3.default)(this, LoggerBase);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LoggerBase.__proto__ || (0, _getPrototypeOf2.default)(LoggerBase)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: actionTypes
    })));

    _this._name = _ensureExist2.default.call(_this, name, 'name');
    _this._identityFunction = _ensureExist2.default.call(_this, identityFunction, 'identityFunction');
    _this._logFunction = _ensureExist2.default.call(_this, logFunction, 'logFunction');
    _this._readyCheckFunction = _ensureExist2.default.call(_this, readyCheckFunction, 'readyCheckFunction');

    _this._reducer = getReducer(_this.actionTypes);

    _this._logPromises = new _map2.default();

    _this.addSelector('loggingMap', function () {
      return _this.loggingList;
    }, convertListToMap);
    return _this;
  }

  (0, _createClass3.default)(LoggerBase, [{
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
      return this.pending && this._readyCheckFunction();
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return this.ready && !this._readyCheckFunction();
    }
  }, {
    key: '_onStateChange',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
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
        return _ref2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: '_log',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var item = _ref4.item,
            options = (0, _objectWithoutProperties3.default)(_ref4, ['item']);
        var id, promise;
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
                id = this._identityFunction(item);
                // wait for the previous log action to finish

                if (!this._logPromises.has(id)) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 8;
                return this._logPromises.get(id);

              case 8:
                _context2.prev = 8;

                this.store.dispatch({
                  type: this.actionTypes.log,
                  id: id
                });
                promise = this._logFunction((0, _extends3.default)({ item: item }, options));

                this._logPromises.set(id, promise);
                _context2.next = 14;
                return promise;

              case 14:
                this._logPromises.delete(id);
                this.store.dispatch({
                  type: this.actionTypes.logSuccess,
                  id: id
                });
                _context2.next = 23;
                break;

              case 18:
                _context2.prev = 18;
                _context2.t0 = _context2['catch'](8);

                this._logPromises.delete(id);
                this.store.dispatch({
                  type: this.actionTypes.logError,
                  error: _context2.t0,
                  id: id
                });
                throw _context2.t0;

              case 23:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[8, 18]]);
      }));

      function _log() {
        return _ref3.apply(this, arguments);
      }

      return _log;
    }()
  }, {
    key: 'log',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref6) {
        var item = _ref6.item,
            options = (0, _objectWithoutProperties3.default)(_ref6, ['item']);
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
                _context3.next = 6;
                return this._log((0, _extends3.default)({ item: item }, options));

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function log(_x2) {
        return _ref5.apply(this, arguments);
      }

      return log;
    }()
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
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
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, '_log', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, '_log'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'log', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'log'), _class2.prototype)), _class2)) || _class);
exports.default = LoggerBase;
//# sourceMappingURL=index.js.map
