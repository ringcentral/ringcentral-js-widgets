"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
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
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveCallsView = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _useResultRef2 = require("@ringcentral/juno/es6/foundation/hooks/useResultRef/useResultRef.js");
var _react = _interopRequireDefault(require("react"));
var _services2 = require("../../../../services");
var _ConferenceCallAction = require("../../../../services/CallAction/ConferenceCallAction");
var _ActiveCallsPanel = require("./ActiveCallsPanel");
var _excluded = ["backToCall"];
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var ActiveCallsView = exports.ActiveCallsView = (_dec = (0, _nextCore.injectable)({
  name: 'ActiveCallsView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('ActiveCallsViewOptions')(target, undefined, 5);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services2.CallMonitor === "undefined" ? Object : _services2.CallMonitor, typeof _services2.CallAction === "undefined" ? Object : _services2.CallAction, typeof _services2.CallingSettings === "undefined" ? Object : _services2.CallingSettings, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _ConferenceCallAction.ConferenceCallAction === "undefined" ? Object : _ConferenceCallAction.ConferenceCallAction, typeof ActiveCallsViewOptions === "undefined" ? Object : ActiveCallsViewOptions]), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function ActiveCallsView(_callMonitor, _callAction, _callingSettings, _appFeatures, _conferenceCallAction, _activeCallsViewOptions) {
    var _this;
    _classCallCheck(this, ActiveCallsView);
    _this = _callSuper(this, ActiveCallsView);
    _this._callMonitor = _callMonitor;
    _this._callAction = _callAction;
    _this._callingSettings = _callingSettings;
    _this._appFeatures = _appFeatures;
    _this._conferenceCallAction = _conferenceCallAction;
    _this._activeCallsViewOptions = _activeCallsViewOptions;
    _this.useActiveCallItemActions = function (call) {
      var telephonySessionId = call.telephonySessionId;
      var _useConnector = (0, _nextCore.useConnector)(function () {
          return {
            info: _this._callAction.getCallMetaInfo(telephonySessionId),
            hasActiveCalls: _this._callMonitor.currDeviceHasActiveCalls,
            mergeable: _this._callAction.isCallMergeable(call, _this.mergeTargetTelephonySessionId),
            isCallForwardingEnabled: _this._appFeatures.isCallForwardingEnabled
          };
        }),
        info = _useConnector.info,
        hasActiveCalls = _useConnector.hasActiveCalls,
        mergeable = _useConnector.mergeable,
        isCallForwardingEnabled = _useConnector.isCallForwardingEnabled;
      var disabled = info === null || info === void 0 ? void 0 : info.actionsDisabled;
      var ringing = (0, _services2.isRingingCall)(call);
      var otherDevice = (0, _services2.isOtherDeviceCall)(call);
      if (ringing) {
        if (otherDevice) {
          var _actions = [];
          if (_this._callingSettings.isWebphoneMode) {
            _actions.push({
              type: 'switch',
              disabled: disabled
            });
          }
          _actions.push({
            type: 'voicemail',
            disabled: disabled
          });
          return _actions;
        }
        var beQueueCall = (0, _services2.isQueueCall)(call);
        if (beQueueCall) {
          return [{
            type: 'answer',
            disabled: disabled
          }, {
            type: 'ignoreQueue',
            disabled: disabled
          }];
        }
        if (hasActiveCalls) {
          return [{
            type: 'holdAndAnswer',
            disabled: disabled
          }, {
            type: 'voicemail',
            disabled: disabled
          }, {
            type: 'endAndAnswer',
            disabled: disabled
          }, {
            type: 'ignore',
            disabled: disabled
          }, {
            type: 'forward',
            disabled: disabled || !isCallForwardingEnabled
          }, {
            type: 'reply',
            disabled: disabled
          }];
        }
        return [{
          type: 'answer',
          disabled: disabled
        }, {
          type: 'voicemail',
          disabled: disabled
        }, {
          type: 'ignore',
          disabled: disabled
        }, {
          type: 'forward',
          disabled: disabled || !isCallForwardingEnabled
        }, {
          type: 'reply',
          disabled: disabled
        }];
      }
      var actions = [{
        type: (0, _callLogHelpers.isOnHold)(call) ? 'unHold' : 'hold',
        disabled: disabled
      }];
      if (mergeable) {
        actions.push({
          type: 'merge',
          disabled: disabled
        });
      }
      if (otherDevice && _this._callingSettings.isWebphoneMode) {
        actions.push({
          type: 'switch',
          disabled: disabled
        });
      }
      actions.push({
        type: 'hangUp',
        disabled: disabled
      });
      return actions;
    };
    _this.useActionsHandler = function (telephonySessionId) {
      var onAction = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(actionType) {
          var handler,
            _handler,
            _len,
            args,
            _key,
            _args = arguments,
            _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _t = actionType;
                _context.n = _t === 'merge' ? 1 : 3;
                break;
              case 1:
                handler = _this._callAction.createActionsHandler(_this.mergeTargetTelephonySessionId);
                _context.n = 2;
                return handler('startMerge', telephonySessionId);
              case 2:
                return _context.a(2, _context.v);
              case 3:
                _handler = _this._callAction.createActionsHandler(telephonySessionId);
                for (_len = _args.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = _args[_key];
                }
                _context.n = 4;
                return _handler.apply(void 0, [actionType].concat(args));
              case 4:
                return _context.a(2, _context.v);
              case 5:
                return _context.a(2);
            }
          }, _callee);
        }));
        return function onAction(_x) {
          return _ref.apply(this, arguments);
        };
      }();
      return onAction;
    };
    return _this;
  }
  _inherits(ActiveCallsView, _RcViewModule);
  return _createClass(ActiveCallsView, [{
    key: "backToCallInfo",
    get: function get() {
      return this._callAction.activeCallInfo || this._callAction.latestOpenedCallInfo;
    }
  }, {
    key: "mergeTargetTelephonySessionId",
    get: function get() {
      var _this$_callAction$act, _this$_callAction$act2;
      var activeTelephonySessionId = this._callMonitor.activeCurrentCallTelephonySessionId;
      var displayTelephonySessionId = (_this$_callAction$act = this._callAction.activeCallInfo) === null || _this$_callAction$act === void 0 ? void 0 : (_this$_callAction$act2 = _this$_callAction$act.call) === null || _this$_callAction$act2 === void 0 ? void 0 : _this$_callAction$act2.telephonySessionId;
      var currMergeTarget = activeTelephonySessionId || displayTelephonySessionId;
      return currMergeTarget;
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_) {
      var _this$backToCallInfo;
      return {
        backToCall: (_this$backToCallInfo = this.backToCallInfo) === null || _this$backToCallInfo === void 0 ? void 0 : _this$backToCallInfo.call,
        calls: this._callAction.displayCallList
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_) {
      return {
        useActionsHandler: this.useActionsHandler,
        useActiveCallItemActions: this.useActiveCallItemActions
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this2 = this,
        _this$_activeCallsVie;
      var _useResultRef = (0, _useResultRef2.useResultRef)(function () {
          return _this2.getUIFunctions(props);
        }),
        uiFunctions = _useResultRef.current;
      var _useConnector2 = (0, _nextCore.useConnector)(function () {
          var uiProps = _this2.getUIProps(props);
          return _objectSpread(_objectSpread({}, props), uiProps);
        }),
        backToCall = _useConnector2.backToCall,
        _props = _objectWithoutProperties(_useConnector2, _excluded);
      if (!backToCall) return null;
      var Component = ((_this$_activeCallsVie = this._activeCallsViewOptions) === null || _this$_activeCallsVie === void 0 ? void 0 : _this$_activeCallsVie.component) || _ActiveCallsPanel.ActiveCallsPanel;
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({
        backToCall: backToCall
      }, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _applyDecoratedDescriptor(_class2.prototype, "mergeTargetTelephonySessionId", [_nextCore.computed, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "mergeTargetTelephonySessionId"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=ActiveCalls.view.js.map
