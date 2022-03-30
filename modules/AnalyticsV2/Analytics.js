"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

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
exports.Analytics = void 0;

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.date.to-iso-string");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

var _core = require("@ringcentral-integration/core");

var _Analytics = require("../../lib/Analytics");

var _di = require("../../lib/di");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _saveBlob = _interopRequireDefault(require("../../lib/saveBlob"));

var _analyticsRouters = require("./analyticsRouters");

var _dec, _class, _class2;

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

// TODO: refactoring the module against `https://docs.google.com/spreadsheets/d/1xufV6-C-RJR6OJgwFYHYzNQwhIdN4BXXCo8ABs7RT-8/edit#gid=1480480736`
// TODO: if use `dialerUI`/`callLogSection`/`adapter`, make sure they should all be RcModuleV2
var Analytics = (_dec = (0, _di.Module)({
  name: 'Analytics',
  deps: ['Auth', 'Brand', 'AnalyticsOptions', {
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
  }, {
    dep: 'AnalyticsEventExtendedProps',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
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

      if (this._deps.analyticsOptions.analyticsKey && this._segment) {
        this._segment.load(this._deps.analyticsOptions.analyticsKey, {
          integrations: {
            All: true,
            Mixpanel: true
          }
        });
      }

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
          appName: this._deps.brand.defaultConfig.appName,
          appVersion: this._deps.analyticsOptions.appVersion,
          appBrand: this._deps.brand.defaultConfig.code,
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
    value: function () {
      var _track = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
        var _this$_deps$analytics7, _this$_pendo, _this$_pendo$isReady;

        var properties,
            trackProps,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                properties = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

                if (this.analytics) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                trackProps = _objectSpread(_objectSpread(_objectSpread({}, this.trackProps), properties), (_this$_deps$analytics7 = this._deps.analyticsEventExtendedProps) === null || _this$_deps$analytics7 === void 0 ? void 0 : _this$_deps$analytics7.extendedProps.get(event));
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

                if (this._enablePendo && ((_this$_pendo = this._pendo) === null || _this$_pendo === void 0 ? void 0 : (_this$_pendo$isReady = _this$_pendo.isReady) === null || _this$_pendo$isReady === void 0 ? void 0 : _this$_pendo$isReady.call(_this$_pendo))) {
                  this._pendo.track("".concat(trackProps.appName, "-").concat(event), trackProps);
                }

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function track(_x) {
        return _track.apply(this, arguments);
      }

      return track;
    }()
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
        appName: this._deps.brand.defaultConfig.appName,
        appVersion: this._deps.analyticsOptions.appVersion,
        brand: this._deps.brand.defaultConfig.code
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
        appName: this._deps.brand.defaultConfig.appName,
        appVersion: this._deps.analyticsOptions.appVersion,
        brand: this._deps.brand.defaultConfig.code
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
        appName: this._deps.brand.defaultConfig.appName,
        appVersion: this._deps.analyticsOptions.appVersion,
        brand: this._deps.brand.defaultConfig.code,
        'App Language': ((_this$_deps$locale = this._deps.locale) === null || _this$_deps$locale === void 0 ? void 0 : _this$_deps$locale.currentLocale) || '',
        'Browser Language': ((_this$_deps$locale2 = this._deps.locale) === null || _this$_deps$locale2 === void 0 ? void 0 : _this$_deps$locale2.browserLocale) || '',
        'Extension Type': ((_this$_deps$extension7 = this._deps.extensionInfo) === null || _this$_deps$extension7 === void 0 ? void 0 : _this$_deps$extension7.info.type) || ''
      };
    }
  }]);

  return Analytics;
}(_core.RcModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "track", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "track"), _class2.prototype)), _class2)) || _class);
exports.Analytics = Analytics;
//# sourceMappingURL=Analytics.js.map
