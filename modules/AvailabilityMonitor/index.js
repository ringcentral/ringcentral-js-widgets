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

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.is-nan");

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

var _validateIsOffline = _interopRequireDefault(require("../../lib/validateIsOffline"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
  deps: ['Auth', 'Client', {
    dep: 'Environment',
    optional: true
  }, {
    dep: 'AvailabilityMonitorOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcModule) {
  _inherits(AvailabilityMonitor, _RcModule);

  var _super = _createSuper(AvailabilityMonitor);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {Client} params.client - client module instance
   * @param {Environment} params.environment - environment module instance
   */
  function AvailabilityMonitor(_ref) {
    var _this;

    var auth = _ref.auth,
        client = _ref.client,
        environment = _ref.environment,
        _ref$enabled = _ref.enabled,
        enabled = _ref$enabled === void 0 ? false : _ref$enabled,
        options = _objectWithoutProperties(_ref, ["auth", "client", "environment", "enabled"]);

    _classCallCheck(this, AvailabilityMonitor);

    _this = _super.call(this, _objectSpread({
      actionTypes: _actionTypes["default"],
      enabled: enabled
    }, options));
    _this._enabled = enabled;
    _this._auth = auth;
    _this._client = _ensureExist["default"].call(_assertThisInitialized(_this), client, 'client');
    _this._environment = environment;
    _this._lastEnvironmentCounter = 0;
    _this._healthRetryTime = HEALTH_CHECK_INTERVAL;
    _this._reducer = (0, _availabilityMonitorReducer["default"])(_this.actionTypes); // auto bind this

    _this._beforeRequestHandler = _this._beforeRequestHandler.bind(_assertThisInitialized(_this));
    _this._requestErrorHandler = _this._requestErrorHandler.bind(_assertThisInitialized(_this));
    _this._refreshErrorHandler = _this._refreshErrorHandler.bind(_assertThisInitialized(_this));
    _this._refreshSuccessHandler = _this._refreshSuccessHandler.bind(_assertThisInitialized(_this));
    _this._switchToNormalMode = _this._switchToNormalMode.bind(_assertThisInitialized(_this));
    _this._switchToVoIPOnlyMode = _this._switchToVoIPOnlyMode.bind(_assertThisInitialized(_this));
    _this._randomTime = DEFAULT_TIME;
    _this._limitedTimeout = null;
    _this._normalTimeout = null;
    _this._promise = null;
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

      var client = this._client.service.client();

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
     * Retrieve retry after value from response headers
     * @param {*} headers
     */

  }, {
    key: "_retrieveRetryAfter",
    value: function _retrieveRetryAfter(headers) {
      try {
        var retryAfter = parseFloat(headers.get('Retry-After') || -1);
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
    value: function () {
      var _requestErrorHandler2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(error) {
        var requestUrl, extractedUrl, headers, retryAfter;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(error.response && !error.response._json)) {
                  _context.next = 4;
                  break;
                }

                _context.next = 3;
                return error.response.clone().json();

              case 3:
                error.response._json = _context.sent;

              case 4:
                requestUrl = (0, _ramda.pathOr)('', ['request', 'url'], error);
                extractedUrl = (0, _availabilityMonitorHelper.extractUrl)({
                  url: requestUrl
                }); // If app is in Limited Mode and staus API met a status which is not 200 nor 503

                if (!(this.isLimitedAvailabilityMode && extractedUrl === STATUS_END_POINT && !(0, _availabilityMonitorHelper.isHAError)(error))) {
                  _context.next = 9;
                  break;
                }

                if (!this.hasLimitedStatusError) {
                  this.store.dispatch({
                    type: this.actionTypes.limitedModeStatusError
                  });
                }

                return _context.abrupt("return");

              case 9:
                if (!(!(0, _availabilityMonitorHelper.isHAError)(error) || !this._enabled)) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return");

              case 11:
                headers = (0, _ramda.pathOr)({}, ['response', 'headers'], error);
                retryAfter = this._retrieveRetryAfter(headers);

                if (retryAfter > 0) {
                  // Retry-After unit is secons, make it mili-secons
                  this._healthRetryTime = retryAfter * 1000;
                } else {
                  this._healthRetryTime = HEALTH_CHECK_INTERVAL;
                }

                this._switchToLimitedMode();

                this._retry();

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _requestErrorHandler(_x) {
        return _requestErrorHandler2.apply(this, arguments);
      }

      return _requestErrorHandler;
    }()
  }, {
    key: "_refreshErrorHandler",
    value: function () {
      var _refreshErrorHandler2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(error) {
        var isOffline, platform, RES_STATUS, refreshTokenValid;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                isOffline = (0, _validateIsOffline["default"])(error.message);
                platform = this._client.service.platform();
                RES_STATUS = error.response && error.response.status || null;
                _context2.t0 = isOffline || RES_STATUS >= 500;

                if (!_context2.t0) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 7;
                return platform.auth().refreshTokenValid();

              case 7:
                _context2.t0 = _context2.sent;

              case 8:
                refreshTokenValid = _context2.t0;

                if (refreshTokenValid) {
                  this._switchToVoIPOnlyMode();
                }

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _refreshErrorHandler(_x2) {
        return _refreshErrorHandler2.apply(this, arguments);
      }

      return _refreshErrorHandler;
    }()
  }, {
    key: "_refreshSuccessHandler",
    value: function _refreshSuccessHandler() {
      if (this.isVoIPOnlyMode) {
        this.store.dispatch({
          type: this.actionTypes.VoIPOnlyReset
        });
      }

      this._clearLimitedTimeout();
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
      var _getStatus2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._client.service.platform().get('/restapi/v1.0/status', null, {
                  skipAuthCheck: true,
                  headers: {
                    Authorization: "Bearer ".concat(this._auth.accessToken)
                  }
                });

              case 2:
                res = _context3.sent;
                return _context3.abrupt("return", res);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
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
      var _healthCheck2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this5 = this;

        var _ref2,
            _ref2$manual,
            manual,
            response,
            _args4 = arguments;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _ref2 = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {}, _ref2$manual = _ref2.manual, manual = _ref2$manual === void 0 ? false : _ref2$manual;

                if (!this._promise) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return");

              case 3:
                _context4.prev = 3;
                this._promise = this._getStatus();
                _context4.next = 7;
                return this._promise;

              case 7:
                response = _context4.sent;

                if (!(!response || response.status !== 200)) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt("return");

              case 10:
                _context4.next = 16;
                break;

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4["catch"](3);
                console.error('error from request of /restapi/v1.0/status.');
                return _context4.abrupt("return");

              case 16:
                _context4.prev = 16;
                this._promise = null;
                return _context4.finish(16);

              case 19:
                if (!manual) {
                  _context4.next = 23;
                  break;
                }

                this._clearNormalTimeout();

                this._switchToNormalMode();

                return _context4.abrupt("return");

              case 23:
                // In the described situation Client Application should follow an "Exponential Backoff" approach:
                // The retries exponentially increase the waiting time up to a certain threshold.
                // The idea is that if the server is down temporarily,
                // it is not overwhelmed with requests hitting at the same time when it comes back up.
                //
                // Reference: https://wiki.ringcentral.com/display/PLAT/Error+Handling+Guidelines+for+API+Clients
                this._randomTime = this._randomTime || (0, _availabilityMonitorHelper.generateRandomNumber)(); // Generate random seconds (1 ~ 121)

                this._normalTimeout = setTimeout(function () {
                  _this5._clearNormalTimeout();

                  _this5._switchToNormalMode();
                }, this._randomTime * 1000);

              case 25:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[3, 12, 16, 19]]);
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
      var _healthCheck3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _this6 = this;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this._throttledHealthCheck) {
                  this._throttledHealthCheck = (0, _throttle["default"])( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _context5.next = 2;
                            return _this6._healthCheck({
                              manual: true
                            });

                          case 2:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5);
                  })));
                }

                this._throttledHealthCheck();

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
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
    value: function () {
      var _checkIfHAError = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(error) {
        var errMessage;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                errMessage = (0, _ramda.pathOr)(null, ['message'], error);

                if (!error.response) {
                  _context7.next = 5;
                  break;
                }

                _context7.next = 4;
                return error.response.clone().json();

              case 4:
                error.response._json = _context7.sent;

              case 5:
                return _context7.abrupt("return", (0, _availabilityMonitorHelper.isHAError)(error) || errMessage === _errorMessages["default"].serviceLimited);

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function checkIfHAError(_x3) {
        return _checkIfHAError.apply(this, arguments);
      }

      return checkIfHAError;
    }()
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
