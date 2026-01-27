"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogTasks = void 0;
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _services = require("@ringcentral-integration/micro-core/src/app/services");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _rxjs = require("rxjs");
var _Call = require("../Call");
var _CallHistory = require("../CallHistory");
var _CallMonitor = require("../CallMonitor");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _class, _class2, _descriptor, _descriptor2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var DEFAULT_ISSUE_TACKING_SETTINGS_URL = '/settings/issuesTracking';
var CallLogTasks = exports.CallLogTasks = (_dec = (0, _nextCore.injectable)({
  name: 'CallLogTasks'
}), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services.Toast === "undefined" ? Object : _services.Toast, typeof _services.ToastManager === "undefined" ? Object : _services.ToastManager, typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof _CallMonitor.CallMonitor === "undefined" ? Object : _CallMonitor.CallMonitor, typeof _CallHistory.CallHistory === "undefined" ? Object : _CallHistory.CallHistory, typeof DialerView === "undefined" ? Object : DialerView, typeof _Call.Call === "undefined" ? Object : _Call.Call, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager]), _dec4 = Reflect.metadata("design:type", typeof CallsMapping === "undefined" ? Object : CallsMapping), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [String, typeof Partial === "undefined" ? Object : Partial]), _dec7 = (0, _nextCore.delegate)('server'), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [String]), _dec0 = (0, _nextCore.delegate)('server'), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [String, void 0]), _dec11 = (0, _nextCore.delegate)('server'), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", [String]), _dec14 = (0, _nextCore.delegate)('server'), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", [String]), _dec17 = (0, _nextCore.delegate)('server'), _dec18 = Reflect.metadata("design:type", Function), _dec19 = Reflect.metadata("design:paramtypes", [String, void 0]), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", [Array]), _dec22 = Reflect.metadata("design:type", Function), _dec23 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function CallLogTasks(_router, _toast, _toastManager, _storage, _callMonitor, _callHistory, _dialerView, _call, _portManager) {
    var _this;
    _classCallCheck(this, CallLogTasks);
    _this = _callSuper(this, CallLogTasks);
    _this._router = _router;
    _this._toast = _toast;
    _this._toastManager = _toastManager;
    _this._storage = _storage;
    _this._callMonitor = _callMonitor;
    _this._callHistory = _callHistory;
    _this._dialerView = _dialerView;
    _this._call = _call;
    _this._portManager = _portManager;
    _this.uniqueManager = _this._toastManager.createUniqueManager();
    _initializerDefineProperty(_this, "callsMappingState", _descriptor, _this);
    _initializerDefineProperty(_this, "saveErrorToast", _descriptor2, _this);
    _this._outboundCallEntityIdMapping = {};
    _this._storage.enable(_this);
    if (_this._portManager.shared) {
      _this._portManager.onServer(function () {
        _this.bindC2DListeners();
      });
    } else {
      _this.bindC2DListeners();
    }
    return _this;
  }
  _inherits(CallLogTasks, _RcModule);
  return _createClass(CallLogTasks, [{
    key: "bindC2DListeners",
    value: function () {
      var _bindC2DListeners = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this2 = this;
        var newCallProcess$;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              newCallProcess$ = this._callMonitor.addListener('NewCall').pipe((0, _rxjs.tap)(function (call) {
                var identify = call.sessionId,
                  to = call.to;
                var outboundCall = (0, _callLogHelpers.isOutbound)(call);
                var toNumber = to === null || to === void 0 ? void 0 : to.phoneNumber;
                if (!identify) {
                  _this2.logger.error('sessionId is undefined');
                  return;
                }
                if (outboundCall) {
                  var isCallFromCurrentDevice = _this2._dialerView.isCallFromCurrentDevice(toNumber);
                  if (isCallFromCurrentDevice) {
                    var entity = _this2._call.lastRecipient;
                    _this2.logger.log('call from current device', entity);
                    if (entity && entity.resourceType === _this2.thirdPartyResourceType) {
                      _this2.setOutboundCallEntityIdMapping(identify, entity.id);
                    }
                  }
                }
                _this2.fetchAndUpdateTask(call);
              }), _nextCore.takeUntilAppDestroy);
              newCallProcess$.subscribe();
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function bindC2DListeners() {
        return _bindC2DListeners.apply(this, arguments);
      }
      return bindC2DListeners;
    }()
  }, {
    key: "fetchAndUpdateTask",
    value: function () {
      var _fetchAndUpdateTask = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(call) {
        var _fromHistory,
          _args2 = arguments;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _fromHistory = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
              if (process.env.NODE_ENV !== 'production') {
                this.logger.error('if you use CallLogTasks inside CRM project should override fetchAndUpdateTask method', call);
              }
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function fetchAndUpdateTask(_x) {
        return _fetchAndUpdateTask.apply(this, arguments);
      }
      return fetchAndUpdateTask;
    }()
  }, {
    key: "onInitOnce",
    value: function () {
      var _onInitOnce = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              this._cleanCache();
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function onInitOnce() {
        return _onInitOnce.apply(this, arguments);
      }
      return onInitOnce;
    }()
  }, {
    key: "update",
    value: function update(identify, newValue) {
      var originalState = this.callsMappingState[identify];
      this.callsMappingState[identify] = _objectSpread(_objectSpread({}, originalState), newValue);
    }
  }, {
    key: "updateCallLogState",
    value: function () {
      var _updateCallLogState = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(identify) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              this.update(identify, {
                latestUpdateTime: Date.now(),
                isEdited: true
              });
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function updateCallLogState(_x2) {
        return _updateCallLogState.apply(this, arguments);
      }
      return updateCallLogState;
    }()
  }, {
    key: "saveSuccess",
    value: function () {
      var _saveSuccess = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(identify) {
        var withAlert,
          originalState,
          _args5 = arguments;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              withAlert = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : true;
              if (withAlert) {
                this._toast.success({
                  message: (0, _i18n.t)('saveLogSucceed'),
                  allowDuplicates: false
                });
              }
              originalState = this.callsMappingState[identify];
              this.update(identify, {
                isSucceed: true,
                isEdited: !!(originalState && originalState.latestUpdateTime && originalState.latestSaveTime && originalState.latestSaveTime < originalState.latestUpdateTime),
                isSaving: false
              });
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function saveSuccess(_x3) {
        return _saveSuccess.apply(this, arguments);
      }
      return saveSuccess;
    }()
  }, {
    key: "saving",
    value: function () {
      var _saving = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(identify) {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              this.update(identify, {
                latestSaveTime: Date.now(),
                isSaving: true
              });
            case 1:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function saving(_x4) {
        return _saving.apply(this, arguments);
      }
      return saving;
    }()
  }, {
    key: "markAsUnSaving",
    value: function () {
      var _markAsUnSaving = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(identify) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              this.update(identify, {
                isSaving: false
              });
            case 1:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function markAsUnSaving(_x5) {
        return _markAsUnSaving.apply(this, arguments);
      }
      return markAsUnSaving;
    }()
  }, {
    key: "saveError",
    value: function () {
      var _saveError = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(identify) {
        var _this3 = this;
        var withoutToast,
          _args8 = arguments;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              withoutToast = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : false;
              this.update(identify, {
                isEdited: true,
                isSucceed: false,
                isSaving: false
              });
              if (!withoutToast) {
                this.uniqueManager.unique(function () {
                  return _this3._toast.open(_this3.saveErrorToast);
                }, 'keep');
              }
            case 1:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function saveError(_x6) {
        return _saveError.apply(this, arguments);
      }
      return saveError;
    }()
  }, {
    key: "openTask",
    value: function () {
      var _openTask = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(_call) {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              return _context9.a(2);
          }
        }, _callee9);
      }));
      function openTask(_x7) {
        return _openTask.apply(this, arguments);
      }
      return openTask;
    }()
  }, {
    key: "setOutboundCallEntityIdMapping",
    value: function setOutboundCallEntityIdMapping(sessionId, entityId) {
      this._outboundCallEntityIdMapping[sessionId] = entityId;
    }
  }, {
    key: "deleteTask",
    value: function deleteTask(ids) {
      var _this4 = this;
      ids.forEach(function (id) {
        delete _this4.callsMappingState[id];
      });
    }

    /**
     * when app refresh, clean the expired data in the taskIds
     *
     * the expired means the data is not in the call history or call monitor
     */
  }, {
    key: "_cleanCache",
    value: function _cleanCache() {
      var _this5 = this;
      var expiredTaskIds = [];

      // only keep the data that will be show in our app
      this.taskIds.forEach(function (taskId) {
        if (!_this5._callHistory.getCallBySessionId(taskId)) {
          expiredTaskIds.push(taskId);
        }
      });
      this.deleteTask(expiredTaskIds);
    }
  }, {
    key: "taskIds",
    get: function get() {
      return [];
    }
  }, {
    key: "thirdPartyResourceType",
    get: function get() {
      return '';
    }
  }, {
    key: "loggedMap",
    get: function get() {
      var _this6 = this;
      return Object.keys(this.callsMappingState).reduce(function (acc, key) {
        acc[key] = _this6.callsMappingState[key].isSucceed;
        return acc;
      }, {});
    }
  }, {
    key: "callSelectionMap",
    get: function get() {
      return {};
    }
  }, {
    key: "getIsEditFromIdentify",
    value: function getIsEditFromIdentify(identify) {
      var _this$callsMappingSta;
      return (_this$callsMappingSta = this.callsMappingState[identify]) === null || _this$callsMappingSta === void 0 ? void 0 : _this$callsMappingSta.isEdited;
    }
  }, {
    key: "getIsLoggedFromIdentify",
    value: function getIsLoggedFromIdentify(identify) {
      var _this$callsMappingSta2;
      return (_this$callsMappingSta2 = this.callsMappingState[identify]) === null || _this$callsMappingSta2 === void 0 ? void 0 : _this$callsMappingSta2.isSucceed;
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "callsMappingState", [_nextCore.userStorage, _nextCore.state, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "update", [_nextCore.action, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "update"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateCallLogState", [_dec7, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "updateCallLogState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saveSuccess", [_dec0, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "saveSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saving", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "saving"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "markAsUnSaving", [_dec14, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "markAsUnSaving"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "saveErrorToast", [_nextCore.portal], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this7 = this;
    return this._toast.create({
      view: function view() {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        var _useToastItemView = (0, _views.useToastItemView)(),
          action = _useToastItemView.action;
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, (0, _i18n.t)('saveError'), /*#__PURE__*/_react["default"].createElement(_springUi.Link, {
          onClick: function onClick() {
            _this7._router.push(DEFAULT_ISSUE_TACKING_SETTINGS_URL);
            action === null || action === void 0 ? void 0 : action.close();
          }
        }, ' ', (0, _i18n.t)('reportIssue')));
      },
      props: function props() {
        return {
          level: 'danger',
          ttl: 0
        };
      }
    });
  }
}), _applyDecoratedDescriptor(_class2.prototype, "saveError", [_dec17, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "saveError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteTask", [_nextCore.action, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteTask"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loggedMap", [_nextCore.computed, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "loggedMap"), _class2.prototype), _class2)) || _class) || _class) || _class);
//# sourceMappingURL=CallLogTasks.js.map
