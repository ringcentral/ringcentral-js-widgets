"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackTabsMap = exports.RecentActivityView = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _RecentActivityPanel = _interopRequireDefault(require("@ringcentral-integration/widgets/components/RecentActivityPanel"));
var _react = _interopRequireWildcard(require("react"));
var _services4 = require("../../services");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _class, _class2, _descriptor;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
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
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var trackTabsMap = exports.trackTabsMap = {
  recentCalls: _trackEvents.trackEvents.clickRecentActivityCall,
  faxes: _trackEvents.trackEvents.clickRecentActivityFaxes,
  recentMessages: _trackEvents.trackEvents.clickRecentActivitySms,
  voicemails: _trackEvents.trackEvents.clickRecentActivityVoicemails
};
var RecentActivityView = exports.RecentActivityView = (_dec = (0, _nextCore.injectable)({
  name: 'RecentActivityView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('RecentActivityViewOptions')(target, undefined, 4);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services3.Locale === "undefined" ? Object : _services3.Locale, typeof _services3.DateTimeFormat === "undefined" ? Object : _services3.DateTimeFormat, typeof _services4.RecentCalls === "undefined" ? Object : _services4.RecentCalls, typeof _services2.ContactMatcher === "undefined" ? Object : _services2.ContactMatcher, typeof RecentActivityViewOptions === "undefined" ? Object : RecentActivityViewOptions]), _dec5 = (0, _nextCore.dynamic)('RecentMessages'), _dec6 = Reflect.metadata("design:type", typeof RecentMessages === "undefined" ? Object : RecentMessages), _dec7 = (0, _services.track)(function (_, entry) {
  return [_trackEvents.trackEvents.clickRecentActivity, {
    Entry: entry
  }];
}), _dec8 = (0, _nextCore.delegate)('server'), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", [String]), _dec1 = (0, _services.track)(function (_, tabName, entry) {
  return [trackTabsMap[tabName], {
    Entry: entry
  }];
}), _dec10 = (0, _nextCore.delegate)('server'), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [String, String]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function RecentActivityView(_locale, _dateTimeFormat, _recentCalls, _contactMatcher, _recentActivityViewOptions) {
    var _this;
    _classCallCheck(this, RecentActivityView);
    _this = _callSuper(this, RecentActivityView);
    _this._locale = _locale;
    _this._dateTimeFormat = _dateTimeFormat;
    _this._recentCalls = _recentCalls;
    _this._contactMatcher = _contactMatcher;
    _this._recentActivityViewOptions = _recentActivityViewOptions;
    _this.getTabs = function () {
      return [];
    };
    _initializerDefineProperty(_this, "_recentMessages", _descriptor, _this);
    if (global.document) {
      Promise.resolve().then(function () {
        return _interopRequireWildcard(require(/* webpackChunkName: "dynamic" */'./getTabs'));
      }).then(function (_ref) {
        var getTabs = _ref.getTabs;
        _this.getTabs = getTabs;
      });
    }
    return _this;
  }
  _inherits(RecentActivityView, _RcViewModule);
  return _createClass(RecentActivityView, [{
    key: "trackClickToggle",
    value: function () {
      var _trackClickToggle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(entry) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              return _context.a(2);
          }
        }, _callee);
      }));
      function trackClickToggle(_x) {
        return _trackClickToggle.apply(this, arguments);
      }
      return trackClickToggle;
    }()
  }, {
    key: "trackClickTab",
    value: function () {
      var _trackClickTab = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(tabName, entry) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              return _context2.a(2);
          }
        }, _callee2);
      }));
      function trackClickTab(_x2, _x3) {
        return _trackClickTab.apply(this, arguments);
      }
      return trackClickTab;
    }()
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref2) {
      var _this2 = this,
        _this$_recentCalls$ca;
      var _ref2$currentLocale = _ref2.currentLocale,
        currentLocale = _ref2$currentLocale === void 0 ? this._locale.currentLocale : _ref2$currentLocale,
        navigateTo = _ref2.navigateTo,
        _ref2$dateTimeFormatt = _ref2.dateTimeFormatter,
        dateTimeFormatter = _ref2$dateTimeFormatt === void 0 ? function () {
          var _this2$_dateTimeForma;
          return (_this2$_dateTimeForma = _this2._dateTimeFormat).formatDateTime.apply(_this2$_dateTimeForma, arguments);
        } : _ref2$dateTimeFormatt,
        getSession = _ref2.getSession,
        _ref2$useContact = _ref2.useContact,
        useContact = _ref2$useContact === void 0 ? false : _ref2$useContact,
        getContact = _ref2.getContact,
        _ref2$showRecentCalls = _ref2.showRecentCalls,
        showRecentCalls = _ref2$showRecentCalls === void 0 ? true : _ref2$showRecentCalls,
        _ref2$showRecentMessa = _ref2.showRecentMessage,
        showRecentMessage = _ref2$showRecentMessa === void 0 ? true : _ref2$showRecentMessa,
        _ref2$showFax = _ref2.showFax,
        showFax = _ref2$showFax === void 0 ? true : _ref2$showFax,
        _ref2$showVoiceMails = _ref2.showVoiceMails,
        showVoiceMails = _ref2$showVoiceMails === void 0 ? true : _ref2$showVoiceMails;
      var sessionId = null;
      var currentContact = getContact === null || getContact === void 0 ? void 0 : getContact();
      var ready = this._dateTimeFormat.ready && this._locale.ready && (!this._recentMessages || this._recentMessages.ready) && this._recentCalls.ready;
      if (!useContact) {
        var session = getSession();
        sessionId = session.id;
        currentContact = session.contactMatch;
        var contactMapping = this._contactMatcher.dataMapping;
        var phoneNumber = session.direction === _callDirections["default"].outbound ? session.to : session.from;
        if (!currentContact) {
          var entities = contactMapping === null || contactMapping === void 0 ? void 0 : contactMapping[phoneNumber];
          if ((entities === null || entities === void 0 ? void 0 : entities.length) >= 1) {
            currentContact = entities[0];
          }
        }
        ready = ready && this._contactMatcher.ready;
      }
      return {
        currentLocale: currentLocale,
        title: (0, _i18n.t)('recentActivities'),
        showSpinner: !ready,
        currentContact: currentContact,
        calls: (_this$_recentCalls$ca = this._recentCalls.calls) !== null && _this$_recentCalls$ca !== void 0 ? _this$_recentCalls$ca : {},
        tabs: this.getTabs({
          ready: ready,
          currentLocale: currentLocale,
          dateTimeFormatter: dateTimeFormatter,
          navigateTo: navigateTo,
          currentContact: currentContact,
          recentMessages: this._recentMessages,
          recentCalls: this._recentCalls,
          sessionId: sessionId,
          showFax: showFax,
          showRecentCalls: showRecentCalls,
          showVoiceMails: showVoiceMails,
          showRecentMessage: showRecentMessage
        }),
        defaultTab: 'recentCalls'
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref3) {
      var _this3 = this;
      var entry = _ref3.entry;
      return {
        trackClickToggle: function trackClickToggle(expanded) {
          if (expanded) {
            _this3.trackClickToggle(entry);
          }
        },
        trackClickTab: function trackClickTab(tabName) {
          return _this3.trackClickTab(tabName, entry);
        }
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this4 = this,
        _this$_recentActivity;
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this4.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var Component = ((_this$_recentActivity = this._recentActivityViewOptions) === null || _this$_recentActivity === void 0 ? void 0 : _this$_recentActivity.component) || _RecentActivityPanel["default"];
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_recentMessages", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "trackClickToggle", [_dec7, _dec8, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "trackClickToggle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "trackClickTab", [_dec1, _dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "trackClickTab"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=RecentActivity.view.js.map
