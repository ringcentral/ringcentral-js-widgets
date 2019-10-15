"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

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

require("core-js/modules/es6.date.now");

var _ramda = require("ramda");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _getRateLimiterReducer = _interopRequireWildcard(require("./getRateLimiterReducer"));

var _errorMessages = _interopRequireDefault(require("./errorMessages"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _dec, _class, _class2, _temp;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var DEFAULT_THROTTLE_DURATION = 61 * 1000;
var DEFAULT_ALERT_TTL = 5 * 1000;
/**
 * @class
 * @description Rate limiter managing module
 */

var RateLimiter = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Client', {
    dep: 'Environment',
    optional: true
  }, 'GlobalStorage', {
    dep: 'RateLimiterOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_RcModule) {
  _inherits(RateLimiter, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Alert} params.alert - alert module instance
   * @param {Client} params.client - client module instance
   * @param {Environment} params.environment - environment module instance
   * @param {GlobalStorage} params.globalStorage - globalStorage module instance
   * @param {Number} params.throttleDuration - throttle duration, default 61 seconds
   */
  function RateLimiter(_ref) {
    var _this;

    var alert = _ref.alert,
        client = _ref.client,
        environment = _ref.environment,
        globalStorage = _ref.globalStorage,
        _ref$throttleDuration = _ref.throttleDuration,
        throttleDuration = _ref$throttleDuration === void 0 ? DEFAULT_THROTTLE_DURATION : _ref$throttleDuration,
        options = _objectWithoutProperties(_ref, ["alert", "client", "environment", "globalStorage", "throttleDuration"]);

    _classCallCheck(this, RateLimiter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RateLimiter).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes["default"]
    })));

    _this._beforeRequestHandler = function () {
      if (_this.throttling) {
        throw new Error(_errorMessages["default"].rateLimitReached);
      }
    };

    _this._checkTimestamp = function () {
      if (!_this.throttling) {
        _this.store.dispatch({
          type: _this.actionTypes.stopThrottle
        });
      }
    };

    _this._requestErrorHandler = function (apiResponse) {
      if (!(apiResponse instanceof Error) || apiResponse.message !== 'Request rate exceeded') {
        return;
      }

      var wasThrottling = _this.throttling;

      _this.store.dispatch({
        type: _this.actionTypes.startThrottle,
        timestamp: Date.now()
      });

      if (!wasThrottling) {
        _this.showAlert();
      } // Get `retry-after` from response headers first


      _this._throttleDuration = (0, _ramda.pathOr)(DEFAULT_THROTTLE_DURATION, ['apiResponse', '_response', 'headers', 'retry-after'], apiResponse);
      setTimeout(_this._checkTimestamp, _this._throttleDuration);
    };

    _this._alert = alert;
    _this._client = client;
    _this._environment = environment;
    _this._storage = globalStorage;
    _this._throttleDuration = throttleDuration;
    _this._storageKey = 'rateLimiterTimestamp';
    _this._reducer = (0, _getRateLimiterReducer["default"])(_this.actionTypes);

    _this._storage.registerReducer({
      key: _this._storageKey,
      reducer: (0, _getRateLimiterReducer.getTimestampReducer)(_this.actionTypes)
    });

    _this._timeoutId = null;
    _this._lastEnvironmentCounter = 0;
    return _this;
  }

  _createClass(RateLimiter, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_this2.ready && _this2._storage.ready && (!_this2._environment || _this2._environment.ready)) {
                  _this2._bindHandlers();

                  _this2.store.dispatch({
                    type: _this2.actionTypes.initSuccess
                  });
                } else if (_this2.ready && _this2._environment && _this2._environment.changeCounter !== _this2._lastEnvironmentCounter) {
                  _this2._lastEnvironmentCounter = _this2._environment.changeCounter;

                  _this2._bindHandlers();
                }

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    }
    /**
     * If the app is throttling, an incoming request will lead to an exception
     */

  }, {
    key: "showAlert",
    value: function () {
      var _showAlert = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!this.throttling || !this._alert)) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                this._alert.warning({
                  message: _errorMessages["default"].rateLimitReached,
                  ttl: DEFAULT_THROTTLE_DURATION,
                  allowDuplicates: false
                });

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function showAlert() {
        return _showAlert.apply(this, arguments);
      }

      return showAlert;
    }()
  }, {
    key: "_bindHandlers",
    value: function _bindHandlers() {
      var _this3 = this;

      if (this._unbindHandlers) {
        this._unbindHandlers();
      }

      var client = this._client.service.platform().client(); // TODO: Bind the `rateLimitError` event instead


      client.on(client.events.requestError, this._requestErrorHandler);
      client.on(client.events.beforeRequest, this._beforeRequestHandler);

      this._unbindHandlers = function () {
        client.removeListener(client.events.requestError, _this3._requestErrorHandler);
        client.removeListener(client.events.beforeRequest, _this3._beforeRequestHandler);
        _this3._unbindHandlers = null;
      };
    }
  }, {
    key: "ttl",
    get: function get() {
      return this.throttling ? this._throttleDuration - (Date.now() - this.timestamp) : 0;
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "timestamp",
    get: function get() {
      return this._storage.getItem(this._storageKey);
    }
  }, {
    key: "throttleDuration",
    get: function get() {
      return this._throttleDuration;
    }
    /**
     * Is in throttling status
     */

  }, {
    key: "throttling",
    get: function get() {
      return Date.now() - this._storage.getItem(this._storageKey) <= this._throttleDuration;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].ready;
    }
  }]);

  return RateLimiter;
}(_RcModule2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "showAlert", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "showAlert"), _class2.prototype)), _class2)) || _class);
exports["default"] = RateLimiter;
//# sourceMappingURL=index.js.map
