"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialerPadView = void 0;
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _services2 = require("@ringcentral-integration/micro-message/src/app/services");
var _ConversationsViewSpring = require("@ringcentral-integration/micro-message/src/app/views/ConversationsViewSpring");
var _nextCore = require("@ringcentral-integration/next-core");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _services3 = require("../../services");
var _CallsListViewSpring = require("../CallsListViewSpring");
var _DialerView = require("../DialerView");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
var DialerPadView = exports.DialerPadView = (_dec = (0, _nextCore.injectable)({
  name: 'DialerPadView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('DialerPadViewOptions')(target, undefined, 8);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services2.MessageStore === "undefined" ? Object : _services2.MessageStore, typeof _services3.CallHistory === "undefined" ? Object : _services3.CallHistory, typeof _views.SyncTabView === "undefined" ? Object : _views.SyncTabView, typeof _CallsListViewSpring.CallsListViewSpring === "undefined" ? Object : _CallsListViewSpring.CallsListViewSpring, typeof _DialerView.DialerView === "undefined" ? Object : _DialerView.DialerView, typeof _ConversationsViewSpring.ConversationsViewSpring === "undefined" ? Object : _ConversationsViewSpring.ConversationsViewSpring, typeof DialerPadViewOptions === "undefined" ? Object : DialerPadViewOptions]), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function DialerPadView(_router, _appFeatures, _messageStore, _callHistory, _syncTabView, _callsListView, _dialerView, _conversationsView, _dialerPadViewOptions) {
    var _this;
    _classCallCheck(this, DialerPadView);
    _this = _callSuper(this, DialerPadView);
    _this._router = _router;
    _this._appFeatures = _appFeatures;
    _this._messageStore = _messageStore;
    _this._callHistory = _callHistory;
    _this._syncTabView = _syncTabView;
    _this._callsListView = _callsListView;
    _this._dialerView = _dialerView;
    _this._conversationsView = _conversationsView;
    _this._dialerPadViewOptions = _dialerPadViewOptions;
    return _this;
  }
  _inherits(DialerPadView, _RcViewModule);
  return _createClass(DialerPadView, [{
    key: "tabs",
    get: function get() {
      var tabs = [];
      if (this._appFeatures.isCallingEnabled) {
        tabs.push({
          id: 'keypad',
          label: (0, _i18n.t)('keypad'),
          component: /*#__PURE__*/_react["default"].createElement(this._dialerView.component, null)
        });
      }
      if (this._appFeatures.isCallingEnabled || this._appFeatures.hasReadExtensionCallLog) {
        tabs.push({
          id: 'calls',
          label: (0, _i18n.t)('calls'),
          BadgeProps: {
            max: 99,
            count: this._callHistory.missedCallsUnreadCounts
          },
          component: /*#__PURE__*/_react["default"].createElement(this._callsListView.component, null)
        });
      }
      if (this._appFeatures.hasVoicemailPermission) {
        tabs.push({
          id: 'voicemail',
          label: (0, _i18n.t)('voicemails'),
          BadgeProps: {
            count: this._messageStore.voiceUnreadCounts,
            max: 99
          },
          component: /*#__PURE__*/_react["default"].createElement(this._conversationsView.component, {
            typeFilter: "VoiceMail"
          })
        });
      }
      return tabs;
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_props) {
      return {
        tabs: this.tabs
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_props) {
      return {};
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this2 = this;
      var isMainClient = (0, _nextCore.useIsMainClient)();
      var _useState = (0, _react.useState)(null),
        _useState2 = _slicedToArray(_useState, 2),
        routeTabId = _useState2[0],
        setRouteTabId = _useState2[1];
      var _useConnector = (0, _nextCore.useConnector)(function () {
          var uiProps = _this2.getUIProps(props);
          return _objectSpread(_objectSpread({}, props), uiProps);
        }),
        tabs = _useConnector.tabs;

      // allow user can switch to the tab by url
      this._router.useParams(function (params) {
        var tabId = params.tabId;
        if (tabId && isMainClient) {
          setRouteTabId(tabId);
        }
      });
      (0, _react.useEffect)(function () {
        if (tabs.some(function (tab) {
          return tab.id === routeTabId;
        })) {
          _this2._syncTabView.replaceActive(_views.SyncTabId.DIALPAD, routeTabId);
          // reset router to empty to avoid next route change trigger replace again accidentally
          _this2._router.replace('/dialer');
        }
      }, [routeTabId, tabs]);
      return tabs.length > 0 ? /*#__PURE__*/_react["default"].createElement(this._syncTabView.component, {
        id: _views.SyncTabId.DIALPAD,
        className: (0, _clsx["default"])('[&_.sui-tab]:max-w-none [&_.sui-tab]:flex-grow'),
        variant: "scrollable",
        tabs: tabs
      }) : null;
    }
  }]);
}(_nextCore.RcViewModule), _applyDecoratedDescriptor(_class2.prototype, "tabs", [_nextCore.computed, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "tabs"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=DialerPad.view.js.map
