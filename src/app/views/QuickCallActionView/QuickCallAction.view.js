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
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuickCallActionView = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _observableHooks = require("observable-hooks");
var _react = _interopRequireWildcard(require("react"));
var _rxjs = require("rxjs");
var _services = require("../../services");
var _QuickCallActionPanel = require("./QuickCallActionPanel");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _class, _class2;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var QuickCallActionView = exports.QuickCallActionView = (_dec = (0, _nextCore.injectable)({
  name: 'QuickCallActionView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('QuickCallActionViewOptions')(target, undefined, 3);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _services.CallingSettings === "undefined" ? Object : _services.CallingSettings, typeof _services.CallAction === "undefined" ? Object : _services.CallAction, typeof QuickCallActionViewOptions === "undefined" ? Object : QuickCallActionViewOptions]), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", []), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", []), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function QuickCallActionView(_portManager, _callingSettings, _callAction, _QuickCallActionViewOptions) {
    var _this;
    _classCallCheck(this, QuickCallActionView);
    _this = _callSuper(this, QuickCallActionView);
    _this._portManager = _portManager;
    _this._callingSettings = _callingSettings;
    _this._callAction = _callAction;
    _this._QuickCallActionViewOptions = _QuickCallActionViewOptions;
    _this.swapMenuOpened$ = new _rxjs.BehaviorSubject(false);
    _this.mergeMenuOpened$ = _this._callAction.mergeMenuOpened$;
    if (_this._portManager.shared) {
      _this._portManager.onClient(function () {
        _this.bindMenuCloseListener();
      });
    } else {
      _this.bindMenuCloseListener();
    }
    return _this;
  }
  _inherits(QuickCallActionView, _RcViewModule);
  return _createClass(QuickCallActionView, [{
    key: "swapCalls",
    get: function get() {
      var _this2 = this;
      return this._callAction.displayCallList.filter(function (call) {
        var _this2$_callAction$ac, _this2$_callAction$ac2;
        var metaInfo = _this2._callAction.getCallMetaInfo(call.telephonySessionId);
        return !(metaInfo === null || metaInfo === void 0 ? void 0 : metaInfo.open) && !(0, _services.isOtherDeviceCall)(call) &&
        // exist active call also should not include in swapCall list
        call.telephonySessionId !== ((_this2$_callAction$ac = _this2._callAction.activeCallInfo) === null || _this2$_callAction$ac === void 0 ? void 0 : (_this2$_callAction$ac2 = _this2$_callAction$ac.call) === null || _this2$_callAction$ac2 === void 0 ? void 0 : _this2$_callAction$ac2.telephonySessionId);
      });
    }
  }, {
    key: "mergeCalls",
    get: function get() {
      return this._callAction.mergeCalls;
    }
  }, {
    key: "bindMenuCloseListener",
    value: function bindMenuCloseListener() {
      var _this3 = this;
      (0, _nextCore.fromWatchValue)(this, function () {
        var _this3$_callAction$ac, _this3$_callAction$ac2;
        return (_this3$_callAction$ac = _this3._callAction.activeCallInfo) === null || _this3$_callAction$ac === void 0 ? void 0 : (_this3$_callAction$ac2 = _this3$_callAction$ac.call) === null || _this3$_callAction$ac2 === void 0 ? void 0 : _this3$_callAction$ac2.telephonySessionId;
      }).pipe((0, _rxjs.tap)(function () {
        _this3.swapMenuOpened$.next(false);
        _this3.mergeMenuOpened$.next(false);
      }), _nextCore.takeUntilAppDestroy).subscribe();
    }
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      var callMap = this._callAction.displayCallsMap;
      var multiple = this._callAction.connectingCalls.length > 1;
      if (multiple) {
        return {
          ringCalls: callMap.ringing,
          holdingCalls: callMap.holding,
          activeCalls: callMap.active,
          swapCalls: this.swapCalls,
          mergeCalls: this.mergeCalls,
          actions: this.multipleActions
        };
      }
      var actionInfo = this._callAction.announcementInfo;
      if (!(actionInfo === null || actionInfo === void 0 ? void 0 : actionInfo.meta)) {
        return {
          hidden: true
        };
      }
      return {
        currentCall: actionInfo.call,
        ringCalls: [],
        holdingCalls: [],
        activeCalls: [],
        swapCalls: [],
        mergeCalls: [],
        actions: this.singleActions
      };
    }
  }, {
    key: "singleActions",
    get: function get() {
      var actionInfo = this._callAction.announcementInfo;
      if (!actionInfo) return [];
      var session = actionInfo.session,
        meta = actionInfo.meta,
        call = actionInfo.call;
      var _session$isOnMute = session.isOnMute,
        isOnMute = _session$isOnMute === void 0 ? false : _session$isOnMute,
        _session$isOnHold = session.isOnHold,
        isOnHold = _session$isOnHold === void 0 ? false : _session$isOnHold;
      if (!call) return [];
      var disabled = meta === null || meta === void 0 ? void 0 : meta.actionsDisabled;
      var ringing = (0, _services.isRingingCall)(call);
      var otherDevice = (0, _services.isOtherDeviceCall)(call);
      var actions = [];
      if (ringing) {
        if (otherDevice) {
          if (this._callingSettings.isWebphoneMode) {
            actions.push({
              type: 'switch',
              disabled: disabled
            });
          }
          actions.push({
            type: 'voicemail',
            disabled: disabled
          });
          return actions;
        }
        var beQueueCall = (0, _services.isQueueCall)(call);
        if (beQueueCall) {
          return [{
            type: 'ignoreQueue',
            disabled: disabled
          }, {
            type: 'answer',
            disabled: disabled
          }];
        }
        return [{
          type: 'voicemail',
          disabled: disabled
        }, {
          type: 'answer',
          disabled: disabled
        }];
      }
      actions.push({
        type: isOnMute ? 'unmute' : 'mute',
        disabled: isOnHold || disabled
      });
      if (otherDevice && this._callingSettings.isWebphoneMode) {
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
    }
  }, {
    key: "multipleActions",
    get: function get() {
      var _actionInfo$meta;
      var actions = [];
      var actionInfo = this._callAction.announcementInfo;
      var call = actionInfo === null || actionInfo === void 0 ? void 0 : actionInfo.call;
      var disabled = actionInfo === null || actionInfo === void 0 ? void 0 : (_actionInfo$meta = actionInfo.meta) === null || _actionInfo$meta === void 0 ? void 0 : _actionInfo$meta.actionsDisabled;
      if (call && (0, _services.isOtherDeviceCall)(call)) {
        if (this._callingSettings.isWebphoneMode) {
          actions.push({
            type: 'switch',
            disabled: disabled
          });
        }
      } else {
        if (this.swapCalls.length > 0) actions.push({
          type: 'swap',
          disabled: disabled
        });
        if (this.mergeCalls.length > 0) actions.push({
          type: 'merge',
          disabled: disabled
        });
      }
      actions.push({
        type: 'callList'
      });
      return actions;
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this4 = this;
      var onAction = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(actionType, value) {
          var _this4$_callAction$an, _this4$_callAction$an2;
          var telephonySessionId, handler, _this4$swapCalls$, swapId, _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                telephonySessionId = (_this4$_callAction$an = _this4._callAction.announcementInfo) === null || _this4$_callAction$an === void 0 ? void 0 : (_this4$_callAction$an2 = _this4$_callAction$an.call) === null || _this4$_callAction$an2 === void 0 ? void 0 : _this4$_callAction$an2.telephonySessionId;
                handler = _this4._callAction.createActionsHandler(telephonySessionId);
                _t = actionType;
                _context.n = _t === 'swap' ? 1 : 6;
                break;
              case 1:
                if (!(_this4.swapCalls.length > 1)) {
                  _context.n = 2;
                  break;
                }
                _this4.swapMenuOpened$.next(true);
                return _context.a(2);
              case 2:
                if (!(_this4.swapCalls.length === 1)) {
                  _context.n = 5;
                  break;
                }
                // swap to another call
                swapId = (_this4$swapCalls$ = _this4.swapCalls[0]) === null || _this4$swapCalls$ === void 0 ? void 0 : _this4$swapCalls$.telephonySessionId;
                if (swapId) {
                  _context.n = 3;
                  break;
                }
                return _context.a(2);
              case 3:
                _context.n = 4;
                return handler('startSwap', swapId);
              case 4:
                return _context.a(2);
              case 5:
                return _context.a(3, 8);
              case 6:
                _context.n = 7;
                return handler(actionType, value);
              case 7:
                return _context.a(3, 8);
              case 8:
                return _context.a(2, false);
            }
          }, _callee);
        }));
        return function onAction(_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }();
      return {
        onAction: onAction
      };
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this5 = this,
        _this$_QuickCallActio;
      var _useRef = (0, _react.useRef)(this.getUIFunctions()),
        uiFunctions = _useRef.current;
      var swapMenuOpened = (0, _observableHooks.useObservableState)(this.swapMenuOpened$, false);
      var mergeMenuOpened = (0, _observableHooks.useObservableState)(this.mergeMenuOpened$, false);
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this5.getUIProps();
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      if ('hidden' in _props) {
        return null;
      }
      var Component = ((_this$_QuickCallActio = this._QuickCallActionViewOptions) === null || _this$_QuickCallActio === void 0 ? void 0 : _this$_QuickCallActio.component) || _QuickCallActionPanel.QuickCallActionPanel;
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({
        swapMenuOpened: swapMenuOpened,
        onSwapMenuOpen: function onSwapMenuOpen(opened) {
          _this5.swapMenuOpened$.next(opened);
        },
        mergeMenuOpened: mergeMenuOpened,
        onMergeMenuOpen: function onMergeMenuOpen(opened) {
          _this5.mergeMenuOpened$.next(opened);
        }
      }, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _applyDecoratedDescriptor(_class2.prototype, "swapCalls", [_nextCore.computed, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "swapCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "singleActions", [_nextCore.computed, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "singleActions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "multipleActions", [_nextCore.computed, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "multipleActions"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=QuickCallAction.view.js.map
