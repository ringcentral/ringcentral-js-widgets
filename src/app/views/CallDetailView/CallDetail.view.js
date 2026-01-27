"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
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
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallDetailView = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _react = _interopRequireWildcard(require("react"));
var _rxjs = require("rxjs");
var _services = require("../../services");
var _CallLogFormView = require("../CallLogFormView");
var _CallView = require("../CallView");
var _services2 = require("../CallView/services");
var _CallsListViewSpring = require("../CallsListViewSpring");
var _CallDetailPage = require("./CallDetailPage");
var _excluded = ["currentCallLog"];
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _class, _class2, _descriptor;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
var CallDetailView = exports.CallDetailView = (_dec = (0, _nextCore.injectable)({
  name: 'CallDetailView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 6);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 7);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)('CallDetailViewOptions')(target, undefined, 8);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _views.SyncTabView === "undefined" ? Object : _views.SyncTabView, typeof _services2.CallViewState === "undefined" ? Object : _services2.CallViewState, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _CallsListViewSpring.CallsListViewSpring === "undefined" ? Object : _CallsListViewSpring.CallsListViewSpring, typeof _CallView.CallView === "undefined" ? Object : _CallView.CallView, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services.CallLogTasks === "undefined" ? Object : _services.CallLogTasks, typeof _CallLogFormView.CallLogFormView === "undefined" ? Object : _CallLogFormView.CallLogFormView, typeof CallDetailViewOptions === "undefined" ? Object : CallDetailViewOptions]), _dec7 = (0, _nextCore.dynamic)('Theme'), _dec8 = Reflect.metadata("design:type", typeof Theme === "undefined" ? Object : Theme), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function CallDetailView(_syncTabView, _callViewState, _portManager, _callsListView, _callView, _router, _callLogTasks, _callLogFormView, _callDetailViewOptions) {
    var _this;
    _classCallCheck(this, CallDetailView);
    _this = _callSuper(this, CallDetailView);
    _this._syncTabView = _syncTabView;
    _this._callViewState = _callViewState;
    _this._portManager = _portManager;
    _this._callsListView = _callsListView;
    _this._callView = _callView;
    _this._router = _router;
    _this._callLogTasks = _callLogTasks;
    _this._callLogFormView = _callLogFormView;
    _this._callDetailViewOptions = _callDetailViewOptions;
    _initializerDefineProperty(_this, "_theme", _descriptor, _this);
    if (_this._portManager.shared) {
      _this._portManager.onServer(function () {
        _this.bindSetCallLogIdListener();
      });
    } else {
      _this.bindSetCallLogIdListener();
    }
    return _this;
  }
  _inherits(CallDetailView, _RcViewModule);
  return _createClass(CallDetailView, [{
    key: "bindSetCallLogIdListener",
    value: function bindSetCallLogIdListener() {
      var _this2 = this;
      // just for we know the call from preinsert change to synced call
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        this.fromCurrentCallLogTypeChange().pipe((0, _rxjs.map)(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            _ = _ref2[0],
            callLog = _ref2[1];
          _this2.logger.log('call history synced:', callLog.telephonySessionId);
        }), _nextCore.takeUntilAppDestroy).subscribe();
      }
      this.routeGuard();
      this.bindViewCallListeners();
    }
  }, {
    key: "bindViewCallListeners",
    value: function bindViewCallListeners() {
      var _this3 = this;
      var viewingCallLogIdChange$ = this._callViewState.callDetailCallLog$.pipe((0, _rxjs.distinctUntilChanged)(function (prev, curr) {
        return (prev === null || prev === void 0 ? void 0 : prev.telephonySessionId) === (curr === null || curr === void 0 ? void 0 : curr.telephonySessionId);
      }));
      viewingCallLogIdChange$.pipe((0, _rxjs.tap)(function () {
        var active = _this3._syncTabView.getActive(_views.SyncTabId.CALL_LOG);
        // when into call log detail view, ensure show the call log panel instead of ai-note
        if (active && active !== _views.CallLogSyncTabId.LOG) {
          _this3._syncTabView.setActive(_views.SyncTabId.CALL_LOG, _views.CallLogSyncTabId.LOG);
        }
      }), (0, _rxjs.filter)(Boolean), (0, _rxjs.tap)(function (callLog) {
        var _this3$_callLogTasks;
        (_this3$_callLogTasks = _this3._callLogTasks) === null || _this3$_callLogTasks === void 0 ? void 0 : _this3$_callLogTasks.fetchAndUpdateTask(callLog, true);
      }), _nextCore.takeUntilAppDestroy).subscribe();
    }
  }, {
    key: "routeGuard",
    value: function routeGuard() {
      var _this4 = this;
      var dataNotExist$ = this._callViewState.callDetailCallLog$.pipe((0, _rxjs.map)(function (current) {
        return Boolean(current);
      }), (0, _rxjs.distinctUntilChanged)(), (0, _rxjs.filter)(function (current) {
        return !current;
      }));
      dataNotExist$.pipe((0, _rxjs.switchMap)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!_this4._callViewState.inCallDetailRouteTelephonySessionId()) {
                _context.n = 1;
                break;
              }
              _this4.logger.log('into history item page with invalid data, go back to dialer');
              _context.n = 1;
              return _this4._router.replace('/dialer');
            case 1:
              return _context.a(2);
          }
        }, _callee);
      }))), _nextCore.takeUntilAppDestroy).subscribe();
    }

    /**
     * use for know the call log type change
     */
  }, {
    key: "fromCurrentCallLogTypeChange",
    value: function fromCurrentCallLogTypeChange() {
      return (0, _rxjs.merge)(this._callViewState.callDetailCallLog$.pipe((0, _rxjs.pairwise)()), this._callViewState.postCallCallLog$.pipe((0, _rxjs.pairwise)())).pipe((0, _rxjs.map)(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
          prev = _ref5[0],
          current = _ref5[1];
        if (prev && current && prev.__preinsert !== current.__preinsert) {
          return ['synced', current];
        }
        return undefined;
      }), (0, _rxjs.filter)(Boolean));
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_) {
      return {
        currentCallLog: this._callViewState.callDetailCallLog
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_) {
      var _this5 = this;
      return {
        goBack: function () {
          var _goBack = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
            var _this5$_theme;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  _context2.n = 1;
                  return (0, _views.slideOutViewTransition)(function () {
                    return _this5._router.push('/dialer');
                  }, (_this5$_theme = _this5._theme) === null || _this5$_theme === void 0 ? void 0 : _this5$_theme.reducedMotion);
                case 1:
                  return _context2.a(2);
              }
            }, _callee2);
          }));
          function goBack() {
            return _goBack.apply(this, arguments);
          }
          return goBack;
        }(),
        useCallHistoryItemInfo: this._callsListView.useCallHistoryItemInfo,
        useActionsHandler: this._callsListView.useActionsHandler
      };
    }
  }, {
    key: "FormArea",
    value: function FormArea() {
      var _this6 = this;
      var info = (0, _nextCore.useConnector)(function () {
        return _this6._callViewState.callDetailCallLog;
      });
      return /*#__PURE__*/_react["default"].createElement(this._callView.CallDetailForm, {
        variant: "history",
        info: info
      });
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this7 = this;
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;
      var _useConnector = (0, _nextCore.useConnector)(function () {
          var uiProps = _this7.getUIProps(props);
          return _objectSpread(_objectSpread({}, props), uiProps);
        }),
        currentCallLog = _useConnector.currentCallLog,
        _props = _objectWithoutProperties(_useConnector, _excluded);
      if (!currentCallLog) {
        return null;
      }
      return /*#__PURE__*/_react["default"].createElement(_CallDetailPage.CallDetailPage, _extends({}, _props, uiFunctions, {
        currentCallLog: currentCallLog,
        footer: this._callLogFormView ? /*#__PURE__*/_react["default"].createElement(this._callLogFormView.Save, null) : null
      }), /*#__PURE__*/_react["default"].createElement(this.FormArea, null));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_theme", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "FormArea", [_nextCore.autobind, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "FormArea"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=CallDetail.view.js.map
