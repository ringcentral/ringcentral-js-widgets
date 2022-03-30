"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.promise");

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
exports["default"] = exports.Locale = void 0;

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

var _formatMessage = _interopRequireDefault(require("format-message"));

var _core = require("@ringcentral-integration/core");

var _i18n = _interopRequireWildcard(require("@ringcentral-integration/i18n"));

var _formatLocale = _interopRequireDefault(require("@ringcentral-integration/i18n/lib/formatLocale"));

var _detectBrowserLocale = _interopRequireDefault(require("../../lib/detectBrowserLocale"));

var _di = require("../../lib/di");

var _proxify = require("../../lib/proxy/proxify");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var Locale = (_dec = (0, _di.Module)({
  name: 'Locale',
  deps: [{
    dep: 'BrandConfig',
    optional: true
  }, {
    dep: 'LocaleOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var defaultLocale = _ref.defaultLocale;
  return [defaultLocale];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Locale, _RcModuleV);

  var _super = _createSuper(Locale);

  function Locale(deps) {
    var _this;

    _classCallCheck(this, Locale);

    _this = _super.call(this, {
      deps: deps
    });

    _initializerDefineProperty(_this, "locale", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "proxyLocale", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "debugMode", _descriptor3, _assertThisInitialized(_this));

    _i18n["default"].setDefaultLocale(_this.defaultLocale);

    return _this;
  }

  _createClass(Locale, [{
    key: "_setProxyLocaleSuccess",
    value: function _setProxyLocaleSuccess(locale) {
      this.proxyLocale = locale;
    }
  }, {
    key: "setProxyLocaleSuccess",
    value: function () {
      var _setProxyLocaleSuccess2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(locale) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._setProxyLocaleSuccess(locale);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setProxyLocaleSuccess(_x) {
        return _setProxyLocaleSuccess2.apply(this, arguments);
      }

      return setProxyLocaleSuccess;
    }()
  }, {
    key: "_toggleDebugMode",
    value: function _toggleDebugMode() {
      this.debugMode = !this.debugMode; // TODO: refactor without side effect.

      if (this.debugMode) {
        this.setLocale(_i18n.PSEUDO_LOCALE);
      }
    }
  }, {
    key: "_setLocaleSuccess",
    value: function _setLocaleSuccess(locale) {
      this.locale = locale;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      if (this._polling) {
        this._syncBrowserLocale();
      }
    }
  }, {
    key: "initializeProxy",
    value: function () {
      var _initializeProxy = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this2 = this;

        var setLocalePromise;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._setLocale(this.currentLocale);

              case 2:
                this.setProxyLocaleSuccess(this.currentLocale);
                this.store.subscribe( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!(_this2.locale !== _this2.proxyLocale && !setLocalePromise)) {
                            _context2.next = 6;
                            break;
                          }

                          setLocalePromise = _this2._setLocale(_this2.locale);
                          _context2.next = 4;
                          return setLocalePromise;

                        case 4:
                          _this2.setProxyLocaleSuccess(_this2.locale);

                          setLocalePromise = null;

                        case 6:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                })));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function initializeProxy() {
        return _initializeProxy.apply(this, arguments);
      }

      return initializeProxy;
    }()
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.setLocale(this._detectBrowser ? this.browserLocale : this.defaultLocale);

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function onInit() {
        return _onInit.apply(this, arguments);
      }

      return onInit;
    }()
  }, {
    key: "_syncBrowserLocale",
    value: function () {
      var _syncBrowserLocale2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(!this.debugMode && this.browserLocale !== this.currentLocale)) {
                  _context5.next = 3;
                  break;
                }

                _context5.next = 3;
                return this.setLocale(this.browserLocale);

              case 3:
                setTimeout(function () {
                  return _this3._syncBrowserLocale();
                }, this._pollingInterval);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _syncBrowserLocale() {
        return _syncBrowserLocale2.apply(this, arguments);
      }

      return _syncBrowserLocale;
    }()
  }, {
    key: "_setLocale",
    value: function () {
      var _setLocale2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(locale) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _i18n["default"].setLocale(locale);

              case 2:
                _formatMessage["default"].setup({
                  locale: this.currentLocale === _i18n.PSEUDO_LOCALE ? _i18n.DEFAULT_LOCALE : this.currentLocale
                });

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _setLocale(_x2) {
        return _setLocale2.apply(this, arguments);
      }

      return _setLocale;
    }()
  }, {
    key: "normalizeLocale",
    value: function normalizeLocale(inputLocale) {
      var locale = (0, _formatLocale["default"])(inputLocale);
      var target = this.supportedLocales.map(function (item) {
        return (0, _formatLocale["default"])(item);
      }).find(function (item) {
        return item === locale || item.split('-')[0] === locale;
      });
      return target !== null && target !== void 0 ? target : this.defaultLocale;
    }
  }, {
    key: "toggleDebugMode",
    value: function () {
      var _toggleDebugMode2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this._toggleDebugMode();

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function toggleDebugMode() {
        return _toggleDebugMode2.apply(this, arguments);
      }

      return toggleDebugMode;
    }()
    /**
     *  Sets the desired locale as the current locale. This will also
     *  set all I18n instances to the same locale, as well as set formatMessage to use
     *  the same locale.
     */

  }, {
    key: "setLocale",
    value: function () {
      var _setLocale3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(locale) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return this._setLocale(locale);

              case 3:
                this._setLocaleSuccess(locale);

                _context8.next = 9;
                break;

              case 6:
                _context8.prev = 6;
                _context8.t0 = _context8["catch"](0);
                console.log(_context8.t0);

              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 6]]);
      }));

      function setLocale(_x3) {
        return _setLocale3.apply(this, arguments);
      }

      return setLocale;
    }()
  }, {
    key: "defaultLocale",
    get: function get() {
      var _ref3, _this$_deps$localeOpt, _this$_deps$localeOpt2, _this$_deps$brandConf;

      return (_ref3 = (_this$_deps$localeOpt = (_this$_deps$localeOpt2 = this._deps.localeOptions) === null || _this$_deps$localeOpt2 === void 0 ? void 0 : _this$_deps$localeOpt2.defaultLocale) !== null && _this$_deps$localeOpt !== void 0 ? _this$_deps$localeOpt : (_this$_deps$brandConf = this._deps.brandConfig) === null || _this$_deps$brandConf === void 0 ? void 0 : _this$_deps$brandConf.defaultLocale) !== null && _ref3 !== void 0 ? _ref3 : _i18n.DEFAULT_LOCALE;
    }
  }, {
    key: "_detectBrowser",
    get: function get() {
      var _this$_deps$localeOpt3, _this$_deps$localeOpt4;

      return (_this$_deps$localeOpt3 = (_this$_deps$localeOpt4 = this._deps.localeOptions) === null || _this$_deps$localeOpt4 === void 0 ? void 0 : _this$_deps$localeOpt4.detectBrowser) !== null && _this$_deps$localeOpt3 !== void 0 ? _this$_deps$localeOpt3 : true;
    }
  }, {
    key: "_polling",
    get: function get() {
      var _this$_deps$localeOpt5, _this$_deps$localeOpt6;

      return (_this$_deps$localeOpt5 = (_this$_deps$localeOpt6 = this._deps.localeOptions) === null || _this$_deps$localeOpt6 === void 0 ? void 0 : _this$_deps$localeOpt6.polling) !== null && _this$_deps$localeOpt5 !== void 0 ? _this$_deps$localeOpt5 : false;
    }
  }, {
    key: "_pollingInterval",
    get: function get() {
      var _this$_deps$localeOpt7, _this$_deps$localeOpt8;

      return (_this$_deps$localeOpt7 = (_this$_deps$localeOpt8 = this._deps.localeOptions) === null || _this$_deps$localeOpt8 === void 0 ? void 0 : _this$_deps$localeOpt8.pollingInterval) !== null && _this$_deps$localeOpt7 !== void 0 ? _this$_deps$localeOpt7 : 2000;
    }
  }, {
    key: "supportedLocales",
    get: function get() {
      var _ref4, _this$_deps$localeOpt9, _this$_deps$localeOpt10, _this$_deps$brandConf2;

      return (_ref4 = (_this$_deps$localeOpt9 = (_this$_deps$localeOpt10 = this._deps.localeOptions) === null || _this$_deps$localeOpt10 === void 0 ? void 0 : _this$_deps$localeOpt10.supportedLocales) !== null && _this$_deps$localeOpt9 !== void 0 ? _this$_deps$localeOpt9 : (_this$_deps$brandConf2 = this._deps.brandConfig) === null || _this$_deps$brandConf2 === void 0 ? void 0 : _this$_deps$brandConf2.supportedLocales) !== null && _ref4 !== void 0 ? _ref4 : [this.defaultLocale];
    }
  }, {
    key: "currentLocale",
    get: function get() {
      var _ref5;

      return (_ref5 = this._transport ? this.proxyLocale : this.locale) !== null && _ref5 !== void 0 ? _ref5 : this.defaultLocale;
    }
  }, {
    key: "browserLocale",
    get: function get() {
      return (0, _detectBrowserLocale["default"])(this.defaultLocale);
    }
  }]);

  return Locale;
}(_core.RcModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "supportedLocales", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "supportedLocales"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "locale", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "proxyLocale", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setProxyLocaleSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setProxyLocaleSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setProxyLocaleSuccess", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setProxyLocaleSuccess"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "debugMode", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_toggleDebugMode", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_toggleDebugMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setLocaleSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setLocaleSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toggleDebugMode", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleDebugMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLocale", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setLocale"), _class2.prototype)), _class2)) || _class);
exports.Locale = Locale;
var _default = Locale;
exports["default"] = _default;
//# sourceMappingURL=Locale.js.map
