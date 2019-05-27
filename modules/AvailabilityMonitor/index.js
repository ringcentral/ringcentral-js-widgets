"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.STATUS_END_POINT = exports.HEALTH_CHECK_INTERVAL = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.bind");

var _ramda = require("ramda");

var _di = require("../../lib/di");

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _availabilityMonitorReducer = _interopRequireDefault(require("./availabilityMonitorReducer"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _availabilityStatus = _interopRequireDefault(require("./availabilityStatus"));

var _availabilityMonitorHelper = require("./availabilityMonitorHelper");

var _errorMessages = _interopRequireDefault(require("./errorMessages"));

var _dec, _class;

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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// Constants
var HEALTH_CHECK_INTERVAL = 60 * 1000;
exports.HEALTH_CHECK_INTERVAL = HEALTH_CHECK_INTERVAL;
var STATUS_END_POINT = '/restapi/v1.0/status';
/**
 * @class AvailabilityMonitor
 * @description Connectivity monitor module
 */

exports.STATUS_END_POINT = STATUS_END_POINT;
var AvailabilityMonitor = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Client', {
    dep: 'Environment',
    optional: true
  }, {
    dep: 'AvailabilityMonitorOptions',
    optional: true
  }]
}), _dec(_class =
/*#__PURE__*/
function (_RcModule) {
  _inherits(AvailabilityMonitor, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Alert} params.alert - alert module instance
   * @param {Client} params.client - client module instance
   * @param {Environment} params.environment - environment module instance
   */
  function AvailabilityMonitor(_ref) {
    var _context;

    var _this;

    var alert = _ref.alert,
        client = _ref.client,
        environment = _ref.environment,
        _ref$enabled = _ref.enabled,
        enabled = _ref$enabled === void 0 ? false : _ref$enabled,
        options = _objectWithoutProperties(_ref, ["alert", "client", "environment", "enabled"]);

    _classCallCheck(this, AvailabilityMonitor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AvailabilityMonitor).call(this, _objectSpread({
      actionTypes: _actionTypes["default"],
      enabled: enabled
    }, options)));
    _this._enabled = enabled;
    _this._alert = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, alert, 'alert');
    _this._client = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, client, 'client');
    _this._environment = environment;
    _this._lastEnvironmentCounter = 0;
    _this._healthRetryTime = HEALTH_CHECK_INTERVAL;
    _this._reducer = (0, _availabilityMonitorReducer["default"])(_this.actionTypes); // auto bind this

    _this._beforeRequestHandler = (_context = _assertThisInitialized(_this), _this._beforeRequestHandler).bind(_context);
    _this._requestErrorHandler = (_context = _assertThisInitialized(_this), _this._requestErrorHandler).bind(_context);
    return _this;
  }

  _createClass(AvailabilityMonitor, [{
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(this.pending && (!this._environment || this._environment.ready));
    }
  }, {
    key: "_shouldRebindHandlers",
    value: function _shouldRebindHandlers() {
      return !!(this.ready && this._environment && this._environment.ready && this._environment.changeCounter !== this._lastEnvironmentCounter);
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this.store.dispatch({
          type: this.actionTypes.init
        });

        this._bindHandlers();

        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
      } else if (this._shouldRebindHandlers()) {
        this._lastEnvironmentCounter = this._environment.changeCounter;

        this._bindHandlers();
      }
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_bindHandlers",
    value: function _bindHandlers() {
      var _this3 = this;

      if (this._unbindHandlers) {
        this._unbindHandlers();
      }

      var client = this._client.service.platform().client();

      client.on(client.events.beforeRequest, this._beforeRequestHandler); // TODO: in other modules, when they catch error first check if app is in HA mode.

      client.on(client.events.requestError, this._requestErrorHandler);

      this._unbindHandlers = function () {
        client.removeListener(client.events.beforeRequest, _this3._beforeRequestHandler);
        client.removeListener(client.events.requestError, _this3._requestErrorHandler);
        _this3._unbindHandlers = null;
      };
    }
  }, {
    key: "_beforeRequestHandler",
    value: function _beforeRequestHandler(params) {
      if (!this.isLimitedAvailabilityMode || !this._enabled) {
        return;
      }

      var requestUrl = (0, _ramda.pathOr)(null, ['_request', 'url'], params);
      var requestMethod = (0, _ramda.pathOr)(null, ['_request', 'method'], params);

      if (!requestUrl || !requestMethod) {
        return;
      } // In the limited availability mode, should not block status check api
      // or highly availability api.


      if ((0, _availabilityMonitorHelper.extractUrl)({
        url: requestUrl
      }) === STATUS_END_POINT || (0, _availabilityMonitorHelper.isHAEnabledAPI)({
        url: requestUrl,
        method: requestMethod
      })) {
        return;
      }

      throw new Error(_errorMessages["default"].serviceLimited);
    }
    /**
     * Check if app can enter LA mode.
     * If this module is not enabled, just return.
     *
     * @param {*} error Http response
     * @memberof AvailabilityMonitor
     */

  }, {
    key: "_requestErrorHandler",
    value: function _requestErrorHandler(error) {
      if (!(0, _availabilityMonitorHelper.isHAError)(error) || !this._enabled) {
        // TODO: Request url included in initial api when app is in initial. If true enter initial error.
        return;
      }

      this.showAlert(_errorMessages["default"].serviceLimited);
      var retryAfter = (0, _ramda.pathOr)(-1, ['apiResponse', '_response', 'headers', 'retryAfter'], error);

      if (retryAfter > 0) {
        this._healthRetryTime = retryAfter;
      }

      this._switchToLimitedAvailabilityMode();
    }
  }, {
    key: "_switchToLimitedAvailabilityMode",
    value: function () {
      var _switchToLimitedAvailabilityMode2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.isLimitedAvailabilityMode) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                this.store.dispatch({
                  type: this.actionTypes.limitedMode
                });
                this._limitedTimeout = setTimeout(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return _this4._intervalHealthCheck();

                        case 2:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee);
                })), this._healthRetryTime);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function _switchToLimitedAvailabilityMode() {
        return _switchToLimitedAvailabilityMode2.apply(this, arguments);
      }

      return _switchToLimitedAvailabilityMode;
    }()
  }, {
    key: "_switchToNormalMode",
    value: function _switchToNormalMode() {
      if (!this.isLimitedAvailabilityMode) {
        return;
      }

      this.store.dispatch({
        type: this.actionTypes.normalMode
      });

      this._clearTimeout(this._normalTimeout);

      this._clearTimeout(this._limitedTimeout);

      if (!this._alert) {
        return;
      } // dismiss disconnected alerts if found


      var alertIds = this._alert.messages.filter(function (m) {
        return m.message === _errorMessages["default"].serviceLimited;
      }) // eslint-disable-line arrow-parens
      .map(function (m) {
        return m.id;
      }); // eslint-disable-line arrow-parens


      if (alertIds.length) {
        this._alert.dismiss(alertIds);
      }
    }
    /**
     * Clear timeout handler when it's not needed
     */

  }, {
    key: "_clearTimeout",
    value: function _clearTimeout(timeoutHandler) {
      if (!timeoutHandler) {
        return;
      }

      clearTimeout(timeoutHandler);
      timeoutHandler = null;
    }
  }, {
    key: "_getStatus",
    value: function () {
      var _getStatus2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._client.service.platform().get('/status');

              case 2:
                res = _context4.sent;
                return _context4.abrupt("return", res && res.response());

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee3, this);
      }));

      function _getStatus() {
        return _getStatus2.apply(this, arguments);
      }

      return _getStatus;
    }()
    /**
     * Keep retrying with different intervals
     * @returns
     * @memberof AvailabilityMonitor
     */

  }, {
    key: "_intervalHealthCheck",
    value: function () {
      var _intervalHealthCheck2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var _this5 = this;

        var response, retryAfter, waitingTime;
        return regeneratorRuntime.wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this._clearTimeout(this._limitedTimeout);

                _context6.next = 3;
                return this._getStatus();

              case 3:
                response = _context6.sent;
                retryAfter = (0, _ramda.pathOr)(0, ['headers', 'retryAfter'], response);

                if (!(response && response.status === 200)) {
                  _context6.next = 9;
                  break;
                }

                waitingTime = (0, _availabilityMonitorHelper.generateRandomNumber)(); // Generate random seconds (0 ~ 3000)

                this._normalTimeout = setTimeout(function () {
                  _this5._switchToNormalMode();
                }, waitingTime);
                return _context6.abrupt("return");

              case 9:
                if (retryAfter > 0) {
                  this._healthRetryTime = retryAfter;
                } else {
                  this._healthRetryTime = HEALTH_CHECK_INTERVAL;
                }

                this._limitedTimeout = setTimeout(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee4() {
                  return regeneratorRuntime.wrap(function _callee4$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return _this5._intervalHealthCheck();

                        case 2:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee4);
                })), this._healthRetryTime);

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee5, this);
      }));

      function _intervalHealthCheck() {
        return _intervalHealthCheck2.apply(this, arguments);
      }

      return _intervalHealthCheck;
    }()
  }, {
    key: "showAlert",
    value: function showAlert(message) {
      if (!this._alert) {
        return;
      }

      this._alert.warning({
        message: message,
        allowDuplicates: false
      });
    }
    /**
     * Check if the error is Survival Mode error,
     * Or if app is already in Survival Mode and current request is blocked with an error.
     */

  }, {
    key: "checkIfHAError",
    value: function checkIfHAError(error) {
      var errMessage = (0, _ramda.pathOr)(null, ['message'], error);
      return (0, _availabilityMonitorHelper.isHAError)(error) || errMessage === _errorMessages["default"].serviceLimited;
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "pending",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].pending;
    }
    /**
     * Is App in limited mode
     *
     * @readonly
     * @memberof AvailabilityMonitor
     */

  }, {
    key: "isLimitedAvailabilityMode",
    get: function get() {
      return this.state.isLimitedAvailabilityMode.mode === _availabilityStatus["default"].LIMITED;
    }
  }, {
    key: "isAppInitialErrorMode",
    get: function get() {
      return this.state.isAppInitialError;
    }
  }]);

  return AvailabilityMonitor;
}(_RcModule2["default"])) || _class);
exports["default"] = AvailabilityMonitor;
//# sourceMappingURL=index.js.map
