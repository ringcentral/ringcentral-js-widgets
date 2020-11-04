"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Locale = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _i18n = _interopRequireWildcard(require("@ringcentral-integration/i18n"));

var _formatMessage = _interopRequireDefault(require("format-message"));

var _detectBrowserLocale = _interopRequireDefault(require("../../lib/detectBrowserLocale"));

var _di = require("../../lib/di");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _proxyState = require("../../lib/proxy/proxyState");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Locale = (_dec = (0, _di.Module)({
  name: 'Locale',
  deps: [{
    dep: 'LocaleOptions',
    optional: true
  }]
}), _dec2 = (0, _proxyState.proxyState)( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(that, locale) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return that._setLocale(locale);

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Locale, _RcModuleV);

  var _super = _createSuper(Locale);

  function Locale(deps) {
    var _this;

    _classCallCheck(this, Locale);

    _this = _super.call(this, {
      deps: deps
    });

    _initializerDefineProperty(_this, "locale", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "debugMode", _descriptor2, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(Locale, [{
    key: "_toggleDebugMode",
    value: function _toggleDebugMode() {
      this.debugMode = !this.debugMode;

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
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.setLocale(this._detectBrowser ? this.browserLocale : this._defaultLocale);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onInit() {
        return _onInit.apply(this, arguments);
      }

      return onInit;
    }()
  }, {
    key: "_syncBrowserLocale",
    value: function () {
      var _syncBrowserLocale2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!this.debugMode && this.browserLocale !== this.currentLocale)) {
                  _context3.next = 3;
                  break;
                }

                _context3.next = 3;
                return this.setLocale(this.browserLocale);

              case 3:
                setTimeout(function () {
                  return _this2._syncBrowserLocale();
                }, this._pollingInterval);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _syncBrowserLocale() {
        return _syncBrowserLocale2.apply(this, arguments);
      }

      return _syncBrowserLocale;
    }()
  }, {
    key: "_setLocale",
    value: function () {
      var _setLocale2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(locale) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _i18n["default"].setLocale(locale);

              case 2:
                _formatMessage["default"].setup({
                  locale: this.currentLocale === _i18n.PSEUDO_LOCALE ? _i18n.DEFAULT_LOCALE : this.currentLocale
                });

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _setLocale(_x3) {
        return _setLocale2.apply(this, arguments);
      }

      return _setLocale;
    }()
  }, {
    key: "toggleDebugMode",
    value: function () {
      var _toggleDebugMode2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this._toggleDebugMode();

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
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
      var _setLocale3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(locale) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return this._setLocale(locale);

              case 3:
                this._setLocaleSuccess(locale);

                _context6.next = 9;
                break;

              case 6:
                _context6.prev = 6;
                _context6.t0 = _context6["catch"](0);
                console.log(_context6.t0);

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 6]]);
      }));

      function setLocale(_x4) {
        return _setLocale3.apply(this, arguments);
      }

      return setLocale;
    }()
  }, {
    key: "_defaultLocale",
    get: function get() {
      var _this$_deps$localeOpt, _this$_deps$localeOpt2;

      return (_this$_deps$localeOpt = (_this$_deps$localeOpt2 = this._deps.localeOptions) === null || _this$_deps$localeOpt2 === void 0 ? void 0 : _this$_deps$localeOpt2.defaultLocale) !== null && _this$_deps$localeOpt !== void 0 ? _this$_deps$localeOpt : _i18n.DEFAULT_LOCALE;
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
    key: "currentLocale",
    get: function get() {
      return this.locale || this._defaultLocale;
    }
  }, {
    key: "browserLocale",
    get: function get() {
      return (0, _detectBrowserLocale["default"])(this._defaultLocale);
    }
  }]);

  return Locale;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "locale", [_dec2, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "debugMode", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_toggleDebugMode", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_toggleDebugMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setLocaleSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setLocaleSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toggleDebugMode", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleDebugMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLocale", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setLocale"), _class2.prototype)), _class2)) || _class);
exports.Locale = Locale;
//# sourceMappingURL=Locale.js.map
