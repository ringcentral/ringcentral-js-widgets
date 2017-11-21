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

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _alertLevels = require('./alertLevels');

var _alertLevels2 = _interopRequireDefault(_alertLevels);

var _getAlertReducer = require('./getAlertReducer');

var _getAlertReducer2 = _interopRequireDefault(_getAlertReducer);

var _proxify = require('../../lib/proxy/proxify');

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
 * @class
 * @description Alert messages managing module.
 */
var Alert = (_dec = (0, _di.Module)({
  deps: [{ dep: 'AlertOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(Alert, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Number} params.ttl - Default time-to-live for alert messages.
   */
  function Alert(_ref) {
    var _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? 5000 : _ref$ttl,
        options = (0, _objectWithoutProperties3.default)(_ref, ['ttl']);
    (0, _classCallCheck3.default)(this, Alert);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Alert.__proto__ || (0, _getPrototypeOf2.default)(Alert)).call(this, (0, _extends3.default)({}, options)));

    _this._autoDismiss = function () {
      var now = Date.now();
      var ids = _this.state.messages.filter(function (item) {
        return item.ttl > 0 && now - item.timestamp > item.ttl;
      }).map(function (item) {
        return item.id;
      });
      if (ids.length) {
        _this.dismiss(ids);
      }
    };

    _this._reducer = (0, _getAlertReducer2.default)(_this.actionTypes);
    _this._ttl = ttl;
    return _this;
  }

  (0, _createClass3.default)(Alert, [{
    key: '_onStateChange',
    value: function _onStateChange() {}
    /* do nothing */


    // this module has no dependency, and is always ready
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'alert',


    /**
     * @function
     * @description Add alert message to the state.
     * @param {String} options.message
     * @param {Any} options.payload
     * @param {alertLevels} options.level
     * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
     */
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref3) {
        var message = _ref3.message,
            payload = _ref3.payload,
            _ref3$level = _ref3.level,
            level = _ref3$level === undefined ? _alertLevels2.default.info : _ref3$level,
            _ref3$ttl = _ref3.ttl,
            ttl = _ref3$ttl === undefined ? this._ttl : _ref3$ttl,
            _ref3$allowDuplicates = _ref3.allowDuplicates,
            allowDuplicates = _ref3$allowDuplicates === undefined ? true : _ref3$allowDuplicates;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.alert,
                  message: message,
                  payload: payload,
                  level: level,
                  ttl: ttl,
                  allowDuplicates: allowDuplicates,
                  id: _uuid2.default.v4(),
                  timestamp: Date.now()
                });
                if (ttl > 0) {
                  setTimeout(this._autoDismiss, ttl + 10);
                }

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function alert(_x) {
        return _ref2.apply(this, arguments);
      }

      return alert;
    }()
    /**
     * @function
     * @description Add alert message of alertLevel "danger" to the state.
     * @param {String} options.message
     * @param {Any} options.payload
     * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
     */

  }, {
    key: 'danger',
    value: function danger(options) {
      this.alert((0, _extends3.default)({}, options, {
        level: _alertLevels2.default.danger
      }));
    }
    /**
     * @function
     * @description Add alert message of alertLevel "warning" to the state.
     * @param {String} options.message
     * @param {Any} options.payload
     * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
     */

  }, {
    key: 'warning',
    value: function warning(options) {
      this.alert((0, _extends3.default)({}, options, {
        level: _alertLevels2.default.warning
      }));
    }
    /**
     * @function
     * @description Add alert message of alertLevel "info" to the state.
     * @param {String} options.message
     * @param {Any} options.payload
     * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
     */

  }, {
    key: 'info',
    value: function info(options) {
      this.alert((0, _extends3.default)({}, options, {
        level: _alertLevels2.default.info
      }));
    }
    /**
     * @function
     * @description Add alert message of alertLevel "success" to the state.
     * @param {String} options.message
     * @param {Any} options.payload
     * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
     */

  }, {
    key: 'success',
    value: function success(options) {
      this.alert((0, _extends3.default)({}, options, {
        level: _alertLevels2.default.success
      }));
    }
    /**
     * @function
     * @description Dismiss the message from the state.
     * @param {Array<String>|String} ids - The id, or array of ids to be dismissed.
     */

  }, {
    key: 'dismiss',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ids) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.dismiss,
                  ids: [].concat(ids)
                });

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function dismiss(_x2) {
        return _ref4.apply(this, arguments);
      }

      return dismiss;
    }()
    /**
     * @function
     * @description Dismiss all messages.
     */

  }, {
    key: 'dismissAll',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.dismissAll
                });

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function dismissAll() {
        return _ref5.apply(this, arguments);
      }

      return dismissAll;
    }()
  }, {
    key: '_actionTypes',
    get: function get() {
      return _actionTypes2.default;
    }
  }, {
    key: 'status',
    get: function get() {
      return _moduleStatuses2.default.ready;
    }
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'ready',
    get: function get() {
      return true;
    }
  }, {
    key: 'messages',
    get: function get() {
      return this.state.messages;
    }

    /**
     * @function
     * @description Scans the messages for expired ones and dismiss them.
     */

  }]);
  return Alert;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'alert', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'alert'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'dismiss', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'dismiss'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'dismissAll', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'dismissAll'), _class2.prototype)), _class2)) || _class);
exports.default = Alert;
//# sourceMappingURL=index.js.map
