"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Analytics = void 0;

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.date.to-iso-string");

require("core-js/modules/es6.function.name");

var _core = require("@ringcentral-integration/core");

var _Analytics = require("../../lib/Analytics");

var _di = require("../../lib/di");

var _saveBlob = _interopRequireDefault(require("../../lib/saveBlob"));

var _analyticsRouters = require("./analyticsRouters");

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// TODO: refactoring the module against `https://docs.google.com/spreadsheets/d/1xufV6-C-RJR6OJgwFYHYzNQwhIdN4BXXCo8ABs7RT-8/edit#gid=1480480736`
// TODO: if use `dialerUI`/`callLogSection`/`adapter`, make sure they should all be RcModuleV2
var Analytics = (_dec = (0, _di.Module)({
  name: 'Analytics',
  deps: ['Auth', 'BrandConfig', 'AnalyticsOptions', {
    dep: 'AccountInfo',
    optional: true
  }, {
    dep: 'ExtensionInfo',
    optional: true
  }, {
    dep: 'RouterInteraction',
    optional: true
  }, {
    dep: 'Locale',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Analytics, _RcModuleV);

  var _super = _createSuper(Analytics);

  function Analytics(deps) {
    var _this$_deps$analytics, _this$_deps$analytics2, _this$_deps$analytics3, _this$_deps$analytics4, _this$_deps$analytics5, _this$_deps$analytics6;

    var _this;

    _classCallCheck(this, Analytics);

    _this = _super.call(this, {
      deps: deps
    });
    _this._useLog = (_this$_deps$analytics = _this._deps.analyticsOptions.useLog) !== null && _this$_deps$analytics !== void 0 ? _this$_deps$analytics : false;
    _this._lingerThreshold = (_this$_deps$analytics2 = _this._deps.analyticsOptions.lingerThreshold) !== null && _this$_deps$analytics2 !== void 0 ? _this$_deps$analytics2 : 1000;
    _this._enablePendo = (_this$_deps$analytics3 = _this._deps.analyticsOptions.enablePendo) !== null && _this$_deps$analytics3 !== void 0 ? _this$_deps$analytics3 : false;
    _this._pendoApiKey = (_this$_deps$analytics4 = _this._deps.analyticsOptions.pendoApiKey) !== null && _this$_deps$analytics4 !== void 0 ? _this$_deps$analytics4 : '';
    _this._trackRouters = (_this$_deps$analytics5 = _this._deps.analyticsOptions.trackRouters) !== null && _this$_deps$analytics5 !== void 0 ? _this$_deps$analytics5 : _analyticsRouters.trackRouters;
    _this._segment = void 0;
    _this._logs = [];
    _this._lingerTimeout = null;
    _this._pendo = void 0;
    _this._waitPendoCount = void 0;
    _this._pendoTimeout = void 0;
    _this._env = (_this$_deps$analytics6 = _this._deps.analyticsOptions.env) !== null && _this$_deps$analytics6 !== void 0 ? _this$_deps$analytics6 : 'dev';
    _this._segment = (0, _Analytics.Segment)();

    if (_this._enablePendo && _this._pendoApiKey) {
      _Analytics.Pendo.init(_this._pendoApiKey, function (pendoInstance) {
        _this._pendo = pendoInstance;
      });
    }

    return _this;
  }

  _createClass(Analytics, [{
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;

      if (this._deps.routerInteraction) {
        // make sure that track if refresh app
        this.trackRouter();
        (0, _core.watch)(this, function () {
          return _this2._deps.routerInteraction.currentPath;
        }, function (currentPath) {
          _this2.trackRouter(currentPath);
        });
      }
    }
  }, {
    key: "trackRouter",
    value: function trackRouter() {
      var _this3 = this;

      var currentPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._deps.routerInteraction.currentPath;
      var target = this.getTrackTarget(currentPath);

      if (target) {
        this.trackNavigation(target);
      }

      if (this._lingerTimeout) {
        clearTimeout(this._lingerTimeout);
      }

      this._lingerTimeout = setTimeout(function () {
        _this3._lingerTimeout = null;

        if (target && _this3._deps.routerInteraction.currentPath === currentPath) {
          _this3.trackLinger(target);
        }
      }, this._lingerThreshold);
    }
  }, {
    key: "onInit",
    value: function onInit() {
      if (this._deps.analyticsOptions.analyticsKey && this._segment) {
        this._segment.load(this._deps.analyticsOptions.analyticsKey, {
          integrations: {
            All: true,
            Mixpanel: true
          }
        });
      }
    }
  }, {
    key: "setUserId",
    value: function setUserId() {
      this._identify({
        userId: this._deps.auth.ownerId
      });
    }
  }, {
    key: "identify",
    value: function identify(options) {
      this._identify(options);
    }
  }, {
    key: "_identify",
    value: function _identify(_ref) {
      var userId = _ref.userId,
          props = _objectWithoutProperties(_ref, ["userId"]);

      if (this.analytics) {
        var _this$_deps$extension, _this$_deps$extension2, _this$_deps$extension3;

        this.analytics.identify(userId, _objectSpread(_objectSpread({}, props), {}, {
          companyName: (_this$_deps$extension = this._deps.extensionInfo) === null || _this$_deps$extension === void 0 ? void 0 : (_this$_deps$extension2 = _this$_deps$extension.info) === null || _this$_deps$extension2 === void 0 ? void 0 : (_this$_deps$extension3 = _this$_deps$extension2.contact) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.company
        }), {
          integrations: {
            All: true,
            Mixpanel: true,
            Pendo: this._enablePendo
          }
        });
      }

      if (this._enablePendo && this._pendoApiKey) {
        this._pendoInitialize(_objectSpread(_objectSpread({
          userId: userId
        }, props), {}, {
          env: this._env
        }));
      }
    }
  }, {
    key: "_pendoInitialize",
    value: function _pendoInitialize(_ref2) {
      var _this4 = this,
          _this$_deps$extension4,
          _this$_deps$extension5,
          _this$_deps$extension6,
          _this$_deps$accountIn,
          _this$_deps$accountIn2,
          _this$_deps$accountIn3,
          _this$_deps$accountIn4;

      var userId = _ref2.userId,
          props = _objectWithoutProperties(_ref2, ["userId"]);

      if (!this._deps.accountInfo || !this._deps.accountInfo.id || !userId) {
        return;
      }

      if (this._pendoTimeout) {
        clearTimeout(this._pendoTimeout);
      }

      if (this._waitPendoCount > 3) {
        return;
      }

      if (!this._pendo) {
        this._pendoTimeout = setTimeout(function () {
          _this4._waitPendoCount += 1;

          _this4._pendoInitialize(_objectSpread({
            userId: userId
          }, props));
        }, 5 * 1000);
        return;
      }

      var initializeFunc = !this._pendo.isReady() ? this._pendo.initialize : this._pendo.updateOptions;
      var pendoAgent = {
        visitor: _objectSpread(_objectSpread({
          id: userId
        }, props), {}, {
          companyName: (_this$_deps$extension4 = this._deps.extensionInfo) === null || _this$_deps$extension4 === void 0 ? void 0 : (_this$_deps$extension5 = _this$_deps$extension4.info) === null || _this$_deps$extension5 === void 0 ? void 0 : (_this$_deps$extension6 = _this$_deps$extension5.contact) === null || _this$_deps$extension6 === void 0 ? void 0 : _this$_deps$extension6.company,
          appName: this._deps.brandConfig.appName,
          appVersion: this._deps.analyticsOptions.appVersion,
          appBrand: this._deps.brandConfig.brandCode,
          plaBrand: (_this$_deps$accountIn = this._deps.accountInfo) === null || _this$_deps$accountIn === void 0 ? void 0 : (_this$_deps$accountIn2 = _this$_deps$accountIn.serviceInfo) === null || _this$_deps$accountIn2 === void 0 ? void 0 : (_this$_deps$accountIn3 = _this$_deps$accountIn2.brand) === null || _this$_deps$accountIn3 === void 0 ? void 0 : _this$_deps$accountIn3.name,
          countryCode: (_this$_deps$accountIn4 = this._deps.accountInfo) === null || _this$_deps$accountIn4 === void 0 ? void 0 : _this$_deps$accountIn4.countryCode
        }),
        account: {
          id: "".concat(this._deps.accountInfo.id)
        }
      };
      typeof initializeFunc === 'function' && initializeFunc(_objectSpread({}, pendoAgent));
    }
  }, {
    key: "track",
    value: function track(event) {
      var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!this.analytics) {
        return;
      }

      var trackProps = _objectSpread(_objectSpread({}, this.trackProps), properties);

      this.analytics.track(event, trackProps, {
        integrations: {
          All: true,
          Mixpanel: true,
          Pendo: this._enablePendo
        }
      });

      if (this._useLog) {
        this._logs.push({
          timeStamp: new Date().toISOString(),
          event: event,
          trackProps: trackProps
        });
      }
    }
  }, {
    key: "downloadLogs",
    value: function downloadLogs() {
      if (!this._useLog) {
        return;
      }

      var blob = new Blob([JSON.stringify(this._logs, null, 2)], {
        type: 'application/json'
      });
      (0, _saveBlob["default"])('logs.json', blob);
    }
  }, {
    key: "trackNavigation",
    value: function trackNavigation(_ref3) {
      var router = _ref3.router,
          eventPostfix = _ref3.eventPostfix;
      var trackProps = {
        router: router,
        appName: this._deps.brandConfig.appName,
        appVersion: this._deps.analyticsOptions.appVersion,
        brand: this._deps.brandConfig.brandCode
      };
      this.track("Navigation: Click/".concat(eventPostfix), trackProps);
    }
  }, {
    key: "trackLinger",
    value: function trackLinger(_ref4) {
      var router = _ref4.router,
          eventPostfix = _ref4.eventPostfix;
      var trackProps = {
        router: router,
        appName: this._deps.brandConfig.appName,
        appVersion: this._deps.analyticsOptions.appVersion,
        brand: this._deps.brandConfig.brandCode
      };
      this.track("Navigation: View/".concat(eventPostfix), trackProps);
    }
  }, {
    key: "getTrackTarget",
    value: function getTrackTarget() {
      var _this$_deps$routerInt;

      var currentPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (_this$_deps$routerInt = this._deps.routerInteraction) === null || _this$_deps$routerInt === void 0 ? void 0 : _this$_deps$routerInt.currentPath;

      if (!currentPath) {
        return null;
      }

      var routes = currentPath.split('/');
      var formatRoute = null;
      var needMatchSecondRoutes = ['calls'];

      if (routes.length >= 3 && needMatchSecondRoutes.indexOf(routes[1]) !== -1) {
        formatRoute = "/".concat(routes[1], "/").concat(routes[2]);
      } else if (routes.length > 1) {
        formatRoute = "/".concat(routes[1]);
      }

      var target = this._trackRouters.find(function (target) {
        return formatRoute === target.router;
      });

      return target;
    }
  }, {
    key: "analytics",
    get: function get() {
      return global.analytics;
    }
  }, {
    key: "trackProps",
    get: function get() {
      var _this$_deps$locale, _this$_deps$locale2, _this$_deps$extension7;

      return {
        appName: this._deps.brandConfig.appName,
        appVersion: this._deps.analyticsOptions.appVersion,
        brand: this._deps.brandConfig.brandCode,
        'App Language': ((_this$_deps$locale = this._deps.locale) === null || _this$_deps$locale === void 0 ? void 0 : _this$_deps$locale.currentLocale) || '',
        'Browser Language': ((_this$_deps$locale2 = this._deps.locale) === null || _this$_deps$locale2 === void 0 ? void 0 : _this$_deps$locale2.browserLocale) || '',
        'Extension Type': ((_this$_deps$extension7 = this._deps.extensionInfo) === null || _this$_deps$extension7 === void 0 ? void 0 : _this$_deps$extension7.info.type) || ''
      };
    }
  }]);

  return Analytics;
}(_core.RcModuleV2)) || _class);
exports.Analytics = Analytics;
//# sourceMappingURL=Analytics.js.map
