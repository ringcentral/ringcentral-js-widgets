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
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogFormView = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _springUi = require("@ringcentral/spring-ui");
var _events = require("events");
var _react = _interopRequireWildcard(require("react"));
var _services2 = require("../../services");
var _CallLogTasks = require("../../services/CallLogTasks");
var _CallLogFormPage = require("./CallLogFormPage");
var _i18n = _interopRequireDefault(require("./CallLogFormPage/i18n"));
var _i18n2 = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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
var CallLogFormView = exports.CallLogFormView = (_dec = (0, _nextCore.injectable)({
  name: 'CallLogFormView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 3);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('CallLogFormViewOptions')(target, undefined, 4);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _services2.CallAction === "undefined" ? Object : _services2.CallAction, typeof _views.SyncTabView === "undefined" ? Object : _views.SyncTabView, typeof _services.ConnectivityMonitor === "undefined" ? Object : _services.ConnectivityMonitor, typeof _CallLogTasks.CallLogTasks === "undefined" ? Object : _CallLogTasks.CallLogTasks, typeof CallLogFormViewOptions === "undefined" ? Object : CallLogFormViewOptions]), _dec6 = (0, _nextCore.delegate)('server'), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [Object]), _dec9 = (0, _nextCore.delegate)('server'), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function CallLogFormView(_callAction, _syncTabView, _connectivityMonitor, _callLogTasks, _callLogFormViewOptions) {
    var _this;
    _classCallCheck(this, CallLogFormView);
    _this = _callSuper(this, CallLogFormView);
    _this._callAction = _callAction;
    _this._syncTabView = _syncTabView;
    _this._connectivityMonitor = _connectivityMonitor;
    _this._callLogTasks = _callLogTasks;
    _this._callLogFormViewOptions = _callLogFormViewOptions;
    _this.eventEmitter = new _events.EventEmitter();
    _this.Save = /*#__PURE__*/(0, _react.forwardRef)(function (_, ref) {
      var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
        t = _useLocale.t;
      var _useConnector = (0, _nextCore.useConnector)(function () {
          var currentLogState = _this.currentLogState;
          var isSaving = currentLogState === null || currentLogState === void 0 ? void 0 : currentLogState.isSaving;
          var isSaved = (currentLogState === null || currentLogState === void 0 ? void 0 : currentLogState.isSucceed) && !currentLogState.isEdited;
          var activeSyncTab = _this._syncTabView.getActive(_views.SyncTabId.CALL_LOG);
          return {
            disabled: _this.networkDisabled || _this.saveButtonDisabled || isSaved || isSaving,
            isSaving: isSaving,
            show: !activeSyncTab || activeSyncTab === _views.CallLogSyncTabId.LOG
          };
        }),
        isSaving = _useConnector.isSaving,
        disabled = _useConnector.disabled,
        show = _useConnector.show;

      // currently we only show save button in log tab, once we support log AI note, we need to update this logic
      return show ? /*#__PURE__*/_react["default"].createElement("div", {
        ref: ref,
        className: "p-4 border-t border-neutral-b4/50 mt-auto flex-none"
      }, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
        fullWidth: true,
        "data-sign": "save-button",
        disabled: disabled,
        loading: isSaving,
        onClick: function onClick() {
          return _this.onSaveCallLog();
        }
      }, t('save'))) : null;
    });
    return _this;
  }
  _inherits(CallLogFormView, _RcViewModule);
  return _createClass(CallLogFormView, [{
    key: "onUpdateCallLog",
    value: function () {
      var _onUpdateCallLog2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(newData) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._onUpdateCallLog(newData);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function onUpdateCallLog(_x) {
        return _onUpdateCallLog2.apply(this, arguments);
      }
      return onUpdateCallLog;
    }()
  }, {
    key: "onSaveCallLog",
    value: function () {
      var _onSaveCallLog2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._onSaveCallLog();
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function onSaveCallLog() {
        return _onSaveCallLog2.apply(this, arguments);
      }
      return onSaveCallLog;
    }()
  }, {
    key: "_onSaveCallLog",
    value: function _onSaveCallLog() {
      // should be override
    }
  }, {
    key: "_onUpdateCallLog",
    value: function _onUpdateCallLog(_newData) {
      // should be override
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var variant = _ref.variant;
      return {
        task: this.task,
        referenceFields: this.referenceFields,
        editSectionSchema: this.editSectionSchema,
        disabled: this.networkDisabled,
        variant: variant
      };
    }
  }, {
    key: "networkDisabled",
    get: function get() {
      return !this._connectivityMonitor.connectivity;
    }
  }, {
    key: "saveButtonDisabled",
    get: function get() {
      return false;
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_) {
      var _this2 = this;
      return {
        onUpdateCallLog: function onUpdateCallLog(newData) {
          return _this2.onUpdateCallLog(newData);
        }
      };
    }

    // should be override
  }, {
    key: "editSectionSchema",
    get: function get() {
      return {
        uiOrder: [],
        uiSchema: {},
        renderSchema: {}
      };
    }

    // should be override
  }, {
    key: "referenceFields",
    get: function get() {
      return {};
    }
  }, {
    key: "task",
    get: function get() {
      return {};
    }
  }, {
    key: "currentIdentify",
    get: function get() {
      var _this$_callAction$dis;
      return (_this$_callAction$dis = this._callAction.displayFormCall) === null || _this$_callAction$dis === void 0 ? void 0 : _this$_callAction$dis.sessionId;
    }
  }, {
    key: "currentLogState",
    get: function get() {
      var _this$_callLogTasks;
      return this.currentIdentify ? (_this$_callLogTasks = this._callLogTasks) === null || _this$_callLogTasks === void 0 ? void 0 : _this$_callLogTasks.callsMappingState[this.currentIdentify] : undefined;
    }
  }, {
    key: "getDisplayListLabel",
    value: function getDisplayListLabel(key) {
      return (0, _i18n2.t)(key);
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this,
        _this$_callLogFormVie;
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this3.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var Component = ((_this$_callLogFormVie = this._callLogFormViewOptions) === null || _this$_callLogFormVie === void 0 ? void 0 : _this$_callLogFormVie.component) || _CallLogFormPage.CallLogFormPage;
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _applyDecoratedDescriptor(_class2.prototype, "onUpdateCallLog", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "onUpdateCallLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onSaveCallLog", [_dec9, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "onSaveCallLog"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=CallLogForm.view.js.map
