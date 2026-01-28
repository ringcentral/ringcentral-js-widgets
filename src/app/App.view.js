"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppView = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _views = require("@ringcentral-integration/micro-auth/src/app/views");
var _components = require("@ringcentral-integration/micro-contacts/src/app/components");
var _components2 = require("@ringcentral-integration/micro-core/src/app/components");
var _views2 = require("@ringcentral-integration/micro-core/src/app/views");
var _views3 = require("@ringcentral-integration/micro-meeting/src/app/views");
var _views4 = require("@ringcentral-integration/micro-message/src/app/views");
var _views5 = require("@ringcentral-integration/micro-phone/src/app/views");
var _views6 = require("@ringcentral-integration/micro-setting/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _react = _interopRequireDefault(require("react"));
var _FakeBrowserURL = require("./FakeBrowserURL");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
var AppView = exports.AppView = (_dec = (0, _nextCore.injectable)({
  name: 'AppView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 27);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 28);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)('AppViewOptions')(target, undefined, 29);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _views2.SpringAppRootView === "undefined" ? Object : _views2.SpringAppRootView, typeof _views5.CallDetailView === "undefined" ? Object : _views5.CallDetailView, typeof _views.ConnectivityView === "undefined" ? Object : _views.ConnectivityView, typeof _views4.ConversationsViewSpring === "undefined" ? Object : _views4.ConversationsViewSpring, typeof _views4.ConversationViewSpring === "undefined" ? Object : _views4.ConversationViewSpring, typeof _views4.VoicemailView === "undefined" ? Object : _views4.VoicemailView, typeof _views6.SettingsView === "undefined" ? Object : _views6.SettingsView, typeof _views5.DialerPadView === "undefined" ? Object : _views5.DialerPadView, typeof _views6.CallingSettingsView === "undefined" ? Object : _views6.CallingSettingsView, typeof _views6.RegionSettingsView === "undefined" ? Object : _views6.RegionSettingsView, typeof _views6.AudioSettingsView === "undefined" ? Object : _views6.AudioSettingsView, typeof _views6.FeedbackView === "undefined" ? Object : _views6.FeedbackView, typeof _views6.IssuesTrackingView === "undefined" ? Object : _views6.IssuesTrackingView, typeof _views6.CallQueueManagementView === "undefined" ? Object : _views6.CallQueueManagementView, typeof _views6.AutoCallLogICSettingsView === "undefined" ? Object : _views6.AutoCallLogICSettingsView, typeof _views6.CallLoggingSettingsView === "undefined" ? Object : _views6.CallLoggingSettingsView, typeof _views6.RecordMatchingSettingsView === "undefined" ? Object : _views6.RecordMatchingSettingsView, typeof _views6.ThemeSwitchView === "undefined" ? Object : _views6.ThemeSwitchView, typeof _views5.CallView === "undefined" ? Object : _views5.CallView, typeof _views.EnvironmentView === "undefined" ? Object : _views.EnvironmentView, typeof _views6.WelcomeView === "undefined" ? Object : _views6.WelcomeView, typeof _views4.ComposeTextViewSpring === "undefined" ? Object : _views4.ComposeTextViewSpring, typeof _views.LoginView === "undefined" ? Object : _views.LoginView, typeof _views2.HeaderView === "undefined" ? Object : _views2.HeaderView, typeof _views4.FaxSendView === "undefined" ? Object : _views4.FaxSendView, typeof _views2.HeaderNavViewSpring === "undefined" ? Object : _views2.HeaderNavViewSpring, typeof _views3.GenericMeetingViewSpring === "undefined" ? Object : _views3.GenericMeetingViewSpring, typeof _views3.PersonalMeetingSettingsViewSpring === "undefined" ? Object : _views3.PersonalMeetingSettingsViewSpring, typeof AppViewOptions === "undefined" ? Object : AppViewOptions]), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", []), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", []), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", []), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function AppView(_router, _appRootView, _callDetailView, _connectivityView, _conversationsView, _conversationView, _voicemailView, _settingsView, _dialerPadView, _callingSettingsView, _regionSettingsView, _audioSettingsView, _feedbackView, _issuesTrackingView, _callQueueManagementView, _autoCallLogICSettingsView, _callLoggingSettingsView, _recordMatchingSettingsView, _themeSwitchView, _callView, _environmentView, _welcomeView, _composeTextView, _loginView, _headerView, _faxSendView, _headerNavView, _genericMeetingViewSpring, _personalMeetingSettingsViewSpring, _appViewOptions) {
    var _this$_appViewOptions, _this$_genericMeeting, _this$_personalMeetin;
    var _this;
    _classCallCheck(this, AppView);
    _this = _callSuper(this, AppView);
    _this._router = _router;
    _this._appRootView = _appRootView;
    _this._callDetailView = _callDetailView;
    _this._connectivityView = _connectivityView;
    _this._conversationsView = _conversationsView;
    _this._conversationView = _conversationView;
    _this._voicemailView = _voicemailView;
    _this._settingsView = _settingsView;
    _this._dialerPadView = _dialerPadView;
    _this._callingSettingsView = _callingSettingsView;
    _this._regionSettingsView = _regionSettingsView;
    _this._audioSettingsView = _audioSettingsView;
    _this._feedbackView = _feedbackView;
    _this._issuesTrackingView = _issuesTrackingView;
    _this._callQueueManagementView = _callQueueManagementView;
    _this._autoCallLogICSettingsView = _autoCallLogICSettingsView;
    _this._callLoggingSettingsView = _callLoggingSettingsView;
    _this._recordMatchingSettingsView = _recordMatchingSettingsView;
    _this._themeSwitchView = _themeSwitchView;
    _this._callView = _callView;
    _this._environmentView = _environmentView;
    _this._welcomeView = _welcomeView;
    _this._composeTextView = _composeTextView;
    _this._loginView = _loginView;
    _this._headerView = _headerView;
    _this._faxSendView = _faxSendView;
    _this._headerNavView = _headerNavView;
    _this._genericMeetingViewSpring = _genericMeetingViewSpring;
    _this._personalMeetingSettingsViewSpring = _personalMeetingSettingsViewSpring;
    _this._appViewOptions = _appViewOptions;
    _this.routes = [{
      path: '/welcome',
      component: _this._welcomeView.component
    }, {
      path: '/calling',
      component: _this._callView.component
    }, {
      path: '/',
      component: _this._loginView.component,
      exact: true
    }].concat(_toConsumableArray(((_this$_appViewOptions = _this._appViewOptions) === null || _this$_appViewOptions === void 0 ? void 0 : _this$_appViewOptions.routes) || []), [{
      path: '/dialer/:tabId',
      component: _this._dialerPadView.component,
      authentication: true
    }, {
      path: '/dialer',
      component: _this._dialerPadView.component,
      authentication: true
    }, {
      path: '/history/:callLogId',
      component: _this._callDetailView.component,
      authentication: true
    }, {
      path: '/composeText',
      component: _this._composeTextView.component,
      authentication: true
    }, {
      path: '/composeFax',
      component: _this._faxSendView.component,
      authentication: true
    }, {
      path: '/conversations/:conversationId',
      component: _this._conversationView.component,
      authentication: true
    }, {
      path: '/voicemails/:conversationId',
      component: _this._voicemailView.component,
      authentication: true
    }, {
      path: '/messages',
      component: _this.Text,
      authentication: true
    }, {
      path: '/fax',
      component: _this.Fax,
      authentication: true
    }, {
      path: '/settings',
      component: _this._settingsView.component,
      authentication: true,
      exact: true
    }, {
      path: '/settings/calling',
      component: _this._callingSettingsView.component,
      authentication: true
    }, {
      path: '/settings/region',
      component: _this._regionSettingsView.component,
      authentication: true
    }, {
      path: '/settings/audio',
      component: _this._audioSettingsView.component,
      authentication: true
    }, {
      path: '/settings/feedback',
      component: _this._feedbackView.component,
      authentication: true
    }, {
      path: '/settings/issuesTracking',
      component: _this._issuesTrackingView.component,
      authentication: true
    }, {
      path: '/settings/callQueueManagement',
      component: _this._callQueueManagementView.component,
      authentication: true
    }, {
      path: '/settings/theme',
      component: _this._themeSwitchView.component,
      authentication: true
    }, {
      path: '/settings/autoCallLogSettings/callLogging',
      component: _this._callLoggingSettingsView.component,
      authentication: true
    }, {
      path: '/settings/autoCallLogSettings/recordMatching',
      component: _this._recordMatchingSettingsView.component,
      authentication: true
    }, {
      path: '/settings/autoCallLogSettings',
      component: _this._autoCallLogICSettingsView.component,
      authentication: true
    }, {
      path: '/meeting',
      component: (_this$_genericMeeting = _this._genericMeetingViewSpring) === null || _this$_genericMeeting === void 0 ? void 0 : _this$_genericMeeting.component,
      authentication: true,
      exact: true
    }, {
      path: '/meeting/personalMeetingSettings',
      component: (_this$_personalMeetin = _this._personalMeetingSettingsViewSpring) === null || _this$_personalMeetin === void 0 ? void 0 : _this$_personalMeetin.component,
      authentication: true
    }]);
    _this.routesMap = _this.routes.reduce(function (acc, curr) {
      var target = curr.authentication ? acc.authentication : acc["default"];
      target.push(/*#__PURE__*/_react["default"].createElement(_nextCore.Route, {
        key: curr.path,
        path: curr.path,
        exact: curr.exact,
        component: curr.component
      }));
      return acc;
    }, {
      "default": [],
      authentication: []
    });
    _this.FakeBrowserURL = process.env.NODE_ENV !== 'production' ? function () {
      var currentPath = (0, _nextCore.useConnector)(function () {
        return _this._router.currentPath;
      });
      return /*#__PURE__*/_react["default"].createElement(_FakeBrowserURL.FakeBrowserURL, {
        value: currentPath,
        onCommitted: function onCommitted(value) {
          _this._router.push(value);
        }
      });
    } : undefined;
    return _this;
  }
  _inherits(AppView, _RcViewModule);
  return _createClass(AppView, [{
    key: "Text",
    value: function Text() {
      return /*#__PURE__*/_react["default"].createElement(this._conversationsView.component, {
        typeFilter: "Text"
      });
    }
  }, {
    key: "Fax",
    value: function Fax() {
      return /*#__PURE__*/_react["default"].createElement(this._conversationsView.component, {
        typeFilter: "Fax"
      });
    }
  }, {
    key: "Footer",
    value: function Footer() {
      var _useAppFooter = (0, _components2.useAppFooter)({
          defaultFooter: /*#__PURE__*/_react["default"].createElement(this._headerNavView.component, null)
        }),
        footer = _useAppFooter.footer;
      return footer;
    }
  }, {
    key: "MainContent",
    value: function MainContent() {
      var _this2 = this;
      return /*#__PURE__*/_react["default"].createElement(_nextCore.Switch, null, this.routesMap["default"], /*#__PURE__*/_react["default"].createElement(_nextCore.Route, {
        path: "/",
        component: function component() {
          return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_this2._headerView.component, {
            standAlone: true,
            ContactAvatar: _components.ContactAvatar
          }, /*#__PURE__*/_react["default"].createElement("main", {
            className: "flex flex-col flex-auto overflow-y-auto h-full overflow-x-hidden"
          }, /*#__PURE__*/_react["default"].createElement(_nextCore.Switch, null, _this2.routesMap.authentication))), /*#__PURE__*/_react["default"].createElement(_this2.Footer, null));
        }
      }));
    }
  }, {
    key: "component",
    value: function component() {
      var _this$_appViewOptions2;
      return /*#__PURE__*/_react["default"].createElement(this._appRootView.component, {
        header: /*#__PURE__*/_react["default"].createElement("div", {
          className: "flex-none"
        }, /*#__PURE__*/_react["default"].createElement(_components2.AppAnnouncementRender, null, this.FakeBrowserURL ? /*#__PURE__*/_react["default"].createElement(this.FakeBrowserURL, null) : null, /*#__PURE__*/_react["default"].createElement(this._connectivityView.component, null), (_this$_appViewOptions2 = this._appViewOptions) === null || _this$_appViewOptions2 === void 0 ? void 0 : _this$_appViewOptions2.headers, /*#__PURE__*/_react["default"].createElement(this._callView.Announcement, null)))
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex flex-col h-full flex-auto overflow-hidden bg-neutral-base",
        id: _views2.VIEW_TRANSITION_DETAIL_IDENTIFY
      }, /*#__PURE__*/_react["default"].createElement(this.MainContent, null), /*#__PURE__*/_react["default"].createElement(this._callView.IncomingCallList, null), /*#__PURE__*/_react["default"].createElement(this._environmentView.component, null)));
    }
  }]);
}(_nextCore.RcViewModule), _applyDecoratedDescriptor(_class2.prototype, "Text", [_nextCore.autobind, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "Text"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "Fax", [_nextCore.autobind, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "Fax"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "Footer", [_nextCore.autobind, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "Footer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "MainContent", [_nextCore.autobind, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "MainContent"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=App.view.js.map
