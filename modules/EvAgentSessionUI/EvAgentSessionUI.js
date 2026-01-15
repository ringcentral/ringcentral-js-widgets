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
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
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
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvAgentSessionUI = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.includes.js");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _enums = require("../../enums");
var _sortByName = require("../../lib/sortByName");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
var EvAgentSessionUI = exports.EvAgentSessionUI = (_dec = (0, _di.Module)({
  name: 'EvAgentSessionUI',
  deps: ['Locale', 'RouterInteraction', 'EvAuth', 'EvAgentSession', 'EvSettings', 'EvWorkingState', 'Storage', 'ModalUI', 'EvCallMonitor', 'Block', 'EvClient', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'EvAgentSessionUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.locale.currentLocale, that._deps.evAgentSession.inboundQueues, that._deps.evAgentSession.formGroup.selectedInboundQueueIds];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that._deps.evAgentSession.formGroup.selectedInboundQueueIds, that._deps.evAgentSession.inboundQueues];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that._deps.evAuth.authenticateResponse.agents, that._deps.evAuth.agentId];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  function EvAgentSessionUI(deps) {
    var _this;
    _classCallCheck(this, EvAgentSessionUI);
    _this = _callSuper(this, EvAgentSessionUI, [{
      deps: deps,
      enableCache: true,
      storageKey: 'EvAgentSessionUI'
    }]);
    _initializerDefineProperty(_this, "isLoading", _descriptor, _this);
    return _this;
  }
  _inherits(EvAgentSessionUI, _RcUIModuleV);
  return _createClass(EvAgentSessionUI, [{
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this$_deps$tabManage;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!(this.ready && this._deps.tabManager.ready && ((_this$_deps$tabManage = this._deps.tabManager) === null || _this$_deps$tabManage === void 0 ? void 0 : _this$_deps$tabManage.enable))) {
                _context.n = 1;
                break;
              }
              _context.n = 1;
              return this._checkTabManagerEvent();
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }
      return onStateChange;
    }()
  }, {
    key: "_checkTabManagerEvent",
    value: function () {
      var _checkTabManagerEvent2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var event, _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              event = this._deps.tabManager.event;
              if (!event) {
                _context2.n = 4;
                break;
              }
              _t = event.name;
              _context2.n = _t === _enums.tabManagerEvents.RE_CHOOSE_ACCOUNT ? 1 : 3;
              break;
            case 1:
              _context2.n = 2;
              return this._onAccountReChoose();
            case 2:
              return _context2.a(3, 4);
            case 3:
              return _context2.a(3, 4);
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function _checkTabManagerEvent() {
        return _checkTabManagerEvent2.apply(this, arguments);
      }
      return _checkTabManagerEvent;
    }()
  }, {
    key: "inboundQueuesFieldText",
    get: function get() {
      var selectedInboundQueueIds = this._deps.evAgentSession.formGroup.selectedInboundQueueIds;
      var inboundQueues = this._deps.evAgentSession.inboundQueues;
      var currentLocale = this._deps.locale.currentLocale;
      if (selectedInboundQueueIds.length === 1) {
        var selectedInboundQueue = inboundQueues.find(function (inboundQueue) {
          return inboundQueue.gateId === selectedInboundQueueIds[0];
        });
        return selectedInboundQueue.gateName;
      }
      if (selectedInboundQueueIds.length > 1) {
        return "".concat(_i18n["default"].getString('multiple', currentLocale), " (").concat(selectedInboundQueueIds.length, ")");
      }
      return _i18n["default"].getString(_enums.dropDownOptions.None, currentLocale);
    }
  }, {
    key: "setIsLoading",
    value: function setIsLoading(isLoading) {
      this.isLoading = isLoading;
    }
  }, {
    key: "onInit",
    value: function onInit() {
      this.setIsLoading(false);
    }
  }, {
    key: "setConfigure",
    value: function () {
      var _setConfigure = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var _this2 = this;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this._deps.block.next(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
                var _t2;
                return _regenerator().w(function (_context3) {
                  while (1) switch (_context3.p = _context3.n) {
                    case 0:
                      _this2.setIsLoading(true);
                      _context3.p = 1;
                      _context3.n = 2;
                      return _this2._deps.evAgentSession.configureAgent({
                        needAssignFormGroupValue: true
                      });
                    case 2:
                      _context3.n = 4;
                      break;
                    case 3:
                      _context3.p = 3;
                      _t2 = _context3.v;
                      console.error(_t2);
                    case 4:
                      _context3.p = 4;
                      _this2.setIsLoading(false);
                      return _context3.f(4);
                    case 5:
                      return _context3.a(2);
                  }
                }, _callee3, null, [[1, 3, 4, 5]]);
              })));
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function setConfigure() {
        return _setConfigure.apply(this, arguments);
      }
      return setConfigure;
    }()
  }, {
    key: "showSaveEditionModal",
    value: function showSaveEditionModal() {
      var _this3 = this;
      var currentLocale = this._deps.locale.currentLocale;
      this._deps.modalUI.confirm({
        title: _i18n["default"].getString('saveEditionModalTitle', currentLocale),
        content: _i18n["default"].getString('saveEditionModalContent', currentLocale),
        confirmButtonText: _i18n["default"].getString('save', currentLocale),
        cancelButtonText: _i18n["default"].getString('cancel', currentLocale),
        childrenSize: 'small',
        onConfirm: function onConfirm() {
          _this3.onSaveUpdate();
        },
        onCancel: function onCancel() {
          _this3._deps.evAgentSession.resetFormGroup();
          _this3._deps.evAgentSession.goToSettingsPage();
        }
      });
    }
  }, {
    key: "goToSettingsPageWhetherSessionChanged",
    value: function goToSettingsPageWhetherSessionChanged() {
      if (this._deps.evAgentSession.isSessionChanged) {
        return this.showSaveEditionModal();
      }
      this._deps.evAgentSession.goToSettingsPage();
    }
  }, {
    key: "onSaveUpdate",
    value: function () {
      var _onSaveUpdate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              if (this._deps.evAgentSession.isSessionChanged) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2, this._deps.evAgentSession.goToSettingsPage());
            case 1:
              _context5.n = 2;
              return this._deps.evAgentSession.updateAgent(this.voiceConnectionChanged);
            case 2:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function onSaveUpdate() {
        return _onSaveUpdate.apply(this, arguments);
      }
      return onSaveUpdate;
    }() // InboundQueue Panel
  }, {
    key: "inboundQueues",
    get: function get() {
      var _this$_deps$evAgentSe = this._deps.evAgentSession,
        inboundQueues = _this$_deps$evAgentSe.inboundQueues,
        selectedInboundQueueIds = _this$_deps$evAgentSe.formGroup.selectedInboundQueueIds;
      return (0, _sortByName.sortByName)(inboundQueues.map(function (inboundQueue) {
        return _objectSpread(_objectSpread({}, inboundQueue), {}, {
          checked: !!selectedInboundQueueIds.find(function (id) {
            return id === inboundQueue.gateId;
          })
        });
      }), 'gateName');
    }
  }, {
    key: "_checkBoxOnChange",
    value: function _checkBoxOnChange(gateId, inboundQueuesState, setInboundQueuesState) {
      var inboundQueues = _toConsumableArray(inboundQueuesState);
      var index = inboundQueues.findIndex(function (option) {
        return option.gateId === gateId;
      });
      var selectedInboundQueue = inboundQueues[index];
      inboundQueues[index] = _objectSpread(_objectSpread({}, selectedInboundQueue), {}, {
        checked: !selectedInboundQueue.checked
      });
      setInboundQueuesState(inboundQueues);
    }
  }, {
    key: "_allCheckBoxOnChange",
    value: function _allCheckBoxOnChange(severalAssign, inboundQueuesState, setInboundQueuesState) {
      var inboundQueues = _toConsumableArray(inboundQueuesState).map(function (option) {
        return _objectSpread(_objectSpread({}, option), {}, {
          // new object
          checked: severalAssign || !option.checked
        });
      });
      setInboundQueuesState(inboundQueues);
    }
  }, {
    key: "goBack",
    value: function goBack() {
      this._deps.routerInteraction.goBack();
    }
  }, {
    key: "submitInboundQueues",
    value: function submitInboundQueues(queues, cb) {
      var selectedInboundQueueIds = queues.map(function (inboundQueue) {
        return inboundQueue.gateId;
      });
      this._deps.evAgentSession.setFormGroup({
        selectedInboundQueueIds: selectedInboundQueueIds
      });
      cb();
    }
  }, {
    key: "selectedIntegratedSoftphone",
    get: function get() {
      return this._deps.evAgentSession.formGroup.loginType === _enums.loginTypes.integratedSoftphone;
    }
  }, {
    key: "voiceConnectionChanged",
    get: function get() {
      return this._deps.evAgentSession.loginType !== this._deps.evAgentSession.formGroup.loginType;
    }
  }, {
    key: "setLoginType",
    value: function setLoginType(loginType) {
      // set login type first, and reset autoAnswer after login type changed
      this._deps.evAgentSession.setFormGroup({
        loginType: loginType
      });
      var autoAnswer = this.selectedIntegratedSoftphone ? this._deps.evAgentSession.autoAnswer : this._deps.evAgentSession.defaultAutoAnswerOn;
      this._deps.evAgentSession.setFormGroup({
        autoAnswer: autoAnswer
      });
    }
  }, {
    key: "_onAccountReChoose",
    value: function () {
      var _onAccountReChoose2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var _this4 = this;
        var syncAllTabs,
          _args7 = arguments;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              syncAllTabs = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : false;
              console.log('_onAccountReChoose~~', syncAllTabs);
              _context7.n = 1;
              return this._deps.block.next(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
                return _regenerator().w(function (_context6) {
                  while (1) switch (_context6.n) {
                    case 0:
                      if (syncAllTabs && _this4._deps.tabManager.hasMultipleTabs) {
                        _this4._deps.tabManager.send(_enums.tabManagerEvents.RE_CHOOSE_ACCOUNT);
                      }
                      if (_this4._deps.evClient.ifSocketExist) {
                        _this4._deps.evClient.closeSocket();
                      }
                      _this4._deps.evAuth.setNotAuth();
                      _this4._deps.evAuth.clearAgentId();
                      _this4._deps.routerInteraction.push('/chooseAccount');
                    case 1:
                      return _context6.a(2);
                  }
                }, _callee6);
              })));
            case 1:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function _onAccountReChoose() {
        return _onAccountReChoose2.apply(this, arguments);
      }
      return _onAccountReChoose;
    }()
  }, {
    key: "_selectedAgent",
    get: function get() {
      var _this5 = this;
      var agents = this._deps.evAuth.authenticateResponse.agents;
      return agents.find(function (agent) {
        return agent.agentId === _this5._deps.evAuth.agentId;
      });
    }
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      var _this$_deps$evAgentSe2 = this._deps.evAgentSession,
        skillProfileList = _this$_deps$evAgentSe2.skillProfileList,
        loginTypeList = _this$_deps$evAgentSe2.loginTypeList,
        isExternalPhone = _this$_deps$evAgentSe2.isExternalPhone;
      var _this$_deps$evAuth$ag = this._deps.evAuth.agentPermissions,
        allowAutoAnswer = _this$_deps$evAuth$ag.allowAutoAnswer,
        allowLoginControl = _this$_deps$evAuth$ag.allowLoginControl,
        allowInbound = _this$_deps$evAuth$ag.allowInbound;
      var _this$_deps$evAgentSe3 = this._deps.evAgentSession.formGroup,
        selectedSkillProfileId = _this$_deps$evAgentSe3.selectedSkillProfileId,
        loginType = _this$_deps$evAgentSe3.loginType,
        extensionNumber = _this$_deps$evAgentSe3.extensionNumber,
        autoAnswer = _this$_deps$evAgentSe3.autoAnswer;
      return {
        selectedSkillProfileId: selectedSkillProfileId,
        loginType: loginType,
        extensionNumber: extensionNumber,
        inboundQueuesFieldText: this.inboundQueuesFieldText,
        // takingCall,
        autoAnswer: autoAnswer,
        skillProfileList: skillProfileList,
        loginTypeList: loginTypeList,
        isExtensionNumber: isExternalPhone,
        isLoading: this.isLoading,
        currentLocale: this._deps.locale.currentLocale,
        // InboundQueue Panel
        inboundQueues: this.inboundQueues,
        showAutoAnswer: allowAutoAnswer && this.selectedIntegratedSoftphone,
        showInboundQueues: allowLoginControl && allowInbound,
        showSkillProfile: allowLoginControl && skillProfileList.length > 0,
        selectedAgent: this._selectedAgent,
        showReChooseAccount: !this._deps.evAuth.isOnlyOneAgent
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this6 = this;
      return {
        setSkillProfileId: function setSkillProfileId(selectedSkillProfileId) {
          return _this6._deps.evAgentSession.setFormGroup({
            selectedSkillProfileId: selectedSkillProfileId
          });
        },
        setLoginType: function setLoginType(loginType) {
          return _this6.setLoginType(loginType);
        },
        setExtensionNumber: function setExtensionNumber(extensionNumber) {
          return _this6._deps.evAgentSession.setFormGroup({
            extensionNumber: extensionNumber
          });
        },
        setAutoAnswer: function setAutoAnswer(autoAnswer) {
          return _this6._deps.evAgentSession.setFormGroup({
            autoAnswer: autoAnswer
          });
        },
        submitInboundQueues: function submitInboundQueues(queues, cb) {
          return _this6.submitInboundQueues(queues, cb);
        },
        // setTakingCall: (takingCall) =>
        //   this._deps.evAgentSession.setTakingCall(takingCall),
        setConfigure: function setConfigure() {
          return _this6.setConfigure();
        },
        goToSettingsPage: function goToSettingsPage() {
          return _this6._deps.evAgentSession.goToSettingsPage();
        },
        goToSettingsPageWhetherSessionChanged: function goToSettingsPageWhetherSessionChanged() {
          return _this6.goToSettingsPageWhetherSessionChanged();
        },
        onSaveUpdate: function onSaveUpdate() {
          return _this6.onSaveUpdate();
        },
        // InboundQueue Panel
        searchOption: function searchOption(option, text) {
          var _option$gateName;
          return option === null || option === void 0 ? void 0 : (_option$gateName = option.gateName) === null || _option$gateName === void 0 ? void 0 : _option$gateName.toLowerCase().includes(text.toLowerCase());
        },
        goBack: function goBack() {
          return _this6.goBack();
        },
        getAssignedInboundQueues: function getAssignedInboundQueues(inboundQueues) {
          return inboundQueues.filter(function (_ref3) {
            var checked = _ref3.checked;
            return checked;
          });
        },
        isAllAssign: function isAllAssign(assignedInboundQueues, inboundQueues) {
          return !!assignedInboundQueues.length && assignedInboundQueues.length === inboundQueues.length;
        },
        isSeveralAssign: function isSeveralAssign(assignedInboundQueues, inboundQueues) {
          return !!assignedInboundQueues.length && assignedInboundQueues.length !== inboundQueues.length;
        },
        checkBoxOnChange: function checkBoxOnChange() {
          return _this6._checkBoxOnChange.apply(_this6, arguments);
        },
        allCheckBoxOnChange: function allCheckBoxOnChange() {
          return _this6._allCheckBoxOnChange.apply(_this6, arguments);
        },
        onAccountReChoose: function onAccountReChoose() {
          return _this6._onAccountReChoose(true);
        }
      };
    }
  }]);
}(_core.RcUIModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "isLoading", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "inboundQueuesFieldText", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "inboundQueuesFieldText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setIsLoading", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsLoading"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "inboundQueues", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "inboundQueues"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_selectedAgent", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "_selectedAgent"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=EvAgentSessionUI.js.map
