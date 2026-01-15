"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.is-array.js");
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
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogSection = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _di = require("@ringcentral-integration/commons/lib/di");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor0;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
// TODO: seems that module should move to ringcentral-js-widgets/ringcentral-integration/modules
var CallLogSection = exports.CallLogSection = (_dec = (0, _di.Module)({
  deps: ['Storage', 'CallHistory', 'CallMonitor', {
    dep: 'CallLogSectionOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(_trackEvents.trackEvents.clickSaveLogSection), _dec3 = (0, _core.track)(_trackEvents.trackEvents.clickCloseLogNotification), _dec4 = (0, _core.computed)(function (that) {
  return [that.identifyList, that.callsMappingState];
}), _dec5 = (0, _core.computed)(function (that) {
  return [that.callsMappingState, that.callsSavingStatus];
}), _dec6 = (0, _core.computed)(function (that) {
  return [that.currentIdentify, that.callsMappingState];
}), _dec7 = (0, _core.computed)(function (that) {
  return [that.currentIdentify, that._deps.callHistory.calls, that._deps.callMonitor.calls];
}), _dec8 = (0, _core.computed)(function (that) {
  return [that.currentCall, that._deps.callMonitor.calls];
}), _dec9 = (0, _core.computed)(function (that) {
  return [that.currentNotificationIdentify, that._deps.callMonitor.calls, that._deps.callHistory.calls];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function CallLogSection(deps) {
    var _this$_deps$callLogSe;
    var _this;
    _classCallCheck(this, CallLogSection);
    _this = _callSuper(this, CallLogSection, [{
      deps: deps,
      storageKey: 'callLogSection',
      enableCache: true
    }]);
    _this._notSyncOpenState = void 0;
    _this._readyCheckFunction = void 0;
    _this._logFunction = void 0;
    _this._onSuccess = void 0;
    _this._onUpdate = void 0;
    _this._onError = void 0;
    // TODO: merge these states in callLogTasks.loggingmapping
    _initializerDefineProperty(_this, "callsSavingStatus", _descriptor, _this);
    _initializerDefineProperty(_this, "callsMappingState", _descriptor2, _this);
    _initializerDefineProperty(_this, "identifyList", _descriptor3, _this);
    _initializerDefineProperty(_this, "stateCurrentIdentify", _descriptor4, _this);
    _initializerDefineProperty(_this, "storageCurrentIdentify", _descriptor5, _this);
    _initializerDefineProperty(_this, "stateCurrentNotificationIdentify", _descriptor6, _this);
    _initializerDefineProperty(_this, "storageCurrentNotificationIdentify", _descriptor7, _this);
    _initializerDefineProperty(_this, "stateNotificationIsExpand", _descriptor8, _this);
    _initializerDefineProperty(_this, "storageNotificationIsExpand", _descriptor9, _this);
    _initializerDefineProperty(_this, "warmTransferActiveTelephonySessionId", _descriptor0, _this);
    _this._notSyncOpenState = !!((_this$_deps$callLogSe = _this._deps.callLogSectionOptions) === null || _this$_deps$callLogSe === void 0 ? void 0 : _this$_deps$callLogSe.notSyncOpenState);
    return _this;
  }
  _inherits(CallLogSection, _RcModuleV);
  return _createClass(CallLogSection, [{
    key: "_shouldInit",
    value: function _shouldInit() {
      var _this$_readyCheckFunc;
      return _superPropGet(CallLogSection, "_shouldInit", this, 3)([]) && !!((_this$_readyCheckFunc = this._readyCheckFunction) === null || _this$_readyCheckFunc === void 0 ? void 0 : _this$_readyCheckFunc.call(this));
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      var _this$_readyCheckFunc2;
      return _superPropGet(CallLogSection, "_shouldReset", this, 3)([]) || this.ready && !((_this$_readyCheckFunc2 = this._readyCheckFunction) === null || _this$_readyCheckFunc2 === void 0 ? void 0 : _this$_readyCheckFunc2.call(this));
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      // When there is an incoming call,
      // the page should be dismissed
      (0, _core.watch)(this, function () {
        return [_this2.currentCall, _this2.currentWarmTransferCall, _this2.warmTransferActiveTelephonySessionId];
      }, function () {
        var currentCall = _this2.currentCall,
          currentWarmTransferCall = _this2.currentWarmTransferCall,
          warmTransferActiveTelephonySessionId = _this2.warmTransferActiveTelephonySessionId;
        if (!currentCall || !currentWarmTransferCall) {
          if (_this2.warmTransferActiveTelephonySessionId) {
            _this2.setWarmTransferCallActiveId();
          }
          return;
        }
        var currentCallOnHold = (0, _callLogHelpers.isOnHold)(currentCall);
        var warmTransferCallOnHold = (0, _callLogHelpers.isOnHold)(currentWarmTransferCall);
        if (warmTransferCallOnHold && currentCallOnHold) {
          if (!warmTransferActiveTelephonySessionId) {
            _this2.setWarmTransferCallActiveId(currentCall.telephonySessionId);
          }
          return;
        }
        var activeCall = currentCallOnHold ? currentWarmTransferCall : currentCall;
        var telephonySessionId = activeCall.telephonySessionId;
        if (_this2.warmTransferActiveTelephonySessionId !== telephonySessionId) {
          _this2.setWarmTransferCallActiveId(telephonySessionId);
        }
      }, {
        multiple: true
      });
    }
  }, {
    key: "update",
    value: function update(identify, newValue, callsSavingStatus) {
      this.callsSavingStatus[identify] = callsSavingStatus;
      var originalState = this.callsMappingState[identify];
      this.callsMappingState[identify] = _objectSpread(_objectSpread({}, originalState), newValue);
      this.identifyList = Array.from(new Set([].concat(_toConsumableArray(this.identifyList), [identify])));
    }
  }, {
    key: "setWarmTransferCallActiveId",
    value: function setWarmTransferCallActiveId() {
      var telephonySessionId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.warmTransferActiveTelephonySessionId = telephonySessionId;
    }
  }, {
    key: "saveSuccess",
    value: function () {
      var _saveSuccess = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(identify) {
        var originalState;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              originalState = this.callsMappingState[identify];
              this.update(identify, {
                isSucceed: true,
                isEdited: !!((originalState === null || originalState === void 0 ? void 0 : originalState.latestUpdateTime) && (originalState === null || originalState === void 0 ? void 0 : originalState.latestSaveTime) && (originalState === null || originalState === void 0 ? void 0 : originalState.latestSaveTime) < (originalState === null || originalState === void 0 ? void 0 : originalState.latestUpdateTime))
              }, false);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function saveSuccess(_x) {
        return _saveSuccess.apply(this, arguments);
      }
      return saveSuccess;
    }()
  }, {
    key: "saving",
    value: function () {
      var _saving = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(identify) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this.update(identify, {
                latestSaveTime: Date.now()
              }, true);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function saving(_x2) {
        return _saving.apply(this, arguments);
      }
      return saving;
    }()
  }, {
    key: "markAsUnSaving",
    value: function () {
      var _markAsUnSaving = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(identify) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              this.update(identify, {}, false);
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function markAsUnSaving(_x3) {
        return _markAsUnSaving.apply(this, arguments);
      }
      return markAsUnSaving;
    }()
  }, {
    key: "saveError",
    value: function () {
      var _saveError = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(identify) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              this.update(identify, {
                isEdited: true,
                isSucceed: false
              }, false);
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function saveError(_x4) {
        return _saveError.apply(this, arguments);
      }
      return saveError;
    }() // TODO: add args type
  }, {
    key: "_handleSuccess",
    value: function () {
      var _handleSuccess2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(identify) {
        var _len,
          args,
          _key,
          _args5 = arguments;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              this.saveSuccess(identify);
              for (_len = _args5.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = _args5[_key];
              }
              if (typeof this._onSuccess === 'function') this._onSuccess.apply(this, [identify].concat(args));
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function _handleSuccess(_x5) {
        return _handleSuccess2.apply(this, arguments);
      }
      return _handleSuccess;
    }() // TODO: add args type
  }, {
    key: "_handleError",
    value: function () {
      var _handleError2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(identify) {
        var _len2,
          args,
          _key2,
          _args6 = arguments;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              this.saveError(identify);
              if (!(typeof this._onError === 'function')) {
                _context6.n = 1;
                break;
              }
              for (_len2 = _args6.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = _args6[_key2];
              }
              _context6.n = 1;
              return this._onError.apply(this, [identify].concat(args));
            case 1:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function _handleError(_x6) {
        return _handleError2.apply(this, arguments);
      }
      return _handleError;
    }()
  }, {
    key: "showLogSection",
    value: function () {
      var _showLogSection = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(identify) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              if (!this.show || identify !== this.currentIdentify) {
                this.setLogSectionIdentify(identify);
              }
            case 1:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function showLogSection(_x7) {
        return _showLogSection.apply(this, arguments);
      }
      return showLogSection;
    }()
  }, {
    key: "setLogSectionIdentify",
    value: function setLogSectionIdentify(identify) {
      if (this._notSyncOpenState) {
        this.stateCurrentIdentify = identify;
      } else {
        this.storageCurrentIdentify = identify;
      }
    }
  }, {
    key: "setLogNotificationIdentify",
    value: function setLogNotificationIdentify(identify) {
      if (this._notSyncOpenState) {
        this.stateCurrentNotificationIdentify = identify;
      } else {
        this.storageCurrentNotificationIdentify = identify;
      }
    }
  }, {
    key: "showLogNotification",
    value: function () {
      var _showLogNotification = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(identify) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              if (!this.showNotification || identify !== this.currentNotificationIdentify) {
                this.setLogNotificationIdentify(identify);
              }
            case 1:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function showLogNotification(_x8) {
        return _showLogNotification.apply(this, arguments);
      }
      return showLogNotification;
    }()
  }, {
    key: "addLogHandler",
    value: function addLogHandler(_ref) {
      var logFunction = _ref.logFunction,
        readyCheckFunction = _ref.readyCheckFunction,
        onUpdate = _ref.onUpdate,
        onSuccess = _ref.onSuccess,
        onError = _ref.onError;
      if (typeof logFunction !== 'function') {
        throw new Error('CallLogSection: "logFunction" must be a function.');
      }
      if (typeof readyCheckFunction !== 'function') {
        throw new Error('CallLogSection: "readyCheckFunction" must be a function.');
      }
      this._logFunction = logFunction;
      this._readyCheckFunction = readyCheckFunction;
      this._onUpdate = onUpdate;
      this._onSuccess = onSuccess;
      this._onError = onError;
    }

    // TODO: add args type
  }, {
    key: "updateCallLog",
    value: function () {
      var _updateCallLog = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(identify) {
        var _len3,
          args,
          _key3,
          _args9 = arguments;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              this.update(identify, {
                latestUpdateTime: Date.now(),
                isEdited: true
              }, this.callsSavingStatus[identify]);
              // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
              for (_len3 = _args9.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                args[_key3 - 1] = _args9[_key3];
              }
              _context9.n = 1;
              return this._onUpdate.apply(this, [identify].concat(args));
            case 1:
              return _context9.a(2);
          }
        }, _callee9, this);
      }));
      function updateCallLog(_x9) {
        return _updateCallLog.apply(this, arguments);
      }
      return updateCallLog;
    }() // TODO: add args type when implement call log ui
  }, {
    key: "saveCallLog",
    value: function () {
      var _saveCallLog = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(identify) {
        var _len4,
          args,
          _key4,
          result,
          _args0 = arguments,
          _t;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              if (!(identify && (!this.callsMapping[identify] || !this.callsMapping[identify].isSaving))) {
                _context0.n = 6;
                break;
              }
              this.saving(identify);
              for (_len4 = _args0.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                args[_key4 - 1] = _args0[_key4];
              }
              _context0.p = 1;
              _context0.n = 2;
              return this._logFunction.apply(this, [identify].concat(args));
            case 2:
              result = _context0.v;
              if (result) {
                _context0.n = 3;
                break;
              }
              throw new Error('Result is empty');
            case 3:
              this._handleSuccess(identify, _objectSpread(_objectSpread({}, args), {}, {
                result: result
              }));
              return _context0.a(2, result);
            case 4:
              _context0.p = 4;
              _t = _context0.v;
              _context0.n = 5;
              return this._handleError(identify, _objectSpread(_objectSpread({}, args), {}, {
                error: _t
              }));
            case 5:
              console.warn(_t);
            case 6:
              return _context0.a(2);
          }
        }, _callee0, this, [[1, 4]]);
      }));
      function saveCallLog(_x0) {
        return _saveCallLog.apply(this, arguments);
      }
      return saveCallLog;
    }()
  }, {
    key: "handleLogSection",
    value: function () {
      var _handleLogSection = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(identify) {
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              if (this.show) {
                _context1.n = 2;
                break;
              }
              _context1.n = 1;
              return this.showLogSection(identify);
            case 1:
              _context1.n = 3;
              break;
            case 2:
              if (!(!this.notificationIsExpand && this.currentIdentify !== identify)) {
                _context1.n = 3;
                break;
              }
              _context1.n = 3;
              return this.showLogNotification(identify);
            case 3:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      function handleLogSection(_x1) {
        return _handleLogSection.apply(this, arguments);
      }
      return handleLogSection;
    }()
  }, {
    key: "closeLogSection",
    value: function () {
      var _closeLogSection = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              if (this.show) {
                // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
                this.setLogSectionIdentify(null);
              }
            case 1:
              return _context10.a(2);
          }
        }, _callee10, this);
      }));
      function closeLogSection() {
        return _closeLogSection.apply(this, arguments);
      }
      return closeLogSection;
    }()
  }, {
    key: "discardAndHandleNotification",
    value: function () {
      var _discardAndHandleNotification = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(sessionId) {
        var currentNotificationIdentify;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              currentNotificationIdentify = sessionId || this.currentNotificationIdentify;
              _context11.n = 1;
              return this.closeLogNotification();
            case 1:
              _context11.n = 2;
              return this.closeLogSection();
            case 2:
              _context11.n = 3;
              return this.showLogSection(currentNotificationIdentify);
            case 3:
              return _context11.a(2);
          }
        }, _callee11, this);
      }));
      function discardAndHandleNotification(_x10) {
        return _discardAndHandleNotification.apply(this, arguments);
      }
      return discardAndHandleNotification;
    }()
  }, {
    key: "saveAndHandleNotification",
    value: function () {
      var _saveAndHandleNotification = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
        var currentNotificationIdentify, currentIdentify;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              currentNotificationIdentify = this.currentNotificationIdentify;
              currentIdentify = this.currentIdentify;
              _context12.n = 1;
              return this.saveCallLog(currentIdentify);
            case 1:
              _context12.n = 2;
              return this.closeLogNotification();
            case 2:
              _context12.n = 3;
              return this.closeLogSection();
            case 3:
              _context12.n = 4;
              return this.showLogSection(currentNotificationIdentify);
            case 4:
              return _context12.a(2);
          }
        }, _callee12, this);
      }));
      function saveAndHandleNotification() {
        return _saveAndHandleNotification.apply(this, arguments);
      }
      return saveAndHandleNotification;
    }()
  }, {
    key: "closeLogNotification",
    value: function () {
      var _closeLogNotification = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              if (this.showNotification) {
                // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
                this.setLogNotificationIdentify(null);
                this.setNotificationIsExpand(false);
              }
            case 1:
              return _context13.a(2);
          }
        }, _callee13, this);
      }));
      function closeLogNotification() {
        return _closeLogNotification.apply(this, arguments);
      }
      return closeLogNotification;
    }()
  }, {
    key: "setNotificationIsExpand",
    value: function setNotificationIsExpand(isExpand) {
      if (this._notSyncOpenState) {
        this.stateNotificationIsExpand = isExpand;
      } else {
        this.storageNotificationIsExpand = isExpand;
      }
    }

    // shrink the popover menu appear when click log button at call notificaiton
  }, {
    key: "shrinkNotification",
    value: function () {
      var _shrinkNotification = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              if (this.notificationIsExpand) {
                this.setNotificationIsExpand(false);
              }
            case 1:
              return _context14.a(2);
          }
        }, _callee14, this);
      }));
      function shrinkNotification() {
        return _shrinkNotification.apply(this, arguments);
      }
      return shrinkNotification;
    }()
  }, {
    key: "expandNotification",
    value: function () {
      var _expandNotification = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              if (!this.notificationIsExpand) {
                this.setNotificationIsExpand(true);
              }
            case 1:
              return _context15.a(2);
          }
        }, _callee15, this);
      }));
      function expandNotification() {
        return _expandNotification.apply(this, arguments);
      }
      return expandNotification;
    }()
  }, {
    key: "expandLogNotification",
    value: function () {
      var _expandLogNotification = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              if (this.show) {
                _context16.n = 2;
                break;
              }
              _context16.n = 1;
              return this.showLogSection(this.currentNotificationIdentify);
            case 1:
              _context16.n = 2;
              return this.closeLogNotification();
            case 2:
              _context16.n = 3;
              return this.expandNotification();
            case 3:
              return _context16.a(2);
          }
        }, _callee16, this);
      }));
      function expandLogNotification() {
        return _expandLogNotification.apply(this, arguments);
      }
      return expandLogNotification;
    }()
  }, {
    key: "calls",
    get: function get() {
      var _this3 = this;
      var calls = this.identifyList.map(function (identify) {
        return _this3.callsMappingState[identify];
      });
      return calls;
    }

    /**
     * Merge isSaving property from reducer to callsMapping
     */
  }, {
    key: "callsMapping",
    get: function get() {
      return (0, _ramda.converge)((0, _ramda.mergeWith)((0, _ramda.flip)((0, _ramda.assoc)('isSaving'))), [_ramda.identity,
      // eslint-disable-next-line react-hooks/rules-of-hooks
      (0, _ramda.useWith)(_ramda.pick, [_ramda.keys, _ramda.identity])])(this.callsMappingState, this.callsSavingStatus);
    }
  }, {
    key: "currentCallLogStatus",
    get: function get() {
      return this.callsMappingState[this.currentIdentify] || {};
    }
  }, {
    key: "currentCall",
    get: function get() {
      var _this4 = this;
      return [].concat(_toConsumableArray(this._deps.callMonitor.calls), _toConsumableArray(this._deps.callHistory.calls)).find(function (call) {
        return call.sessionId === _this4.currentIdentify;
      }) || {};
    }
  }, {
    key: "currentWarmTransferCall",
    get: function get() {
      var warmTransferInfo = this.currentCall.warmTransferInfo;
      if (warmTransferInfo === undefined) {
        return;
      }
      var relatedTelephonySessionId = warmTransferInfo.relatedTelephonySessionId;
      return _toConsumableArray(this._deps.callMonitor.calls).find(function (call) {
        return call.telephonySessionId === relatedTelephonySessionId;
      });
    }
  }, {
    key: "currentNotificationCall",
    get: function get() {
      var _this5 = this;
      return [].concat(_toConsumableArray(this._deps.callMonitor.calls), _toConsumableArray(this._deps.callHistory.calls)).find(function (call) {
        return call.sessionId === _this5.currentNotificationIdentify;
      }) || {};
    }
  }, {
    key: "currentIdentify",
    get: function get() {
      return this._notSyncOpenState ? this.stateCurrentIdentify : this.storageCurrentIdentify;
    }
  }, {
    key: "show",
    get: function get() {
      return !!this.currentIdentify;
    }
  }, {
    key: "currentNotificationIdentify",
    get: function get() {
      return this._notSyncOpenState ? this.stateCurrentNotificationIdentify : this.storageCurrentNotificationIdentify;
    }
  }, {
    key: "showNotification",
    get: function get() {
      return !!this.currentNotificationIdentify;
    }
  }, {
    key: "notificationIsExpand",
    get: function get() {
      return this._notSyncOpenState ? this.stateNotificationIsExpand : this.storageNotificationIsExpand;
    }
  }, {
    key: "currentCallSavingStatus",
    get: function get() {
      return this.callsSavingStatus[this.currentIdentify];
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "callsSavingStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "callsMappingState", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "identifyList", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "stateCurrentIdentify", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "storageCurrentIdentify", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "stateCurrentNotificationIdentify", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "storageCurrentNotificationIdentify", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "stateNotificationIsExpand", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "storageNotificationIsExpand", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor0 = _applyDecoratedDescriptor(_class2.prototype, "warmTransferActiveTelephonySessionId", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "update", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "update"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setWarmTransferCallActiveId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setWarmTransferCallActiveId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saveSuccess", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "saveSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saving", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "saving"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "markAsUnSaving", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "markAsUnSaving"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saveError", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "saveError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_handleSuccess", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_handleSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_handleError", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_handleError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showLogSection", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "showLogSection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLogSectionIdentify", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLogSectionIdentify"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLogNotificationIdentify", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLogNotificationIdentify"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showLogNotification", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "showLogNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateCallLog", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateCallLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saveCallLog", [_proxify.proxify, _dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "saveCallLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleLogSection", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "handleLogSection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "closeLogSection", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "closeLogSection"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "discardAndHandleNotification", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "discardAndHandleNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saveAndHandleNotification", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "saveAndHandleNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "closeLogNotification", [_proxify.proxify, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "closeLogNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setNotificationIsExpand", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setNotificationIsExpand"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shrinkNotification", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "shrinkNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "expandNotification", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "expandNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "expandLogNotification", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "expandLogNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "calls", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "calls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callsMapping", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "callsMapping"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentCallLogStatus", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "currentCallLogStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentCall", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "currentCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentWarmTransferCall", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "currentWarmTransferCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentNotificationCall", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "currentNotificationCall"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=CallLogSection.js.map
