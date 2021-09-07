"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorLogger = void 0;

var Sentry = _interopRequireWildcard(require("@sentry/browser"));

var _core = require("@ringcentral-integration/core");

var _di = require("../../lib/di");

var _ErrorLogger = require("./ErrorLogger.interface");

var _dec, _class;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
    var _this$_deps$errorLogg;

    var _this;

    _classCallCheck(this, ErrorLogger);

    _this = _super.call(this, {
      deps: deps
    });
    _this._sentryInitialized = false;
    var appName = _this._deps.brandConfig.appName;
    var appBrand = _this._deps.brandConfig.code;

    var _ref = (_this$_deps$errorLogg = _this._deps.errorLoggerOptions) !== null && _this$_deps$errorLogg !== void 0 ? _this$_deps$errorLogg : {},
        appVersion = _ref.appVersion,
        environment = _ref.environment,
        sentryConfig = _ref.sentryConfig;

    if (sentryConfig === null || sentryConfig === void 0 ? void 0 : sentryConfig.endpoint) {
      _this._bootstrap({
        sentryConfig: sentryConfig,
        environment: environment
      });

      _this.setTags({
        'app.name': appName,
        'app.brand': appBrand,
        'app.version': appVersion
      });
    }

    return _this;
  }

  _createClass(ErrorLogger, [{
    key: "_bootstrap",
    value: function _bootstrap(_ref2) {
      var sentryConfig = _ref2.sentryConfig,
          environment = _ref2.environment,
          release = _ref2.release;
      Sentry.init({
        dsn: sentryConfig.endpoint,
        sampleRate: sentryConfig.sampleRate,
        environment: environment,
        release: release,
        enabled: true,
        ignoreErrors: ['200 OK', 'Failed to fetch', 'Request Timeout', 'Service is overloaded', 'In order to call this API endpoint, user needs to have [ReadCallLog] permission for requested resource', 'INVALID_STATE_ERROR: Invalid status: 11', 'INVALID_STATE_ERROR: Invalid status: 1', 'rateLimiterErrorMessages-rateLimitReached']
      });
      this._sentryInitialized = true;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;

      if (this._sentryInitialized && this._deps.auth) {
        (0, _core.watch)(this, function () {
          return _this2._deps.auth.loggedIn;
        }, function (loggedIn) {
          if (loggedIn) {
            // set user
            var user = {
              id: _this2._deps.auth.ownerId
            };

            _this2.setUser(user);
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
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[test] error logger';
      var eventId = this.log(message, _ErrorLogger.Severity.Debug);
      return eventId;
    }
  }]);

  return ErrorLogger;
}(_core.RcModuleV2)) || _class);
exports.ErrorLogger = ErrorLogger;
//# sourceMappingURL=ErrorLogger.js.map
