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
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvTransferCallUI = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.split.js");
require("core-js/modules/es.string.trim.js");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _transferTypes = require("../../enums/transferTypes");
var _i18n = _interopRequireDefault(require("./i18n"));
var _util = require("./util");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
var EvTransferCallUI = exports.EvTransferCallUI = (_dec = (0, _di.Module)({
  name: 'EvTransferCallUI',
  deps: ['RouterInteraction', 'Locale', 'EvCall', 'EvTransferCall', 'EvAuth', 'Environment', 'EvRequeueCall', {
    dep: 'EvTransferCallUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.evAuth.agent.agentConfig.inboundSettings.availableRequeueQueues, that._deps.evRequeueCall.selectedQueueGroupId, that.routerQueueGroupId];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.selectedQueueGroup, that._deps.evRequeueCall.selectedGateId];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that._deps.locale.currentLocale, that._deps.evRequeueCall.selectedQueueGroupId, that._deps.evRequeueCall.allowRequeueCall, that._deps.evTransferCall.allowTransferCall, that.evTransferCall.allowInternalTransfer, that.selectedCallRecipient, that.selectedQueueGroup, that.selectedGate, that.callId, that.selectQueueGroupDisabled, that.disabled];
}), _dec5 = (0, _core.computed)(function (that) {
  return [that.evTransferCall.transferType, that.evTransferCall.transferAgentList, that.evTransferCall.transferAgentId, that.evTransferCall.transferPhoneBook, that.evTransferCall.transferPhoneBookSelectedIndex, that.evTransferCall.transferRecipientNumber, that.evTransferCall.transferRecipientCountryId, that._deps.evAuth.availableCountries];
}), _dec6 = (0, _core.computed)(function (that) {
  return [that.isQueueTransfer, that._deps.evCall.currentCall, that.selectedCallRecipient, that.evTransferCall.transferring, that.requeueCallDisabled];
}), _dec7 = (0, _core.computed)(function (that) {
  return [that.transferOptions, that.evTransferCall.transferType];
}), _dec8 = (0, _core.computed)(function (that) {
  return [that.isQueueTransfer, that._deps.evRequeueCall.stayOnCall, that.evTransferCall.stayOnCall];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  function EvTransferCallUI(deps) {
    var _this;
    _classCallCheck(this, EvTransferCallUI);
    _this = _callSuper(this, EvTransferCallUI, [{
      deps: deps
    }]);
    _this.routerQueueGroupId = void 0;
    _this.goToActivityCallLogPage = function () {
      _this._deps.routerInteraction.push("/activityCallLog/".concat(_this.callId));
    };
    _this.goToRequeueCallPage = function () {
      _this._redirectRequeueCall();
    };
    _this.goToRequeueGroupPage = function () {
      if (_this.selectQueueGroupDisabled) return;
      _this._redirectRequeueCall("/queueGroup");
    };
    _this.goToRequeueGroupDetailPage = function (_ref) {
      var groupId = _ref.groupId,
        isCheckDisable = _ref.isCheckDisable;
      if (isCheckDisable && _this.disabled) return;
      _this._redirectRequeueCall("/queueGroup/".concat(groupId));
    };
    _this.evTransferCall.onTransferSuccess(function () {
      if (/^\/activityCallLog\/.+\/transferCall$/.test(_this._deps.routerInteraction.currentPath)) {
        _this.goToActivityCallLogPage();
      }
    });
    return _this;
  }
  _inherits(EvTransferCallUI, _RcUIModuleV);
  return _createClass(EvTransferCallUI, [{
    key: "selectQueueGroupDisabled",
    get: function get() {
      return !this._deps.evAuth.agentPermissions.allowCrossQueueRequeue;
    }
  }, {
    key: "disabled",
    get: function get() {
      return !(this._deps.evRequeueCall.selectedQueueGroupId && this._deps.evAuth.agentPermissions.allowCrossQueueRequeue);
    }
  }, {
    key: "requeueCallDisabled",
    get: function get() {
      var _this$_deps$evCall$cu;
      return this._deps.evRequeueCall.requeuing || !this._deps.evRequeueCall.selectedGateId || !!((_this$_deps$evCall$cu = this._deps.evCall.currentCall) === null || _this$_deps$evCall$cu === void 0 ? void 0 : _this$_deps$evCall$cu.endedCall);
    }
  }, {
    key: "selectedQueueGroup",
    get: function get() {
      var queueGroupId = this.routerQueueGroupId || this._deps.evRequeueCall.selectedQueueGroupId;
      var availableRequeueQueues = this._deps.evAuth.agent.agentConfig.inboundSettings.availableRequeueQueues;
      if (queueGroupId && availableRequeueQueues && availableRequeueQueues.length > 0) {
        return availableRequeueQueues.find(function (queue) {
          return queue.gateGroupId === queueGroupId;
        });
      }
      return null;
    }
  }, {
    key: "selectedGate",
    get: function get() {
      var selectedGateId = this._deps.evRequeueCall.selectedGateId;
      if (this.selectedQueueGroup && selectedGateId) {
        var gates = this.selectedQueueGroup.gates;
        if (gates && gates.length > 0) {
          return gates.find(function (queue) {
            return queue.gateId === selectedGateId;
          });
        }
      }
      return null;
    }
  }, {
    key: "_redirectRequeueCall",
    value: function _redirectRequeueCall() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this._deps.routerInteraction.push("/activityCallLog/".concat(this.callId, "/transferCall").concat(url));
    }
  }, {
    key: "_searchQueue",
    value: function _searchQueue(fromText, text) {
      return fromText === null || fromText === void 0 ? void 0 : fromText.toLowerCase().includes(text.toLowerCase());
    }
  }, {
    key: "_submitSelection",
    value: function _submitSelection(queueId) {
      this._deps.evRequeueCall.setStatus({
        selectedQueueGroupId: this.routerQueueGroupId,
        selectedGateId: queueId
      });
      this.goToRequeueCallPage();
    }
  }, {
    key: "_submitRequeueCall",
    value: function () {
      var _submitRequeueCall2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (this.requeueCallDisabled) {
                _context.n = 2;
                break;
              }
              _context.n = 1;
              return this._deps.evRequeueCall.requeueCall();
            case 1:
              this.goToActivityCallLogPage();
            case 2:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function _submitRequeueCall() {
        return _submitRequeueCall2.apply(this, arguments);
      }
      return _submitRequeueCall;
    }()
  }, {
    key: "callId",
    get: function get() {
      return this._deps.evCall.activityCallId;
    }
  }, {
    key: "evTransferCall",
    get: function get() {
      return this._deps.evTransferCall;
    }
  }, {
    key: "transferOptions",
    get: function get() {
      var _this$selectedQueueGr, _this$selectedGate;
      var number = this.evTransferCall.getNumber() || '';
      var currentRouteUrl = "/activityCallLog/".concat(this.callId, "/transferCall");
      var currentLocale = this._deps.locale.currentLocale;
      return [].concat(_toConsumableArray(this._deps.evTransferCall.allowTransferCall && this.evTransferCall.allowInternalTransfer ? [{
        type: _transferTypes.transferTypes.internal,
        label: _i18n["default"].getString(_transferTypes.transferTypes.internal, currentLocale),
        textFields: [{
          router: "".concat(currentRouteUrl, "/internal"),
          label: _i18n["default"].getString('callRecipientName', currentLocale),
          placeholder: _i18n["default"].getString('callRecipientNamePlaceholder', currentLocale),
          value: this.selectedCallRecipient
        }]
      }] : []), _toConsumableArray(this._deps.evTransferCall.allowTransferCall ? [{
        type: _transferTypes.transferTypes.phoneBook,
        label: _i18n["default"].getString(_transferTypes.transferTypes.phoneBook, currentLocale),
        textFields: [{
          router: "".concat(currentRouteUrl, "/phoneBook"),
          label: _i18n["default"].getString('callRecipientName', currentLocale),
          placeholder: _i18n["default"].getString('callRecipientNamePlaceholder', currentLocale),
          value: this.selectedCallRecipient
        }, {
          label: _i18n["default"].getString('callRecipientNumber', currentLocale),
          placeholder: _i18n["default"].getString('callRecipientNumberPlaceholder', currentLocale),
          value: number,
          readonly: true
        }]
      }] : []), _toConsumableArray(this._deps.evRequeueCall.allowRequeueCall ? [{
        type: _transferTypes.transferTypes.queue,
        label: _i18n["default"].getString(_transferTypes.transferTypes.queue, currentLocale),
        textFields: [{
          router: "".concat(currentRouteUrl, "/queueGroup"),
          label: _i18n["default"].getString('queueGroup', currentLocale),
          placeholder: _i18n["default"].getString('callRecipientNamePlaceholder', currentLocale),
          value: (_this$selectedQueueGr = this.selectedQueueGroup) === null || _this$selectedQueueGr === void 0 ? void 0 : _this$selectedQueueGr.groupName,
          disabled: this.selectQueueGroupDisabled,
          readonly: this.selectQueueGroupDisabled
        }, {
          router: "".concat(currentRouteUrl, "/queueGroup/").concat(this._deps.evRequeueCall.selectedQueueGroupId),
          label: _i18n["default"].getString('queueDetail', currentLocale),
          placeholder: _i18n["default"].getString('callRecipientNamePlaceholder', currentLocale),
          value: (_this$selectedGate = this.selectedGate) === null || _this$selectedGate === void 0 ? void 0 : _this$selectedGate.gateName,
          disabled: this.disabled,
          readonly: this.disabled
        }]
      }] : []), _toConsumableArray(this._deps.evTransferCall.allowTransferCall ? [{
        type: _transferTypes.transferTypes.manualEntry,
        label: _i18n["default"].getString(_transferTypes.transferTypes.manualEntry, currentLocale),
        textFields: [{
          router: "".concat(currentRouteUrl, "/manualEntry"),
          label: _i18n["default"].getString('phoneNumber', currentLocale),
          placeholder: _i18n["default"].getString('enterThePhoneNumberPlaceholder', currentLocale),
          value: this.selectedCallRecipient
        }]
      }] : []));
    }
  }, {
    key: "isQueueTransfer",
    get: function get() {
      return this.evTransferCall.transferType === _transferTypes.transferTypes.queue;
    }
  }, {
    key: "selectedCallRecipient",
    get: function get() {
      var _this$evTransferCall = this.evTransferCall,
        transferType = _this$evTransferCall.transferType,
        transferAgentList = _this$evTransferCall.transferAgentList,
        transferAgentId = _this$evTransferCall.transferAgentId,
        transferPhoneBook = _this$evTransferCall.transferPhoneBook,
        transferPhoneBookSelectedIndex = _this$evTransferCall.transferPhoneBookSelectedIndex,
        transferRecipientNumber = _this$evTransferCall.transferRecipientNumber,
        transferRecipientCountryId = _this$evTransferCall.transferRecipientCountryId;
      var availableCountries = this._deps.evAuth.availableCountries;
      if (transferType === _transferTypes.transferTypes.internal && transferAgentId) {
        var selectedAgent = transferAgentList.find(function (_ref2) {
          var agentId = _ref2.agentId;
          return agentId === transferAgentId;
        });
        return selectedAgent ? (0, _util.getInternalTransferName)(selectedAgent) : '';
      }
      if (transferType === _transferTypes.transferTypes.phoneBook && typeof transferPhoneBookSelectedIndex !== 'undefined' && transferPhoneBookSelectedIndex !== null) {
        var phoneBook = transferPhoneBook[transferPhoneBookSelectedIndex];
        if (phoneBook.countryId === 'USA') {
          return phoneBook.name;
        }
        var country = availableCountries.find(function (_ref3) {
          var countryId = _ref3.countryId;
          return countryId === phoneBook.countryId;
        });
        if (country) {
          return "".concat(phoneBook.name, " (").concat(country.countryName || country.countryId, ")");
        }
        return "".concat(phoneBook.name, " (").concat(phoneBook.countryId, ")");
      }
      if (transferType === _transferTypes.transferTypes.manualEntry && transferRecipientNumber) {
        if (transferRecipientCountryId === 'USA') {
          return "".concat(transferRecipientNumber);
        }
        var _country = availableCountries.find(function (_ref4) {
          var countryId = _ref4.countryId;
          return countryId === transferRecipientCountryId;
        });
        return "".concat(transferRecipientNumber, " (").concat(_country.countryName || _country.countryId, ")");
      }
      return '';
    }
  }, {
    key: "transferCallDisabled",
    get: function get() {
      var _this$_deps$evCall$cu2 = this._deps.evCall.currentCall,
        endedCall = _this$_deps$evCall$cu2.endedCall,
        allowTransfer = _this$_deps$evCall$cu2.allowTransfer;
      return this.isQueueTransfer ? this.requeueCallDisabled : !allowTransfer || !this.selectedCallRecipient || !!endedCall || this.evTransferCall.transferring;
    }
  }, {
    key: "textFields",
    get: function get() {
      var _this2 = this;
      var transferOption = this.transferOptions.find(function (_ref5) {
        var type = _ref5.type;
        return type === _this2.evTransferCall.transferType;
      });
      return transferOption ? transferOption.textFields : [];
    }
  }, {
    key: "goBack",
    value: function goBack() {
      this._deps.routerInteraction.goBack();
    }
  }, {
    key: "clickCallRecipient",
    value: function clickCallRecipient(router) {
      if (router) {
        this._deps.routerInteraction.push(router);
      }
    }
  }, {
    key: "gotoActivityCallLogPage",
    value: function gotoActivityCallLogPage() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.callId;
      this._deps.routerInteraction.push("/activityCallLog/".concat(id));
    }
  }, {
    key: "gotoTransferCallPage",
    value: function gotoTransferCallPage() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.callId;
      this._deps.routerInteraction.push("/activityCallLog/".concat(id, "/transferCall"));
    }
  }, {
    key: "transferCall",
    value: function transferCall() {
      return this.isQueueTransfer ? this._submitRequeueCall() : this.evTransferCall.transfer();
    }
  }, {
    key: "_searchAgent",
    value: function _searchAgent(options, text) {
      var _options$firstName, _options$lastName;
      var firstName = (_options$firstName = options.firstName) !== null && _options$firstName !== void 0 ? _options$firstName : '';
      var lastName = (_options$lastName = options.lastName) !== null && _options$lastName !== void 0 ? _options$lastName : '';
      var blankRegex = /\s+/g;
      // when there is not have firstName and lastName, use username to search
      var name = ("".concat(firstName).concat(lastName) || options.username).replace(blankRegex, '').toLowerCase();
      var keywords = text.toLowerCase().trim().split(blankRegex);
      return keywords.length > 0 && keywords.filter(function (keyword) {
        return name.includes(keyword);
      }).length > 0;
    }
  }, {
    key: "_searchPhoneBook",
    value: function _searchPhoneBook(_ref6, text) {
      var phoneBookName = _ref6.phoneBookName,
        destination = _ref6.destination,
        parsedDestination = _ref6.parsedDestination;
      var searchText = text.toLowerCase();
      return (phoneBookName === null || phoneBookName === void 0 ? void 0 : phoneBookName.toLowerCase().includes(searchText)) || (destination === null || destination === void 0 ? void 0 : destination.includes(searchText)) || (parsedDestination === null || parsedDestination === void 0 ? void 0 : parsedDestination.includes(searchText));
    }
  }, {
    key: "stayOnCall",
    get: function get() {
      return this.isQueueTransfer ? this._deps.evRequeueCall.stayOnCall : this.evTransferCall.stayOnCall;
    }
  }, {
    key: "_clickTransferTypeFiled",
    value: function _clickTransferTypeFiled(type) {
      this.evTransferCall.changeTransferType(type);
      if (type !== _transferTypes.transferTypes.queue) {
        var _goalTransferOption$t;
        var goalTransferOption = this.transferOptions.find(function (transferOption) {
          return transferOption.type === type;
        });
        this.clickCallRecipient(goalTransferOption === null || goalTransferOption === void 0 ? void 0 : (_goalTransferOption$t = goalTransferOption.textFields[0]) === null || _goalTransferOption$t === void 0 ? void 0 : _goalTransferOption$t.router);
      }
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref7) {
      var id = _ref7.id,
        groupId = _ref7.groupId;
      this._deps.evCall.activityCallId = id;
      this.routerQueueGroupId = groupId;
      return {
        currentLocale: this._deps.locale.currentLocale,
        transferOptions: this.transferOptions,
        transferring: this.evTransferCall.transferring,
        transferRecipientCountryId: this.evTransferCall.transferRecipientCountryId,
        transferRecipientNumber: this.evTransferCall.transferRecipientNumber,
        transferPhoneBookSelectedIndex: this.evTransferCall.transferPhoneBookSelectedIndex,
        transferAgentId: this.evTransferCall.transferAgentId,
        isStayOnCall: this.stayOnCall,
        selectedTransferType: this.evTransferCall.transferType,
        transferAgentList: this.evTransferCall.transferAgentList,
        transferPhoneBook: this.evTransferCall.transferPhoneBook,
        transferAgentListUpdateTTL: 3000,
        transferCountryOptions: this._deps.evAuth.availableCountries,
        allowManualInternationalTransfer: this.evTransferCall.allowManualInternationalTransfer,
        textFields: this.textFields,
        transferCallDisabled: this.transferCallDisabled,
        isWide: this._deps.environment.isWide,
        // requeuing state
        requeuing: this._deps.evRequeueCall.requeuing,
        // availableRequeueQueues
        queueGroups: this._deps.evAuth.availableRequeueQueues,
        selectedQueueGroupId: this._deps.evRequeueCall.selectedQueueGroupId,
        selectedGateId: this._deps.evRequeueCall.selectedGateId,
        // selected object
        selectedQueueGroup: this.selectedQueueGroup,
        selectedGate: this.selectedGate
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this3 = this;
      return {
        goBack: function goBack() {
          return _this3.goBack();
        },
        clickCallRecipient: function clickCallRecipient(router) {
          return _this3.clickCallRecipient(router);
        },
        clickTransferTypeFiled: function clickTransferTypeFiled(type) {
          return _this3._clickTransferTypeFiled(type);
        },
        setStayOnCall: function setStayOnCall(status) {
          return _this3.isQueueTransfer ? _this3._deps.evRequeueCall.setStatus({
            stayOnCall: !status
          }) : _this3.evTransferCall.changeStayOnCall(status);
        },
        fetchAgentList: function fetchAgentList() {
          return _this3.evTransferCall.fetchAgentList();
        },
        changeRecipientNumber: function changeRecipientNumber(recipientNumber) {
          _this3.evTransferCall.changeRecipientNumber(recipientNumber);
          _this3.evTransferCall.changeTransferType(_transferTypes.transferTypes.manualEntry);
          _this3.gotoTransferCallPage();
        },
        changeTransferPhoneBookSelected: function changeTransferPhoneBookSelected(index) {
          _this3.evTransferCall.changeTransferPhoneBookSelected(index);
          _this3.evTransferCall.changeTransferType(_transferTypes.transferTypes.phoneBook);
          _this3.gotoTransferCallPage();
        },
        changeRecipientCountryId: function changeRecipientCountryId(countryId) {
          return _this3.evTransferCall.changeRecipientCountryId(countryId);
        },
        changeTransferAgentId: function changeTransferAgentId(agentId) {
          _this3.evTransferCall.changeTransferAgentId(agentId);
          _this3.evTransferCall.changeTransferType(_transferTypes.transferTypes.internal);
          _this3.gotoTransferCallPage();
        },
        transferCall: function transferCall() {
          return _this3.transferCall();
        },
        setCancelTemplate: function setCancelTemplate(templates) {
          return _this3.evTransferCall.setCancelTemplate(templates);
        },
        cancelTransfer: function cancelTransfer() {
          return _this3.evTransferCall.cancelTransfer();
        },
        cancelTransferPage: function cancelTransferPage() {
          return _this3.gotoActivityCallLogPage();
        },
        goToActivityCallLogPage: this.goToActivityCallLogPage,
        goToRequeueCallPage: this.goToRequeueCallPage,
        goToRequeueGroupPage: this.goToRequeueGroupPage,
        goToRequeueGroupDetailPage: this.goToRequeueGroupDetailPage,
        searchAgent: function searchAgent(option, text) {
          return _this3._searchAgent(option, text);
        },
        searchPhoneBook: function searchPhoneBook(option, text) {
          return _this3._searchPhoneBook(option, text);
        },
        searchGroup: function searchGroup(option, text) {
          return _this3._searchQueue(option.groupName, text);
        },
        searchGate: function searchGate(option, text) {
          return _this3._searchQueue(option.gateName, text);
        },
        submitSelection: function submitSelection(queueId) {
          return _this3._submitSelection(queueId);
        }
      };
    }
  }]);
}(_core.RcUIModuleV2), _applyDecoratedDescriptor(_class2.prototype, "selectedQueueGroup", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "selectedQueueGroup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "selectedGate", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "selectedGate"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transferOptions", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "transferOptions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "selectedCallRecipient", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "selectedCallRecipient"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transferCallDisabled", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "transferCallDisabled"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "textFields", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "textFields"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stayOnCall", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "stayOnCall"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=EvTransferCallUI.js.map
