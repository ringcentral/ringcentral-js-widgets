"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecentActivityUI = void 0;
require("regenerator-runtime/runtime");
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _di = require("@ringcentral-integration/commons/lib/di");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _core = require("@ringcentral-integration/core");
var _getTabs2 = require("./getTabs");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _dec2, _dec3, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var RecentActivityUI = (_dec = (0, _di.Module)({
  name: 'RecentActivityUI',
  deps: ['Locale', 'DateTimeFormat', 'RecentMessages', 'RecentCalls', 'ContactMatcher', {
    dep: 'RecentActivityUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(function (_, entry) {
  return [_trackEvents.trackEvents.clickRecentActivity, {
    Entry: entry
  }];
}), _dec3 = (0, _core.track)(function (_, tabName, entry) {
  return [_getTabs2.trackTabsMap[tabName], {
    Entry: entry
  }];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(RecentActivityUI, _RcUIModuleV);
  var _super = _createSuper(RecentActivityUI);
  function RecentActivityUI(deps) {
    _classCallCheck(this, RecentActivityUI);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(RecentActivityUI, [{
    key: "getTabs",
    value: function getTabs(options) {
      return (0, _getTabs2.getTabs)(options);
    }
  }, {
    key: "trackClickToggle",
    value: function () {
      var _trackClickToggle = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(entry) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
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
      var _trackClickTab = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(tabName, entry) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
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
    value: function getUIProps(_ref) {
      var _this = this,
        _this$_deps$recentCal;
      var _ref$currentLocale = _ref.currentLocale,
        currentLocale = _ref$currentLocale === void 0 ? this._deps.locale.currentLocale : _ref$currentLocale,
        navigateTo = _ref.navigateTo,
        _ref$dateTimeFormatte = _ref.dateTimeFormatter,
        dateTimeFormatter = _ref$dateTimeFormatte === void 0 ? function () {
          var _this$_deps$dateTimeF;
          return (
            // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
            (_this$_deps$dateTimeF = _this._deps.dateTimeFormat).formatDateTime.apply(_this$_deps$dateTimeF, arguments)
          );
        } : _ref$dateTimeFormatte,
        getSession = _ref.getSession,
        _ref$useContact = _ref.useContact,
        useContact = _ref$useContact === void 0 ? false : _ref$useContact,
        getContact = _ref.getContact,
        _ref$showRecentCalls = _ref.showRecentCalls,
        showRecentCalls = _ref$showRecentCalls === void 0 ? true : _ref$showRecentCalls,
        _ref$showRecentMessag = _ref.showRecentMessage,
        showRecentMessage = _ref$showRecentMessag === void 0 ? true : _ref$showRecentMessag,
        _ref$showFax = _ref.showFax,
        showFax = _ref$showFax === void 0 ? true : _ref$showFax,
        _ref$showVoiceMails = _ref.showVoiceMails,
        showVoiceMails = _ref$showVoiceMails === void 0 ? true : _ref$showVoiceMails;
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
      var sessionId = null;
      var currentContact = getContact === null || getContact === void 0 ? void 0 : getContact();
      var ready = this._deps.dateTimeFormat.ready && this._deps.locale.ready && this._deps.recentMessages.ready && this._deps.recentCalls.ready;
      if (!useContact) {
        var session = getSession();
        sessionId = session.id;
        currentContact = session.contactMatch;
        var contactMapping = this._deps.contactMatcher.dataMapping;
        var phoneNumber = session.direction === _callDirections["default"].outbound ? session.to : session.from;
        if (!currentContact) {
          var entities = contactMapping === null || contactMapping === void 0 ? void 0 : contactMapping[phoneNumber];
          if ((entities === null || entities === void 0 ? void 0 : entities.length) >= 1) {
            currentContact = entities[0];
          }
        }
        ready = ready && this._deps.contactMatcher.ready;
      }
      return {
        currentLocale: currentLocale,
        title: _i18n["default"].getString('recentActivities', this._deps.locale.currentLocale),
        showSpinner: !ready,
        // @ts-expect-error TS(2322): Type 'Entity | undefined' is not assignable to typ... Remove this comment to see the full error message
        currentContact: currentContact,
        calls: (_this$_deps$recentCal = this._deps.recentCalls.calls) !== null && _this$_deps$recentCal !== void 0 ? _this$_deps$recentCal : {},
        tabs: this.getTabs({
          ready: ready,
          currentLocale: currentLocale,
          dateTimeFormatter: dateTimeFormatter,
          navigateTo: navigateTo,
          // @ts-expect-error TS(2322): Type 'Entity | undefined' is not assignable to typ... Remove this comment to see the full error message
          currentContact: currentContact,
          recentMessages: this._deps.recentMessages,
          recentCalls: this._deps.recentCalls,
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
    value: function getUIFunctions(_ref2) {
      var _this2 = this;
      var entry = _ref2.entry;
      return {
        trackClickToggle: function trackClickToggle(expanded) {
          if (expanded) {
            _this2.trackClickToggle(entry);
          }
        },
        trackClickTab: function trackClickTab(tabName) {
          return _this2.trackClickTab(tabName, entry);
        }
      };
    }
  }]);
  return RecentActivityUI;
}(_core.RcUIModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "trackClickToggle", [_dec2, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "trackClickToggle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "trackClickTab", [_dec3, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "trackClickTab"), _class2.prototype)), _class2)) || _class);
exports.RecentActivityUI = RecentActivityUI;
//# sourceMappingURL=RecentActivityUI.js.map
