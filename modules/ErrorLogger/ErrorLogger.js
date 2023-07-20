"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorLogger = void 0;
var _core = require("@ringcentral-integration/core");
var Sentry = _interopRequireWildcard(require("@sentry/browser"));
var _tracing = require("@sentry/tracing");
var _di = require("../../lib/di");
var _dec, _class;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var ErrorLogger = (_dec = (0, _di.Module)({
  name: 'ErrorLogger',
  deps: ['BrandConfig', {
    dep: 'Auth',
    optional: true
  }, {
    dep: 'ErrorLoggerOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcModuleV) {
  _inherits(ErrorLogger, _RcModuleV);
  var _super = _createSuper(ErrorLogger);
  function ErrorLogger(deps) {
    var _this;
    _classCallCheck(this, ErrorLogger);
    _this = _super.call(this, {
      deps: deps
    });
    _this._sentryInitialized = false;
    if (deps.errorLoggerOptions) {
      _this._bootstrap(deps.errorLoggerOptions);
    }
    return _this;
  }
  _createClass(ErrorLogger, [{
    key: "_bootstrap",
    value: function _bootstrap(options) {
      var appVersion = options.appVersion,
        appRelease = options.appRelease,
        environment = options.environment,
        sentryConfig = options.sentryConfig;
      if (sentryConfig === null || sentryConfig === void 0 ? void 0 : sentryConfig.endpoint) {
        // init client
        this._init({
          dsn: sentryConfig.endpoint,
          sampleRate: sentryConfig.sampleRate,
          environment: environment,
          release: appRelease !== null && appRelease !== void 0 ? appRelease : appVersion,
          integrations: [new _tracing.BrowserTracing()]
        });
        // set tags
        var appName = this._deps.brandConfig.appName;
        var appBrand = this._deps.brandConfig.code;
        this.setTags({
          'app.name': appName,
          'app.brand': appBrand,
          'app.version': appVersion !== null && appVersion !== void 0 ? appVersion : ''
        });
      }
    }
  }, {
    key: "_init",
    value: function _init(options) {
      Sentry.init(_objectSpread(_objectSpread({}, options), {}, {
        ignoreErrors: ['200 OK', 'Failed to fetch', 'Request Timeout', 'Service is overloaded', 'In order to call this API endpoint, user needs to have [ReadCallLog] permission for requested resource', 'INVALID_STATE_ERROR: Invalid status: 11', 'INVALID_STATE_ERROR: Invalid status: 1', 'rateLimiterErrorMessages-rateLimitReached']
      }));
      this._sentryInitialized = true;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      if (this._sentryInitialized && this._deps.auth) {
        (0, _core.watch)(this, function () {
          var _this2$_deps$auth;
          return (_this2$_deps$auth = _this2._deps.auth) === null || _this2$_deps$auth === void 0 ? void 0 : _this2$_deps$auth.loggedIn;
        }, function (loggedIn) {
          if (loggedIn) {
            var _this2$_deps$auth2;
            // set user
            _this2.setUser({
              id: (_this2$_deps$auth2 = _this2._deps.auth) === null || _this2$_deps$auth2 === void 0 ? void 0 : _this2$_deps$auth2.ownerId
            });
          }
        });
      }
    }
  }, {
    key: "setUser",
    value: function setUser(user) {
      Sentry.configureScope(function (scope) {
        scope.setUser(user);
      });
    }
  }, {
    key: "setTags",
    value: function setTags(tags) {
      Sentry.configureScope(function (scope) {
        scope.setTags(tags);
      });
    }
  }, {
    key: "log",
    value: function log(message, level) {
      var eventId = Sentry.captureMessage(message, level);
      return eventId;
    }
  }, {
    key: "logError",
    value: function logError(error) {
      var eventId = Sentry.captureException(error);
      return eventId;
    }
  }, {
    key: "test",
    value: function test() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[ErrorLogger] test';
      var eventId = this.log(message, 'debug');
      return eventId;
    }
  }, {
    key: "testError",
    value: function testError() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[ErrorLogger] test error';
      // To support test with devtool console, throw error within a new thread by using setTimeout
      setTimeout(function () {
        throw new Error(message);
      }, 0);
    }
  }]);
  return ErrorLogger;
}(_core.RcModuleV2)) || _class);
exports.ErrorLogger = ErrorLogger;
//# sourceMappingURL=ErrorLogger.js.map
