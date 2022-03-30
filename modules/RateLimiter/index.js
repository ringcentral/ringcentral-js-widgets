"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.parse-int");

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _di = require("../../lib/di");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _actionTypes = require("./actionTypes");

var _errorMessages = require("./errorMessages");

var _getRateLimiterReducer = _interopRequireWildcard(require("./getRateLimiterReducer"));

var _dec, _class, _class2;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var DEFAULT_THROTTLE_DURATION = 61 * 1000;
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
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(RateLimiter, _RcModule);

  var _super = _createSuper(RateLimiter);

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
        _ref$suppressAlerts = _ref.suppressAlerts,
        suppressAlerts = _ref$suppressAlerts === void 0 ? false : _ref$suppressAlerts,
        options = _objectWithoutProperties(_ref, ["alert", "client", "environment", "globalStorage", "throttleDuration", "suppressAlerts"]);

    _classCallCheck(this, RateLimiter);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes.actionTypes
    }));

    _this._beforeRequestHandler = function () {
      if (_this.throttling) {
        throw new Error(_errorMessages.errorMessages.rateLimitReached);
      }
    };

    _this._checkTimestamp = function () {
      if (!_this.throttling) {
        _this.store.dispatch({
          type: _this.actionTypes.stopThrottle
        });
      }
    };

    _this._requestErrorHandler = function (error) {
      if (!(error instanceof Error) || error.message !== 'Request rate exceeded') {
        return;
      } // Get `retry-after` from response headers first


      _this._throttleDuration = DEFAULT_THROTTLE_DURATION;

      if (error.response) {
        var retryAfter = error.response.headers.get('retry-after');

        if (retryAfter) {
          _this._throttleDuration = 1000 * Number.parseInt(retryAfter, 10);
        }
      }

      var wasThrottling = _this.throttling;

      _this.store.dispatch({
        type: _this.actionTypes.startThrottle,
        timestamp: Date.now()
      });

      if (!wasThrottling) {
        _this.showAlert();
      }

      setTimeout(_this._checkTimestamp, _this._throttleDuration);
    };

    _this._alert = alert;
    _this._client = client;
    _this._environment = environment;
    _this._storage = globalStorage;
    _this._throttleDuration = throttleDuration;
    _this._suppressAlerts = suppressAlerts;
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

      this.store.subscribe( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
      var _showAlert = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!this.throttling || !this._alert || this._suppressAlerts)) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                this._alert.warning({
                  message: _errorMessages.errorMessages.rateLimitReached,
                  ttl: this.ttl,
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

      var client = this._client.service.client(); // TODO: Bind the `rateLimitError` event instead


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
      return Date.now() - this.timestamp <= this._throttleDuration;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].ready;
    }
  }]);

  return RateLimiter;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "showAlert", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "showAlert"), _class2.prototype)), _class2)) || _class);
exports["default"] = RateLimiter;
//# sourceMappingURL=index.js.map
