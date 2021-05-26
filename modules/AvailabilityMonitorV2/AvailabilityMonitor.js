"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AvailabilityMonitor = exports.STATUS_END_POINT = exports.HEALTH_CHECK_INTERVAL = void 0;

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.is-nan");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _ramda = require("ramda");

var _debounceThrottle = require("../../lib/debounce-throttle");

var _di = require("../../lib/di");

var _validateIsOffline = _interopRequireDefault(require("../../lib/validateIsOffline"));

var _availabilityMonitorHelper = require("./availabilityMonitorHelper");

var _errorMessages = require("./errorMessages");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var HEALTH_CHECK_INTERVAL = 60 * 1000;
exports.HEALTH_CHECK_INTERVAL = HEALTH_CHECK_INTERVAL;
var STATUS_END_POINT = '/restapi/v1.0/status';
exports.STATUS_END_POINT = STATUS_END_POINT;
var DEFAULT_TIME = 0;
var AvailabilityMonitor = (_dec = (0, _di.Module)({
  name: 'AvailabilityMonitor',
  deps: ['Auth', 'Client', {
    dep: 'Environment',
    optional: true
  }, {
    dep: 'AvailabilityMonitorOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(AvailabilityMonitor, _RcModuleV);

  var _super = _createSuper(AvailabilityMonitor);

  function AvailabilityMonitor(deps) {
    var _this$_deps$availabil, _this$_deps$availabil2;

    var _this;

    _classCallCheck(this, AvailabilityMonitor);

    _this = _super.call(this, {
      deps: deps
    });
    _this._enabled = (_this$_deps$availabil = (_this$_deps$availabil2 = _this._deps.availabilityMonitorOptions) === null || _this$_deps$availabil2 === void 0 ? void 0 : _this$_deps$availabil2.enabled) !== null && _this$_deps$availabil !== void 0 ? _this$_deps$availabil : false;
    _this._randomTime = DEFAULT_TIME;
    _this._limitedTimeout = null;
    _this._normalTimeout = null;
    _this._promise = null;
    _this._healthRetryTime = HEALTH_CHECK_INTERVAL;
    _this._unbindHandlers = null;

    _initializerDefineProperty(_this, "hasLimitedStatusError", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "isLimitedMode", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "isVoIPOnlyMode", _descriptor3, _assertThisInitialized(_this));

    _this._beforeRequestHandler = function (params) {
      if (!_this.isLimitedAvailabilityMode || !_this._enabled) {
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

      throw new Error(_errorMessages.errorMessages.serviceLimited);
    };

    _this._requestErrorHandler = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(error) {
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

                if (!(_this.isLimitedAvailabilityMode && extractedUrl === STATUS_END_POINT && !(0, _availabilityMonitorHelper.isHAError)(error))) {
                  _context.next = 9;
                  break;
                }

                if (!_this.hasLimitedStatusError) {
                  _this.setLimitedModeStatusError();
                }

                return _context.abrupt("return");

              case 9:
                if (!(!(0, _availabilityMonitorHelper.isHAError)(error) || !_this._enabled)) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return");

              case 11:
                headers = (0, _ramda.pathOr)({}, ['response', 'headers'], error);
                retryAfter = _this._retrieveRetryAfter(headers);

                if (retryAfter > 0) {
                  // Retry-After unit is secons, make it mili-secons
                  _this._healthRetryTime = retryAfter * 1000;
                } else {
                  _this._healthRetryTime = HEALTH_CHECK_INTERVAL;
                }

                _this._switchToLimitedMode();

                _this._retry();

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this._refreshErrorHandler = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(error) {
        var isOffline, platform, RES_STATUS, refreshTokenValid;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                isOffline = (0, _validateIsOffline["default"])(error.message);
                platform = _this._deps.client.service.platform();
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
                  _this._switchToVoIPOnlyMode();
                }

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this._refreshSuccessHandler = function () {
      if (_this.isVoIPOnlyMode) {
        _this.setVoIPOnlyReset();
      }

      _this._clearLimitedTimeout();
    };

    _this._switchToVoIPOnlyMode = function () {
      if (_this.isVoIPOnlyMode) {
        return;
      }

      _this._healthRetryTime = HEALTH_CHECK_INTERVAL;

      _this.setVoIPOnlyMode();

      _this._retry();
    };

    _this._switchToNormalMode = function () {
      if (!_this.isLimitedAvailabilityMode) {
        return;
      }

      _this.setNormalMode();

      _this._clearLimitedTimeout();

      _this._clearNormalTimeout();
    };

    _this.healthCheck = (0, _debounceThrottle.promisedThrottle)({
      fn: function fn() {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt("return", _this2._healthCheck({
                    manual: true
                  }));

                case 1:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }))();
      }
    });
    return _this;
  }
  /**
   * When App is in Limited Mode and Status check met a non-503 error
   */


  _createClass(AvailabilityMonitor, [{
    key: "setLimitedModeStatusError",
    value: function setLimitedModeStatusError() {
      this.hasLimitedStatusError = true;
    }
  }, {
    key: "setNormalMode",
    value: function setNormalMode() {
      this.hasLimitedStatusError = false;
      this.isLimitedMode = false;
      this.isVoIPOnlyMode = false;
    }
  }, {
    key: "setLimitedMode",
    value: function setLimitedMode() {
      this.isLimitedMode = true;
    }
  }, {
    key: "setVoIPOnlyMode",
    value: function setVoIPOnlyMode() {
      this.isVoIPOnlyMode = true;
    }
  }, {
    key: "setVoIPOnlyReset",
    value: function setVoIPOnlyReset() {
      this.isVoIPOnlyMode = false;
    }
  }, {
    key: "onInit",
    value: function onInit() {
      this._bindHandlers();
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this3 = this;

      (0, _core.watch)(this, function () {
        return _this3._deps.environment.changeCounter;
      }, function () {
        var _this3$_deps$environm;

        if (_this3.ready && ((_this3$_deps$environm = _this3._deps.environment) === null || _this3$_deps$environm === void 0 ? void 0 : _this3$_deps$environm.ready)) {
          _this3._bindHandlers();
        }
      });
    }
  }, {
    key: "_bindHandlers",
    value: function _bindHandlers() {
      var _this4 = this;

      if (this._unbindHandlers) {
        this._unbindHandlers();
      }

      var client = this._deps.client.service.client();

      var platform = this._deps.client.service.platform(); // TODO: in other modules, when they catch error first check if app is in HA mode.


      client.on(client.events.beforeRequest, this._beforeRequestHandler);
      client.on(client.events.requestError, this._requestErrorHandler);
      platform.addListener(platform.events.loginSuccess, this._switchToNormalMode);
      platform.addListener(platform.events.logoutSuccess, this._switchToNormalMode);
      platform.addListener(platform.events.logoutError, this._switchToNormalMode);
      platform.addListener(platform.events.refreshError, this._refreshErrorHandler);
      platform.addListener(platform.events.refreshSuccess, this._refreshSuccessHandler);

      this._unbindHandlers = function () {
        client.removeListener(client.events.beforeRequest, _this4._beforeRequestHandler);
        client.removeListener(client.events.requestError, _this4._requestErrorHandler);
        platform.removeListener(platform.events.loginSuccess, _this4._switchToNormalMode);
        platform.removeListener(platform.events.logoutSuccess, _this4._switchToNormalMode);
        platform.removeListener(platform.events.logoutError, _this4._switchToNormalMode);
        platform.removeListener(platform.events.refreshError, _this4._refreshErrorHandler);
        platform.removeListener(platform.events.refreshSuccess, _this4._refreshSuccessHandler);
        _this4._unbindHandlers = null;
      };
    }
  }, {
    key: "_retrieveRetryAfter",

    /**
     * Retrieve retry after value from response headers
     */
    value: function _retrieveRetryAfter(headers) {
      try {
        var retryAfter = parseFloat("".concat(headers.get('Retry-After') || -1));
        return Number.isNaN(retryAfter) ? -1 : retryAfter;
      } catch (error) {
        return -1;
      }
    }
    /**
     * Check if app can enter LA mode.
     * If this module is not enabled, just return.
     *
     */

  }, {
    key: "_switchToLimitedMode",
    value: function _switchToLimitedMode() {
      if (this.isLimitedMode) {
        return;
      }

      this.setLimitedMode();
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
      var _getStatus2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var res;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._deps.client.service.platform().get('/restapi/v1.0/status', null, {
                  skipAuthCheck: true,
                  headers: {
                    Authorization: "Bearer ".concat(this._deps.auth.accessToken)
                  }
                });

              case 2:
                res = _context4.sent;
                return _context4.abrupt("return", res);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _getStatus() {
        return _getStatus2.apply(this, arguments);
      }

      return _getStatus;
    }()
  }, {
    key: "_retry",
    value: function _retry() {
      var _this5 = this;

      if (!this._limitedTimeout) {
        this._limitedTimeout = setTimeout(function () {
          _this5._clearLimitedTimeout();

          _this5._healthCheck();
        }, this._healthRetryTime);
      }
    }
    /**
     * Inner method of health checking
     */

  }, {
    key: "_healthCheck",
    value: function () {
      var _healthCheck2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _this6 = this;

        var _ref3,
            _ref3$manual,
            manual,
            response,
            _args5 = arguments;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _ref3 = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {}, _ref3$manual = _ref3.manual, manual = _ref3$manual === void 0 ? false : _ref3$manual;

                if (!this._promise) {
                  _context5.next = 3;
                  break;
                }

                return _context5.abrupt("return");

              case 3:
                _context5.prev = 3;
                this._promise = this._getStatus();
                _context5.next = 7;
                return this._promise;

              case 7:
                response = _context5.sent;

                if (!(!response || response.status !== 200)) {
                  _context5.next = 10;
                  break;
                }

                return _context5.abrupt("return");

              case 10:
                _context5.next = 16;
                break;

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](3);
                console.error('error from request of /restapi/v1.0/status.');
                return _context5.abrupt("return");

              case 16:
                _context5.prev = 16;
                this._promise = null;
                return _context5.finish(16);

              case 19:
                if (!manual) {
                  _context5.next = 23;
                  break;
                }

                this._clearNormalTimeout();

                this._switchToNormalMode();

                return _context5.abrupt("return");

              case 23:
                // In the described situation Client Application should follow an "Exponential Backoff" approach:
                // The retries exponentially increase the waiting time up to a certain threshold.
                // The idea is that if the server is down temporarily,
                // it is not overwhelmed with requests hitting at the same time when it comes back up.
                //
                // Reference: https://wiki.ringcentral.com/display/PLAT/Error+Handling+Guidelines+for+API+Clients
                this._randomTime = this._randomTime || (0, _availabilityMonitorHelper.generateRandomNumber)(); // Generate random seconds (1 ~ 121)

                this._normalTimeout = setTimeout(function () {
                  _this6._clearNormalTimeout();

                  _this6._switchToNormalMode();
                }, this._randomTime * 1000);

              case 25:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[3, 12, 16, 19]]);
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
    key: "checkIfHAError",

    /**
     * Check if the error is Survival Mode error,
     * Or if app is already in Survival Mode and current request is blocked with an error.
     */
    value: function () {
      var _checkIfHAError = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(error) {
        var errMessage;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                errMessage = (0, _ramda.pathOr)(null, ['message'], error);

                if (!error.response) {
                  _context6.next = 5;
                  break;
                }

                _context6.next = 4;
                return error.response.clone().json();

              case 4:
                error.response._json = _context6.sent;

              case 5:
                return _context6.abrupt("return", (0, _availabilityMonitorHelper.isHAError)(error) || errMessage === _errorMessages.errorMessages.serviceLimited);

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function checkIfHAError(_x3) {
        return _checkIfHAError.apply(this, arguments);
      }

      return checkIfHAError;
    }()
    /**
     * Is App in limited mode
     */

  }, {
    key: "isLimitedAvailabilityMode",
    get: function get() {
      return this.isLimitedMode || this.isVoIPOnlyMode;
    }
  }]);

  return AvailabilityMonitor;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "hasLimitedStatusError", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isLimitedMode", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "isVoIPOnlyMode", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setLimitedModeStatusError", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLimitedModeStatusError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setNormalMode", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setNormalMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLimitedMode", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLimitedMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setVoIPOnlyMode", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setVoIPOnlyMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setVoIPOnlyReset", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setVoIPOnlyReset"), _class2.prototype)), _class2)) || _class);
exports.AvailabilityMonitor = AvailabilityMonitor;
//# sourceMappingURL=AvailabilityMonitor.js.map
