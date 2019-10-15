"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.STATUS_END_POINT = exports.HEALTH_CHECK_INTERVAL = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.is-nan");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.function.bind");

var _ramda = require("ramda");

var _di = require("../../lib/di");

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _availabilityMonitorReducer = _interopRequireDefault(require("./availabilityMonitorReducer"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _availabilityMonitorHelper = require("./availabilityMonitorHelper");

var _errorMessages = _interopRequireDefault(require("./errorMessages"));

var _throttle = _interopRequireDefault(require("../../lib/throttle"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
exports.STATUS_END_POINT = STATUS_END_POINT;
var DEFAULT_TIME = 0;
/**
 * @class AvailabilityMonitor
 * @description Connectivity monitor module
 */

var AvailabilityMonitor = (_dec = (0, _di.Module)({
  deps: ['Client', {
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
    _this._client = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, client, 'client');
    _this._environment = environment;
    _this._lastEnvironmentCounter = 0;
    _this._healthRetryTime = HEALTH_CHECK_INTERVAL;
    _this._reducer = (0, _availabilityMonitorReducer["default"])(_this.actionTypes); // auto bind this

    _this._beforeRequestHandler = (_context = _assertThisInitialized(_this), _this._beforeRequestHandler).bind(_context);
    _this._requestErrorHandler = (_context = _assertThisInitialized(_this), _this._requestErrorHandler).bind(_context);
    _this._refreshErrorHandler = (_context = _assertThisInitialized(_this), _this._refreshErrorHandler).bind(_context);
    _this._refreshSuccessHandler = (_context = _assertThisInitialized(_this), _this._refreshSuccessHandler).bind(_context);
    _this._switchToNormalMode = (_context = _assertThisInitialized(_this), _this._switchToNormalMode).bind(_context);
    _this._switchToVoIPOnlyMode = (_context = _assertThisInitialized(_this), _this._switchToVoIPOnlyMode).bind(_context);
    _this._randomTime = DEFAULT_TIME;
    _this._limitedTimeout = null;
    _this._normalTimeout = null;
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

      var platform = this._client.service.platform(); // TODO: in other modules, when they catch error first check if app is in HA mode.


      client.on(client.events.beforeRequest, this._beforeRequestHandler);
      client.on(client.events.requestError, this._requestErrorHandler);
      platform.addListener(platform.events.loginSuccess, this._switchToNormalMode);
      platform.addListener(platform.events.logoutSuccess, this._switchToNormalMode);
      platform.addListener(platform.events.logoutError, this._switchToNormalMode);
      platform.addListener(platform.events.refreshError, this._refreshErrorHandler);
      platform.addListener(platform.events.refreshSuccess, this._refreshSuccessHandler);

      this._unbindHandlers = function () {
        client.removeListener(client.events.beforeRequest, _this3._beforeRequestHandler);
        client.removeListener(client.events.requestError, _this3._requestErrorHandler);
        platform.removeListener(platform.events.loginSuccess, _this3._switchToNormalMode);
        platform.removeListener(platform.events.logoutSuccess, _this3._switchToNormalMode);
        platform.removeListener(platform.events.logoutError, _this3._switchToNormalMode);
        platform.removeListener(platform.events.refreshError, _this3._refreshErrorHandler);
        platform.removeListener(platform.events.refreshSuccess, _this3._refreshSuccessHandler);
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
     * Retrieve retry after value from repsonse headers
     * @param {*} headers
     */

  }, {
    key: "_retrieveRetryAfter",
    value: function _retrieveRetryAfter(headers) {
      try {
        var retryAfter = parseFloat(headers.get('Retry-After') || -1);

        if (retryAfter < 0) {
          var h = (0, _ramda.pathOr)({}, ['_headers', 'retry-after'], headers) || -1;
          retryAfter = Array.isArray(h) ? parseFloat(h[0]) : -1; // retryAfter = h['retry-after'] || -1;
        }

        return Number.isNaN(retryAfter) ? -1 : retryAfter;
      } catch (error) {
        return -1;
      }
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
      var requestUrl = (0, _ramda.pathOr)('', ['apiResponse', '_request', 'url'], error);
      var extractedUrl = (0, _availabilityMonitorHelper.extractUrl)({
        url: requestUrl
      }); // If app is in Limited Mode and staus API met a status which is not 200 nor 503

      if (this.isLimitedAvailabilityMode && extractedUrl === STATUS_END_POINT && !(0, _availabilityMonitorHelper.isHAError)(error)) {
        if (!this.hasLimitedStatusError) {
          this.store.dispatch({
            type: this.actionTypes.limitedModeStatusError
          });
        }

        return;
      }

      if (!(0, _availabilityMonitorHelper.isHAError)(error) || !this._enabled) {
        return;
      }

      var headers = (0, _ramda.pathOr)({}, ['apiResponse', '_response', 'headers'], error);

      var retryAfter = this._retrieveRetryAfter(headers);

      if (retryAfter > 0) {
        // Retry-After unit is secons, make it mili-secons
        this._healthRetryTime = retryAfter * 1000;
      } else {
        this._healthRetryTime = HEALTH_CHECK_INTERVAL;
      }

      this._switchToLimitedMode();

      this._retry();
    }
  }, {
    key: "_refreshErrorHandler",
    value: function _refreshErrorHandler(error) {
      var isOffline = error.message === 'Failed to fetch' || error.message === 'The Internet connection appears to be offline.' || error.message === 'NetworkError when attempting to fetch resource.' || error.message === 'Network Error 0x2ee7, Could not complete the operation due to error 00002ee7.';

      var platform = this._client.service.platform();

      var RES_STATUS = error.apiResponse && error.apiResponse._response && error.apiResponse._response.status || null;
      var refreshTokenValid = (isOffline || RES_STATUS >= 500) && platform.auth().refreshTokenValid();

      if (refreshTokenValid) {
        this._switchToVoIPOnlyMode();
      }
    }
  }, {
    key: "_refreshSuccessHandler",
    value: function _refreshSuccessHandler() {
      if (this.isVoIPOnlyMode) {
        this.store.dispatch({
          type: this.actionTypes.VoIPOnlyReset
        });
      }
    }
  }, {
    key: "_switchToVoIPOnlyMode",
    value: function _switchToVoIPOnlyMode() {
      if (this.isVoIPOnlyMode) {
        return;
      }

      this._healthRetryTime = HEALTH_CHECK_INTERVAL;
      this.store.dispatch({
        type: this.actionTypes.VoIPOnlyMode
      });

      this._retry();
    }
  }, {
    key: "_switchToLimitedMode",
    value: function _switchToLimitedMode() {
      if (this.isLimitedMode) {
        return;
      }

      this.store.dispatch({
        type: this.actionTypes.limitedMode
      });
    }
  }, {
    key: "_switchToNormalMode",
    value: function _switchToNormalMode() {
      if (!this.isLimitedAvailabilityMode) {
        return;
      }

      this.store.dispatch({
        type: this.actionTypes.normalMode
      });

      this._clearLimitedTimeout();

      this._clearNormalTimeout();
    }
  }, {
    key: "_clearLimitedTimeout",
    value: function _clearLimitedTimeout() {
      if (this._limitedTimeout) {
        clearTimeout(this._limitedTimeout);
        this._limitedTimeout = null;
      }
    }
  }, {
    key: "_clearNormalTimeout",
    value: function _clearNormalTimeout() {
      if (this._normalTimeout) {
        clearTimeout(this._normalTimeout);
        this._normalTimeout = null;
      }
    }
  }, {
    key: "_getStatus",
    value: function () {
      var _getStatus2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._client.service.platform().get('/status', null, {
                  skipAuthCheck: true
                });

              case 2:
                res = _context2.sent;
                return _context2.abrupt("return", res && res.response());

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, this);
      }));

      function _getStatus() {
        return _getStatus2.apply(this, arguments);
      }

      return _getStatus;
    }()
  }, {
    key: "_retry",
    value: function _retry() {
      var _this4 = this;

      if (!this._limitedTimeout) {
        this._limitedTimeout = setTimeout(function () {
          _this4._clearLimitedTimeout();

          _this4._healthCheck();
        }, this._healthRetryTime);
      }
    }
    /**
     * Inner method of health checking
     * @returns
     * @memberof AvailabilityMonitor
     */

  }, {
    key: "_healthCheck",
    value: function () {
      var _healthCheck2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this5 = this;

        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this._getStatus();

              case 3:
                response = _context3.sent;

                if (!(!response || response.status !== 200)) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return");

              case 6:
                _context3.next = 12;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);
                console.error('error from request of /restapi/v1.0/status.');
                return _context3.abrupt("return");

              case 12:
                this._randomTime = this._randomTime || (0, _availabilityMonitorHelper.generateRandomNumber)(); // Generate random seconds (1 ~ 121)

                this._normalTimeout = setTimeout(function () {
                  _this5._clearNormalTimeout();

                  _this5._switchToNormalMode();
                }, this._randomTime * 1000);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, this, [[0, 8]]);
      }));

      function _healthCheck() {
        return _healthCheck2.apply(this, arguments);
      }

      return _healthCheck;
    }()
    /**
     * Health check with status API
     */

  }, {
    key: "healthCheck",
    value: function () {
      var _healthCheck3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var _this6 = this;

        return regeneratorRuntime.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this._throttledHealthCheck) {
                  this._throttledHealthCheck = (0, _throttle["default"])(
                  /*#__PURE__*/
                  _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee3() {
                    return regeneratorRuntime.wrap(function _callee3$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.next = 2;
                            return _this6._healthCheck();

                          case 2:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee3);
                  })));
                }

                this._throttledHealthCheck();

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee4, this);
      }));

      function healthCheck() {
        return _healthCheck3.apply(this, arguments);
      }

      return healthCheck;
    }()
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
  }, {
    key: "isVoIPOnlyMode",
    get: function get() {
      return this.state.isVoIPOnlyMode;
    }
  }, {
    key: "isLimitedMode",
    get: function get() {
      return this.state.isLimitedMode;
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
      return this.isLimitedMode || this.isVoIPOnlyMode;
    }
    /**
     * When App is in Limited Mode and Status check met a non-503 error
     */

  }, {
    key: "hasLimitedStatusError",
    get: function get() {
      return this.state.hasLimitedStatusError;
    }
  }]);

  return AvailabilityMonitor;
}(_RcModule2["default"])) || _class);
exports["default"] = AvailabilityMonitor;
//# sourceMappingURL=index.js.map
