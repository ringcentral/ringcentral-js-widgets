"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.date.now");

var _uuid = _interopRequireDefault(require("uuid"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _alertLevels = _interopRequireDefault(require("./alertLevels"));

var _getAlertReducer = _interopRequireDefault(require("./getAlertReducer"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _dec, _class, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var Alert = (
/**
 * @class
 * @description Alert messages managing module.
 */
_dec = (0, _di.Module)({
  deps: [{
    dep: 'AlertOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_RcModule) {
  _inherits(Alert, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Number} params.ttl - Default time-to-live for alert messages.
   */
  function Alert(_ref) {
    var _this;

    var _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === void 0 ? 5000 : _ref$ttl,
        options = _objectWithoutProperties(_ref, ["ttl"]);

    _classCallCheck(this, Alert);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Alert).call(this, _objectSpread({}, options)));

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

    _this._reducer = (0, _getAlertReducer["default"])(_this.actionTypes);
    _this._ttl = ttl;
    return _this;
  }

  _createClass(Alert, [{
    key: "_onStateChange",
    value: function _onStateChange() {}
    /* do nothing */
    // this module has no dependency, and is always ready
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: "alert",

    /**
     * @function
     * @description Add alert message to the state.
     * @param {String} options.message
     * @param {Any} options.payload
     * @param {alertLevels} options.level
     * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
     */
    value: function () {
      var _alert = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref2) {
        var message, payload, _ref2$level, level, _ref2$ttl, ttl, _ref2$allowDuplicates, allowDuplicates;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                message = _ref2.message, payload = _ref2.payload, _ref2$level = _ref2.level, level = _ref2$level === void 0 ? _alertLevels["default"].info : _ref2$level, _ref2$ttl = _ref2.ttl, ttl = _ref2$ttl === void 0 ? this._ttl : _ref2$ttl, _ref2$allowDuplicates = _ref2.allowDuplicates, allowDuplicates = _ref2$allowDuplicates === void 0 ? true : _ref2$allowDuplicates;
                this.store.dispatch({
                  type: this.actionTypes.alert,
                  message: message,
                  payload: payload,
                  level: level,
                  ttl: ttl,
                  allowDuplicates: allowDuplicates,
                  id: _uuid["default"].v4(),
                  timestamp: Date.now()
                });

                if (ttl > 0) {
                  setTimeout(this._autoDismiss, ttl + 10);
                }

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function alert(_x) {
        return _alert.apply(this, arguments);
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
    key: "danger",
    value: function danger(options) {
      this.alert(_objectSpread({}, options, {
        level: _alertLevels["default"].danger
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
    key: "warning",
    value: function warning(options) {
      this.alert(_objectSpread({}, options, {
        level: _alertLevels["default"].warning
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
    key: "info",
    value: function info(options) {
      this.alert(_objectSpread({}, options, {
        level: _alertLevels["default"].info
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
    key: "success",
    value: function success(options) {
      this.alert(_objectSpread({}, options, {
        level: _alertLevels["default"].success
      }));
    }
    /**
     * @function
     * @description Dismiss the message from the state.
     * @param {Array<String>|String} ids - The id, or array of ids to be dismissed.
     */

  }, {
    key: "dismiss",
    value: function () {
      var _dismiss = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(ids) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.dismiss,
                  ids: [].concat(ids)
                });

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function dismiss(_x2) {
        return _dismiss.apply(this, arguments);
      }

      return dismiss;
    }()
    /**
     * @function
     * @description Dismiss all messages.
     */

  }, {
    key: "dismissAll",
    value: function () {
      var _dismissAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.dismissAll
                });

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function dismissAll() {
        return _dismissAll.apply(this, arguments);
      }

      return dismissAll;
    }()
  }, {
    key: "_actionTypes",
    get: function get() {
      return _actionTypes["default"];
    }
  }, {
    key: "status",
    get: function get() {
      return _moduleStatuses["default"].ready;
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "ready",
    get: function get() {
      return true;
    }
  }, {
    key: "messages",
    get: function get() {
      return this.state.messages;
    }
    /**
     * @function
     * @description Scans the messages for expired ones and dismiss them.
     */

  }]);

  return Alert;
}(_RcModule2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "alert", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "alert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismiss", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "dismiss"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismissAll", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "dismissAll"), _class2.prototype)), _class2)) || _class);
exports["default"] = Alert;
//# sourceMappingURL=index.js.map
