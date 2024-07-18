"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.slice");
require("core-js/modules/es.array.sort");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocaleSettings = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _i18n = require("@ringcentral-integration/i18n");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _dec, _class, _class2, _descriptor;
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var LocaleSettings = (_dec = (0, _di.Module)({
  name: 'LocaleSettings',
  deps: ['GlobalStorage', 'Locale', {
    dep: 'LocaleSettingsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(LocaleSettings, _RcModuleV);
  var _super = _createSuper(LocaleSettings);
  function LocaleSettings(deps) {
    var _this$_deps$localeSet, _this$_deps$localeSet2;
    var _this;
    _classCallCheck(this, LocaleSettings);
    _this = _super.call(this, {
      deps: deps,
      enableGlobalCache: true,
      storageKey: 'LocaleSettings'
    });
    _this._supportedLocales = void 0;
    _this.supportedLocales = void 0;
    _initializerDefineProperty(_this, "savedLocale", _descriptor, _assertThisInitialized(_this));
    _this._supportedLocales = (_this$_deps$localeSet = (_this$_deps$localeSet2 = _this._deps.localeSettingsOptions) === null || _this$_deps$localeSet2 === void 0 ? void 0 : _this$_deps$localeSet2.supportedLocales) !== null && _this$_deps$localeSet !== void 0 ? _this$_deps$localeSet : [_i18n.DEFAULT_LOCALE];
    _this.supportedLocales = _this._supportedLocales.slice().sort();
    return _this;
  }
  _createClass(LocaleSettings, [{
    key: "_saveLocale",
    value: function _saveLocale(locale) {
      this.savedLocale = locale;
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.savedLocale) {
                  _context.next = 4;
                  break;
                }
                this.saveLocale(this._deps.locale.currentLocale);
                _context.next = 7;
                break;
              case 4:
                if (!(this.savedLocale !== this._deps.locale.currentLocale)) {
                  _context.next = 7;
                  break;
                }
                _context.next = 7;
                return this._deps.locale.setLocale(this.savedLocale);
              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function onInit() {
        return _onInit.apply(this, arguments);
      }
      return onInit;
    }()
  }, {
    key: "saveLocale",
    value: function () {
      var _saveLocale2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(locale) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._deps.locale.setLocale(locale);
              case 2:
                this._saveLocale(locale);
              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function saveLocale(_x) {
        return _saveLocale2.apply(this, arguments);
      }
      return saveLocale;
    }()
  }]);
  return LocaleSettings;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "savedLocale", [_core.globalStorage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_saveLocale", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_saveLocale"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saveLocale", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "saveLocale"), _class2.prototype)), _class2)) || _class);
exports.LocaleSettings = LocaleSettings;
//# sourceMappingURL=LocaleSettings.js.map
