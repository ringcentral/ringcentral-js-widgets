"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.STATUS_END_POINT = exports.HEALTH_CHECK_INTERVAL = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("regenerator-runtime/runtime");

var _ramda = require("ramda");

var _di = require("../../lib/di");

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _availabilityMonitorReducer = _interopRequireDefault(require("./availabilityMonitorReducer"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _availabilityMonitorHelper = require("./availabilityMonitorHelper");

var _errorMessages = _interopRequireDefault(require("./errorMessages"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

// Constants
var HEALTH_CHECK_INTERVAL = 5 * 1000;
exports.HEALTH_CHECK_INTERVAL = HEALTH_CHECK_INTERVAL;
var STATUS_END_POINT = '/restapi/v1.0/status';
/**
 * TODO: Deal with `RateLimitor` in offline mode.
 * TODO: App initial errors.
 * TODO: When WebRTC met HA error.
 * TODO: Api match problems, the way finding *High* or *Limited* api is not working correctly.
 *
 * @class
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
      actionTypes: _actionTypes.default,
      enabled: enabled
    }, options)));
    _this._enabled = enabled;
    _this._alert = (_context = _assertThisInitialized(_assertThisInitialized(_this)), _ensureExist.default).call(_context, alert, 'alert');
    _this._client = (_context = _assertThisInitialized(_assertThisInitialized(_this)), _ensureExist.default).call(_context, client, 'client');
    _this._environment = environment;
    _this._lastEnvironmentCounter = 0;
    _this._healthRetryTime = HEALTH_CHECK_INTERVAL;
    _this._reducer = (0, _availabilityMonitorReducer.default)(_this.actionTypes);
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

      client.on(client.events.beforeRequest, function (params) {
        _this3._beforeRequestHandler(params);
      }); // !TODO: in other modules, when they catch error first check if app is in HA mode.

      client.on(client.events.requestError, function (params) {
        _this3._requestErrorHandler(params);
      });

      this._unbindHandlers = function () {
        client.removeListener(client.events.beforeRequest, _this3._beforeRequestHandler);
        client.removeListener(client.events.requestError, _this3._requestErrorHandler);
        _this3._unbindHandlers = null;
      };
    }
  }, {
    key: "_beforeRequestHandler",
    value: function _beforeRequestHandler(params) {
      if (!this.isLimitedAvailabilityMode) {
        return;
      }

      var requestUrl = (0, _ramda.pathOr)(null, ['_request', 'url'], params);
      var requestMethod = (0, _ramda.pathOr)(null, ['_request', 'method'], params);

      if (!requestUrl || !requestMethod) {
        return;
      } // TODO: the `extractUrl` method might not work with some urls
      // In the limited availability mode, should not block status check api
      // or highly availability api.


      if ((0, _availabilityMonitorHelper.extractUrl)({
        url: requestUrl
      }) === STATUS_END_POINT || (0, _availabilityMonitorHelper.isHAEnabledAPI)({
        url: requestUrl,
        method: requestMethod
      })) {
        return;
      }

      throw new Error(_errorMessages.default.serviceLimited);
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
                this.timeout = setTimeout(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          console.log('this._healthRetryTime', _this4._healthRetryTime);
                          _context2.next = 3;
                          return _this4._intervalHealthCheck();

                        case 3:
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
      console.log('swith to normal mode');

      if (!this.isLimitedAvailabilityMode) {
        return;
      }

      this.store.dispatch({
        type: this.actionTypes.normalMode
      });
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
                console.log('should randomize the health check');

                if (this.timeout) {
                  clearTimeout(this.timeout);
                }

                _context6.next = 4;
                return this._getStatus();

              case 4:
                response = _context6.sent;
                retryAfter = (0, _ramda.pathOr)(-1, ['headers', 'retryAfter'], response);
                console.log('response', response);

                if (!(response && response.status === 200)) {
                  _context6.next = 14;
                  break;
                }

                console.log('platform recover');
                waitingTime = (0, _availabilityMonitorHelper.generateRandomNumber)(); // Generate random seconds (0 ~ 3000)

                setTimeout(function () {
                  _this5._switchToNormalMode();
                }, waitingTime);
                return _context6.abrupt("return");

              case 14:
                if (retryAfter > 0) {
                  this._healthRetryTime = retryAfter;
                } else {
                  this._healthRetryTime = HEALTH_CHECK_INTERVAL;
                }

              case 15:
                this.timeout = setTimeout(
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

              case 16:
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
    key: "_showAlert",
    value: function _showAlert(errorLevel, message) {
      if (errorLevel === 'success') {
        this._alert.success({
          message: message
        });
      } else if (errorLevel === 'warning') {
        this._alert.warning({
          message: message
        });
      } else if (errorLevel === 'danger') {
        this._alert.danger({
          message: message
        });
      } else if (errorLevel === 'info') {
        this._alert.info({
          message: message
        });
      }
    }
  }, {
    key: "handleInitialError",

    /**
     * Handle app initial errors
     *
     * @param {*} error
     * @returns
     * @memberof AvailabilityMonitor
     */
    value: function handleInitialError(error) {
      if ((0, _availabilityMonitorHelper.isHAError)(error) || !this._enabled) {
        return;
      }

      this._showAlert('danger', _errorMessages.default.appInitialError); // TODO: Need corresponde action to switch APP state back to normal
      // this.store.dispatch({
      //   type: this.actionTypes.appInitialError,
      // });

    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
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
      return this.state.isLimitedAvailabilityMode;
    }
  }, {
    key: "isAppInitialErrorMode",
    get: function get() {
      return this.state.isAppInitialError;
    }
  }]);

  return AvailabilityMonitor;
}(_RcModule2.default)) || _class);
exports.default = AvailabilityMonitor;
//# sourceMappingURL=index.js.map
