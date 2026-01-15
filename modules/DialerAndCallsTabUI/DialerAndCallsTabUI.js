"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialerAndCallsTabUI = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _hasActiveCalls = require("../../lib/hasActiveCalls");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _dec2, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var DialerAndCallsTabUI = exports.DialerAndCallsTabUI = (_dec = (0, _di.Module)({
  name: 'DialerAndCallsTabUI',
  deps: ['Locale', 'RouterInteraction', 'CallingSettings', {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'CallMonitor',
    optional: true
  }, {
    dep: 'DialerAndCallsTabUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.locale.currentLocale, that._deps.routerInteraction.currentPath];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  function DialerAndCallsTabUI(deps) {
    _classCallCheck(this, DialerAndCallsTabUI);
    return _callSuper(this, DialerAndCallsTabUI, [{
      deps: deps
    }]);
  }
  _inherits(DialerAndCallsTabUI, _RcUIModuleV);
  return _createClass(DialerAndCallsTabUI, [{
    key: "tabs",
    get: function get() {
      var _this = this;
      return [{
        path: '/dialer',
        label: _i18n["default"].getString('dialer', this._deps.locale.currentLocale),
        dataSign: 'dialer',
        isActive: function isActive() {
          return _this._deps.routerInteraction.currentPath === '/dialer';
        }
      }, {
        path: '/calls',
        label: _i18n["default"].getString('allCalls', this._deps.locale.currentLocale),
        dataSign: 'allCalls',
        isActive: function isActive() {
          return _this._deps.routerInteraction.currentPath === '/calls';
        }
      }];
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(props) {
      return {
        showTabs: props.hasActiveCalls ? props.hasActiveCalls({
          callingSettings: this._deps.callingSettings,
          webphone: this._deps.webphone,
          callMonitor: this._deps.callMonitor
        }) : (0, _hasActiveCalls.hasActiveCalls)({
          callingSettings: this._deps.callingSettings,
          webphone: this._deps.webphone,
          callMonitor: this._deps.callMonitor
        }),
        showSpinner: !this._deps.locale.ready,
        tabs: this.tabs
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(props) {
      var _this2 = this;
      return {
        goTo: function goTo(path) {
          _this2._deps.routerInteraction.push(path);
        }
      };
    }
  }]);
}(_core.RcUIModuleV2), _applyDecoratedDescriptor(_class2.prototype, "tabs", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "tabs"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=DialerAndCallsTabUI.js.map
