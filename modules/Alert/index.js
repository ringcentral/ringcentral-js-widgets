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

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _alertLevels = require('./alertLevels');

var _alertLevels2 = _interopRequireDefault(_alertLevels);

var _getAlertReducer = require('./getAlertReducer');

var _getAlertReducer2 = _interopRequireDefault(_getAlertReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class
 * @description Alert messages managing module.
 */
var Alert = function (_RcModule) {
  (0, _inherits3.default)(Alert, _RcModule);

  /**
   * @constructor
   * @param {Number} ttl - Default time-to-live for alert messages.
   */
  function Alert(_ref) {
    var _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? 5000 : _ref$ttl,
        options = (0, _objectWithoutProperties3.default)(_ref, ['ttl']);
    (0, _classCallCheck3.default)(this, Alert);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Alert.__proto__ || (0, _getPrototypeOf2.default)(Alert)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

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

  // this module has no dependency, and is always ready
  // eslint-disable-next-line class-methods-use-this


  (0, _createClass3.default)(Alert, [{
    key: 'alert',


    /**
     * @function
     * @description Add alert message to the state.
     * @param {String} options.message
     * @param {Any} options.payload
     * @param {alertLevels} options.level
     * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
     */
    value: function alert(_ref2) {
      var message = _ref2.message,
          payload = _ref2.payload,
          _ref2$level = _ref2.level,
          level = _ref2$level === undefined ? _alertLevels2.default.info : _ref2$level,
          _ref2$ttl = _ref2.ttl,
          ttl = _ref2$ttl === undefined ? this._ttl : _ref2$ttl,
          _ref2$allowDuplicates = _ref2.allowDuplicates,
          allowDuplicates = _ref2$allowDuplicates === undefined ? true : _ref2$allowDuplicates;

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
    }
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
    value: function dismiss(ids) {
      this.store.dispatch({
        type: this.actionTypes.dismiss,
        ids: [].concat(ids)
      });
    }
    /**
     * @function
     * @description Dismiss all messages.
     */

  }, {
    key: 'dismissAll',
    value: function dismissAll() {
      this.store.dispatch({
        type: this.actionTypes.dismissAll
      });
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
}(_RcModule3.default);

exports.default = Alert;
//# sourceMappingURL=index.js.map
