"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
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
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvTransferCall = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/web.timers.js");
var _di = require("@ringcentral-integration/commons/lib/di");
var _Call = require("@ringcentral-integration/commons/modules/Call");
var _core = require("@ringcentral-integration/core");
var _phoneNumber = require("@ringcentral-integration/phone-number");
var _i18nIsoCountries = require("i18n-iso-countries");
var _enums = require("../../enums");
var _callbackTypes = require("../../lib/EvClient/enums/callbackTypes");
var _EvTypeError = require("../../lib/EvTypeError");
var _asyncEventEmitter = require("../../lib/asyncEventEmitter");
var _checkCountryCode = require("../../lib/checkCountryCode");
var _parseNumber = require("../../lib/parseNumber");
var _i18n = _interopRequireDefault(require("./i18n"));
var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor0;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var EvTransferCall = exports.EvTransferCall = (_dec = (0, _di.Module)({
  name: 'EvTransferCall',
  deps: ['EvClient', 'EvCallMonitor', 'EvCall', 'EvSubscription', 'EvWorkingState', 'Storage', 'ModalUI', 'EvAuth', 'Locale', 'Alert', 'EvAgentSession', {
    dep: 'EvTransferCallOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.evCall.currentCall, that._deps.evAuth.availableCountries];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that._deps.evCall.currentCall];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that.transferAgentList, that.transferAgentId];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function EvTransferCall(deps) {
    var _this;
    _classCallCheck(this, EvTransferCall);
    _this = _callSuper(this, EvTransferCall, [{
      deps: deps,
      enableCache: true,
      storageKey: 'EvTransferCall'
    }]);
    _this._eventEmitter = new _asyncEventEmitter.AsyncEventEmitter();
    _this._internalTransferCallbacks = {};
    // alertTemplate: ModalTemplate;
    _this.cancelTemplate = void 0;
    _this._sendVoiceMailModalId = null;
    _this._incomingTransferCallModalId = null;
    _this._transferNotificationId = null;
    _this._transferDest = null;
    _initializerDefineProperty(_this, "receivedCall", _descriptor, _this);
    _initializerDefineProperty(_this, "isTransferCancelable", _descriptor2, _this);
    _initializerDefineProperty(_this, "transferStatus", _descriptor3, _this);
    _initializerDefineProperty(_this, "transferType", _descriptor4, _this);
    _initializerDefineProperty(_this, "transferAgentId", _descriptor5, _this);
    _initializerDefineProperty(_this, "transferAgentList", _descriptor6, _this);
    _initializerDefineProperty(_this, "transferPhoneBookSelectedIndex", _descriptor7, _this);
    _initializerDefineProperty(_this, "transferRecipientNumber", _descriptor8, _this);
    _initializerDefineProperty(_this, "transferRecipientCountryId", _descriptor9, _this);
    _initializerDefineProperty(_this, "stayOnCall", _descriptor0, _this);
    return _this;
  }
  _inherits(EvTransferCall, _RcModuleV);
  return _createClass(EvTransferCall, [{
    key: "transferring",
    get: function get() {
      return this.transferStatus === _enums.transferStatuses.loading;
    }
  }, {
    key: "evClient",
    get: function get() {
      return this._deps.evClient;
    }
  }, {
    key: "allowManualInternationalTransfer",
    get: function get() {
      var _this$_deps$evCall$cu;
      return (_this$_deps$evCall$cu = this._deps.evCall.currentCall) === null || _this$_deps$evCall$cu === void 0 ? void 0 : _this$_deps$evCall$cu.allowManualInternationalTransfer;
    }
  }, {
    key: "allowInternalTransfer",
    get: function get() {
      var _this$_deps$evCall$cu2;
      return ((_this$_deps$evCall$cu2 = this._deps.evCall.currentCall) === null || _this$_deps$evCall$cu2 === void 0 ? void 0 : _this$_deps$evCall$cu2.allowDirectAgentTransfer) !== '0';
    }
  }, {
    key: "isInternalTransfer",
    get: function get() {
      return this.transferType === _enums.transferTypes.internal;
    }
  }, {
    key: "transferPhoneBook",
    get: function get() {
      var _this$_deps$evCall$cu3,
        _this$_deps$evCall$cu4,
        _this2 = this;
      return ((_this$_deps$evCall$cu3 = this._deps.evCall.currentCall) === null || _this$_deps$evCall$cu3 === void 0 ? void 0 : (_this$_deps$evCall$cu4 = _this$_deps$evCall$cu3.transferPhoneBook) === null || _this$_deps$evCall$cu4 === void 0 ? void 0 : _this$_deps$evCall$cu4.reduce(function (prev, bookItem, index) {
        var countryId = bookItem.countryId,
          destination = bookItem.destination,
          name = bookItem.name;
        var country = _this2._deps.evAuth.availableCountries.find(function (country) {
          return country.countryId === countryId;
        });
        if (typeof country === 'undefined' || country === null) {
          return prev;
        }
        var parsedDestination = '';
        try {
          parsedDestination = (0, _phoneNumber.format)({
            phoneNumber: destination,
            countryCode: (0, _i18nIsoCountries.alpha3ToAlpha2)(countryId),
            type: _phoneNumber.formatTypes.e164
          });
        } catch (e) {
          //
        }
        var countryName = country.countryId !== 'USA' ? country.countryName || country.countryId : '';
        var phoneBookName = "".concat(name, " ").concat(countryName);
        prev.push(_objectSpread(_objectSpread({}, bookItem), {}, {
          phoneBookName: phoneBookName,
          parsedDestination: parsedDestination,
          phoneBookItemIndex: index
        }));
        return prev;
      }, [])) || [];
    }
  }, {
    key: "setReceivedCall",
    value: function setReceivedCall(data) {
      this.receivedCall = data;
    }
  }, {
    key: "setCancelableTransfer",
    value: function setCancelableTransfer(cancelable) {
      this.isTransferCancelable = cancelable;
    }
  }, {
    key: "resetTransferStatus",
    value: function resetTransferStatus() {
      this.receivedCall = null;
      this.transferType = _enums.transferTypes.phoneBook;
      this.transferAgentId = null;
      this.transferAgentList = [];
      this.transferPhoneBookSelectedIndex = null;
      this.transferRecipientNumber = '';
      this.transferRecipientCountryId = 'USA';
      this.stayOnCall = true;
      this.isTransferCancelable = false;
      this._sendVoiceMailModalId = null;
      this._incomingTransferCallModalId = null;
      this._transferDest = null;
    }
  }, {
    key: "changeStayOnCall",
    value: function changeStayOnCall(value) {
      this.stayOnCall = !value;
    }
  }, {
    key: "changeRecipientCountryId",
    value: function changeRecipientCountryId(countryId) {
      this.transferRecipientCountryId = countryId;
    }
  }, {
    key: "changeTransferType",
    value: function changeTransferType(type) {
      this.transferType = type;
    }
  }, {
    key: "changeAgentList",
    value: function changeAgentList(data) {
      var _this3 = this;
      var currentAgent = data.find(function (_ref) {
        var agentId = _ref.agentId;
        return agentId === _this3.transferAgentId;
      });
      if (!currentAgent) {
        this.transferAgentId = null;
      }
      this.transferAgentList = data;
    }
  }, {
    key: "changeRecipientNumber",
    value: function changeRecipientNumber(phoneNumber) {
      this.transferRecipientNumber = phoneNumber;
    }
  }, {
    key: "changeTransferPhoneBookSelected",
    value: function changeTransferPhoneBookSelected(index) {
      this.transferPhoneBookSelectedIndex = index;
    }
  }, {
    key: "changeTransferAgentId",
    value: function changeTransferAgentId(agentId) {
      this.transferAgentId = agentId;
    }
  }, {
    key: "setTransferStatus",
    value: function setTransferStatus(transferStatus) {
      this.transferStatus = transferStatus;
    }
  }, {
    key: "allowTransferCall",
    get: function get() {
      var currentCall = this._deps.evCall.currentCall;
      return (currentCall === null || currentCall === void 0 ? void 0 : currentCall.allowTransfer) && !currentCall.endedCall;
    }
  }, {
    key: "transferAgentAvailable",
    get: function get() {
      var _this4 = this;
      return this.transferAgentList.find(function (item) {
        return item.agentId === _this4.transferAgentId;
      }).available;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this5 = this;
      this._deps.evAgentSession.onTriggerConfig(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _this5.setTransferStatus(_enums.transferStatuses.idle);
            case 1:
              return _context.a(2);
          }
        }, _callee);
      })));
      this._deps.evCallMonitor.onCallEnded(function () {
        _this5.setTransferStatus(_enums.transferStatuses.idle);
        _this5.closeModals();
        _this5.closeLoadingNotification();
      });
      this._deps.evSubscription.subscribe(_callbackTypes.EvCallbackTypes.DIRECT_AGENT_TRANSFER, function (data) {
        var internalTransferCallback = _this5._internalTransferCallbacks[data.type];
        if (data.status === _enums.directTransferStatues.ACCEPTED && data.type === _enums.directTransferTypes.WARM) {
          if (!_this5.transferAgentAvailable) {
            _this5.setCancelableTransfer(true);
            _this5.showNotificationLoadingCancel();
          }
          return;
        }
        if ([_enums.directTransferStatues.REJECTED, _enums.directTransferStatues.SUCCEEDED].includes(data.status) && data.type === _enums.directTransferTypes.WARM) {
          _this5.setCancelableTransfer(false);
          _this5.showNotificationLoadingSpinner();
        }
        if (internalTransferCallback) {
          return internalTransferCallback(data);
        }
      });
      var needCloseNotificationTypes = [_enums.directTransferNotificationTypes.CANCELLED, _enums.directTransferNotificationTypes.VOICEMAIL, _enums.directTransferNotificationTypes.MISSED];
      this._deps.evSubscription.subscribe(_callbackTypes.EvCallbackTypes.DIRECT_AGENT_TRANSFER_NOTIF, function (data) {
        if (data.status === _enums.directTransferNotificationTypes.PENDING) {
          var hasReceivedCall = !!_this5.receivedCall;
          _this5.setReceivedCall(data);
          if (!hasReceivedCall) {
            _this5._showIncomingTransferCallModal();
          }
        }
        if (needCloseNotificationTypes.includes(data.status)) {
          _this5.closeModals();
          _this5.setReceivedCall(null);
        }
      });
      this.onTransferStart(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return _this5._deps.alert.info({
                message: _enums.transferEvents.START,
                loading: true,
                backdrop: true,
                ttl: 0
              });
            case 1:
              _this5._transferNotificationId = _context2.v;
              if (!_this5.isInternalTransfer) {
                _this5.setCancelableTransfer(true);
                _this5.showNotificationLoadingCancel();
              }
            case 2:
              return _context2.a(2);
          }
        }, _callee2);
      })));
      this.onTransferSuccess(function () {
        _this5.closeLoadingNotification();
        _this5._deps.alert.success({
          message: _enums.transferSuccesses.TRANSFER_CONNECTED
        });
      });
      this.onTransferError(function (data) {
        _this5.closeLoadingNotification();

        // if that is cancel transfer from user do nothing.
        if (data.type === _enums.directTransferTypes.CANCEL) {
          return;
        }
        if (_this5.isInternalTransfer) {
          return _this5._showSendVoiceMailModal(data);
        }
        _this5._deps.alert.danger({
          message: _enums.transferErrors.TRANSFER_ERROR
        });
      });

      // End transfer message will come after success and error.
      this.onTransferEnd(function () {
        console.log('==onTransferEnd==');
      });
    }
  }, {
    key: "showNotificationLoadingSpinner",
    value: function showNotificationLoadingSpinner() {
      this._deps.alert.update(this._transferNotificationId, {
        message: _enums.transferEvents.START,
        loading: true
      });
    }
  }, {
    key: "showNotificationLoadingCancel",
    value: function showNotificationLoadingCancel() {
      this._deps.alert.update(this._transferNotificationId, {
        message: _enums.transferEvents.START,
        action: this.cancelTemplate
      });
    }
  }, {
    key: "closeLoadingNotification",
    value: function closeLoadingNotification() {
      if (this._transferNotificationId) {
        this._deps.alert.dismiss(this._transferNotificationId);
        this._transferNotificationId = null;
      }
    }
  }, {
    key: "onTransferStart",
    value: function onTransferStart(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(_enums.transferEvents.START, handler);
      }
    }
  }, {
    key: "onTransferEnd",
    value: function onTransferEnd(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(_enums.transferEvents.END, handler);
      }
    }
  }, {
    key: "onTransferError",
    value: function onTransferError(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(_enums.transferEvents.ERROR, handler);
      }
    }
  }, {
    key: "onTransferSuccess",
    value: function onTransferSuccess(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on(_enums.transferEvents.SUCCESS, handler);
      }
    }
  }, {
    key: "closeModals",
    value: function closeModals() {
      // close send voice modal.
      if (this._sendVoiceMailModalId) {
        this._deps.modalUI.close(this._sendVoiceMailModalId);
      }
      // close ignore/accept transfer modal.
      if (this._incomingTransferCallModalId) {
        this._deps.modalUI.close(this._incomingTransferCallModalId);
      }
    }
  }, {
    key: "fetchAgentList",
    value: function () {
      var _fetchAgentList = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var data, result, _t;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              _context3.n = 1;
              return this.evClient.fetchDirectAgentList();
            case 1:
              result = _context3.v;
              if (result) {
                data = result.agents;
              }
              _context3.n = 3;
              break;
            case 2:
              _context3.p = 2;
              _t = _context3.v;
              console.error(_t);
            case 3:
              _context3.p = 3;
              if (Array.isArray(data)) {
                this.changeAgentList(data);
              }
              return _context3.f(3);
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this, [[0, 2, 3, 4]]);
      }));
      function fetchAgentList() {
        return _fetchAgentList.apply(this, arguments);
      }
      return fetchAgentList;
    }()
  }, {
    key: "rejectTransferCall",
    value: function rejectTransferCall() {
      if (!this.receivedCall) return;
      this._deps.evClient.rejectDirectAgentTransferCall(this.receivedCall.uii);
      this.setReceivedCall(null);
    }
  }, {
    key: "acceptTransferCall",
    value: function acceptTransferCall() {
      var _this6 = this;
      if (!this.receivedCall) return;
      this._deps.evWorkingState.setWorkingStateWorking();
      // TODO: need check why add timeout here?
      setTimeout(function () {
        return _this6.setReceivedCall(null);
      }, 6000);
    }
  }, {
    key: "sendVoicemailToAgent",
    value: function sendVoicemailToAgent() {
      var _this7 = this;
      this.setTransferStatus(_enums.transferStatuses.loading);
      this._deps.evClient.sendVoicemailDirectAgentTransfer(this.transferAgentId);
      this._internalTransferCallbacks.VOICEMAIL = function (data) {
        if (data.status === _enums.directTransferStatues.ACCEPTED) {
          _this7._deps.alert.success({
            message: _enums.transferSuccesses.SEND_VOICEMAIL_SUCCESS
          });
        } else {
          _this7._deps.alert.danger({
            message: _enums.transferErrors.SEND_VOICEMAIL_ERROR
          });
        }
      };
    }
  }, {
    key: "cancelTransfer",
    value: function () {
      var _cancelTransfer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var _t2;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              _context4.n = 1;
              return this.cancelInternalTransfer();
            case 1:
              _context4.n = 3;
              break;
            case 2:
              _context4.p = 2;
              _t2 = _context4.v;
              console.error(_t2);
              throw new Error("'cancelInternalTransfer' failed.");
            case 3:
              this.closeLoadingNotification();
            case 4:
              return _context4.a(2);
          }
        }, _callee4, this, [[0, 2]]);
      }));
      function cancelTransfer() {
        return _cancelTransfer.apply(this, arguments);
      }
      return cancelTransfer;
    }()
  }, {
    key: "cancelInternalTransfer",
    value: function () {
      var _cancelInternalTransfer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var _this8 = this;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              if (!this.transferring) {
                _context5.n = 3;
                break;
              }
              if (!this.isInternalTransfer) {
                _context5.n = 2;
                break;
              }
              this._deps.evClient.cancelDirectAgentTransfer(this.transferAgentId);
              _context5.n = 1;
              return new Promise(function (resolve, reject) {
                _this8._internalTransferCallbacks.CANCEL = function (data) {
                  if (_this8.stayOnCall) {
                    _this8._internalTransferCallbacks.WARM(data);
                  } else {
                    _this8._internalTransferCallbacks.COLD(data);
                  }
                  if (data.status === _enums.directTransferStatues.SUCCEEDED) {
                    resolve(data);
                  } else {
                    reject(data);
                  }
                };
              });
            case 1:
              _context5.n = 3;
              break;
            case 2:
              if (this._transferDest) {
                this._deps.evClient.cancelWarmTransferCall(this._transferDest);
              } else {
                console.warn('Unexpected cancel transfer');
              }
            case 3:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function cancelInternalTransfer() {
        return _cancelInternalTransfer.apply(this, arguments);
      }
      return cancelInternalTransfer;
    }()
  }, {
    key: "parseNumber",
    value: function parseNumber() {
      switch (this.transferType) {
        case _enums.transferTypes.phoneBook:
          return this.parsePhoneBookNumber();
        case _enums.transferTypes.manualEntry:
          return this.parseManualEntryNumber();
        default:
          break;
      }
    }
  }, {
    key: "getNumber",
    value: function getNumber() {
      var _this$transferPhoneBo;
      switch (this.transferType) {
        case _enums.transferTypes.phoneBook:
          return (_this$transferPhoneBo = this.transferPhoneBook[this.transferPhoneBookSelectedIndex]) === null || _this$transferPhoneBo === void 0 ? void 0 : _this$transferPhoneBo.destination;
        case _enums.transferTypes.manualEntry:
          return this.transferRecipientNumber;
        default:
          break;
      }
    }
  }, {
    key: "parseManualEntryNumber",
    value: function parseManualEntryNumber() {
      if (!this.transferRecipientNumber) {
        throw new _EvTypeError.EvTypeError({
          type: _enums.transferErrors.RECIPIENT_NUMBER_ERROR,
          data: "Abnormal Transfer: this.transferRecipientNumber -> ".concat(this.transferRecipientNumber)
        });
      }
      (0, _checkCountryCode.checkCountryCode)(this.transferRecipientNumber);
      var toNumber = (0, _parseNumber.parseNumber)(this.transferRecipientNumber);
      return {
        toNumber: toNumber,
        countryId: this.transferRecipientCountryId
      };
    }
  }, {
    key: "parsePhoneBookNumber",
    value: function parsePhoneBookNumber() {
      if (this.transferPhoneBookSelectedIndex === null) {
        throw new _EvTypeError.EvTypeError({
          type: _enums.transferErrors.CONTACT_ID_ERROR,
          data: "Abnormal Transfer: this.transferPhoneBookSelected -> ".concat(this.transferPhoneBookSelectedIndex)
        });
      }
      var transferPhoneBookSelected = this.transferPhoneBook[this.transferPhoneBookSelectedIndex];
      (0, _checkCountryCode.checkCountryCode)(transferPhoneBookSelected.destination);
      var toNumber = (0, _parseNumber.parseNumber)(transferPhoneBookSelected.destination);
      return {
        toNumber: toNumber,
        countryId: transferPhoneBookSelected.countryId
      };
    }
  }, {
    key: "transfer",
    value: function () {
      var _transfer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var _ref4, toNumber, countryId, _t3, _t4, _t5;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              _ref4 = this.parseNumber() || {}, toNumber = _ref4.toNumber, countryId = _ref4.countryId;
              _context6.n = 1;
              return this._eventEmitter.asyncEmit(_enums.transferEvents.START);
            case 1:
              this.setTransferStatus(_enums.transferStatuses.loading);
              _t3 = this.transferType;
              _context6.n = _t3 === _enums.transferTypes.internal ? 2 : _t3 === _enums.transferTypes.phoneBook ? 4 : _t3 === _enums.transferTypes.manualEntry ? 4 : 6;
              break;
            case 2:
              _context6.n = 3;
              return this.internalTransferCall();
            case 3:
              return _context6.a(3, 7);
            case 4:
              _context6.n = 5;
              return this.transferCall({
                dialDest: toNumber,
                countryId: countryId
              });
            case 5:
              return _context6.a(3, 7);
            case 6:
              throw new _EvTypeError.EvTypeError({
                type: _enums.transferErrors.TYPE_ERROR,
                data: "Abnormal Transfer: this.transferType -> ".concat(this.transferType)
              });
            case 7:
              _context6.n = 8;
              return this._eventEmitter.asyncEmit(_enums.transferEvents.SUCCESS);
            case 8:
              _context6.n = 15;
              break;
            case 9:
              _context6.p = 9;
              _t4 = _context6.v;
              if (!(_t4 instanceof _EvTypeError.EvTypeError)) {
                _context6.n = 13;
                break;
              }
              _t5 = _t4.type;
              _context6.n = _t5 === _enums.messageTypes.NO_SUPPORT_COUNTRY ? 10 : _t5 === _enums.messageTypes.INVALID_NUMBER ? 11 : 12;
              break;
            case 10:
              return _context6.a(2, this._deps.alert.danger({
                message: _enums.messageTypes.NO_SUPPORT_COUNTRY,
                ttl: 0
              }));
            case 11:
              return _context6.a(2, this._deps.alert.danger({
                message: _Call.callErrors.noToNumber
              }));
            case 12:
              return _context6.a(3, 13);
            case 13:
              _context6.n = 14;
              return this._eventEmitter.asyncEmit(_enums.transferEvents.ERROR, _t4);
            case 14:
              throw _t4;
            case 15:
              _context6.p = 15;
              this.setTransferStatus(_enums.transferStatuses.idle);
              _context6.n = 16;
              return this._eventEmitter.asyncEmit(_enums.transferEvents.END);
            case 16:
              return _context6.f(15);
            case 17:
              return _context6.a(2);
          }
        }, _callee6, this, [[0, 9, 15, 17]]);
      }));
      function transfer() {
        return _transfer.apply(this, arguments);
      }
      return transfer;
    }()
  }, {
    key: "internalTransferCall",
    value: function () {
      var _internalTransferCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var _this9 = this;
        var _t6;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              if (this.transferAgentId) {
                _context7.n = 1;
                break;
              }
              throw new _EvTypeError.EvTypeError({
                type: _enums.transferErrors.AGENT_ID_ERROR,
                data: "Abnormal Transfer: this.transferAgentId -> ".concat(this.transferAgentId)
              });
            case 1:
              _context7.p = 1;
              _context7.n = 2;
              return this.fetchAgentList();
            case 2:
              _context7.n = 4;
              break;
            case 3:
              _context7.p = 3;
              _t6 = _context7.v;
              console.warn("fetch agent list error");
              console.error(_t6);
            case 4:
              if (!this.stayOnCall) {
                _context7.n = 6;
                break;
              }
              this.evClient.warmDirectAgentTransfer(this.transferAgentId);
              _context7.n = 5;
              return new Promise(function (resolve, reject) {
                _this9._internalTransferCallbacks.WARM = function (data) {
                  if (data.status === _enums.directTransferStatues.SUCCEEDED && data.type === _enums.directTransferTypes.WARM) {
                    resolve(data);
                  } else {
                    reject(data);
                  }
                };
              });
            case 5:
              _context7.n = 7;
              break;
            case 6:
              this.evClient.coldDirectAgentTransfer(this.transferAgentId);
              _context7.n = 7;
              return new Promise(function (resolve, reject) {
                _this9._internalTransferCallbacks.COLD = function (data) {
                  if (data.status === _enums.directTransferStatues.ACCEPTED) {
                    resolve(data);
                  } else {
                    reject(data);
                  }
                };
              });
            case 7:
              return _context7.a(2);
          }
        }, _callee7, this, [[1, 3]]);
      }));
      function internalTransferCall() {
        return _internalTransferCall.apply(this, arguments);
      }
      return internalTransferCall;
    }()
  }, {
    key: "transferCall",
    value: function () {
      var _transferCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(transferArgs) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              if (!this.stayOnCall) {
                _context8.n = 2;
                break;
              }
              _context8.n = 1;
              return this.warmTransferCall(transferArgs);
            case 1:
              _context8.n = 3;
              break;
            case 2:
              _context8.n = 3;
              return this.coldTransferCall(transferArgs);
            case 3:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function transferCall(_x) {
        return _transferCall.apply(this, arguments);
      }
      return transferCall;
    }()
  }, {
    key: "warmTransferCall",
    value: function () {
      var _warmTransferCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(_ref5) {
        var dialDest, countryId;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              dialDest = _ref5.dialDest, countryId = _ref5.countryId;
              if (!(countryId !== 'USA' && countryId !== 'CAN')) {
                _context9.n = 4;
                break;
              }
              if (!this.allowManualInternationalTransfer) {
                _context9.n = 2;
                break;
              }
              this._transferDest = dialDest;
              _context9.n = 1;
              return this.evClient.warmTransferIntlCall({
                dialDest: dialDest,
                countryId: countryId
              });
            case 1:
              _context9.n = 3;
              break;
            case 2:
              throw new Error("Unexpected Error: ban transferring international call");
            case 3:
              _context9.n = 5;
              break;
            case 4:
              this._transferDest = dialDest;
              _context9.n = 5;
              return this.evClient.warmTransferCall({
                dialDest: dialDest
              });
            case 5:
              return _context9.a(2);
          }
        }, _callee9, this);
      }));
      function warmTransferCall(_x2) {
        return _warmTransferCall.apply(this, arguments);
      }
      return warmTransferCall;
    }()
  }, {
    key: "coldTransferCall",
    value: function () {
      var _coldTransferCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(_ref6) {
        var dialDest, countryId;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              dialDest = _ref6.dialDest, countryId = _ref6.countryId;
              if (!(countryId !== 'USA' && countryId !== 'CAN')) {
                _context0.n = 3;
                break;
              }
              if (!this.allowManualInternationalTransfer) {
                _context0.n = 2;
                break;
              }
              _context0.n = 1;
              return this.evClient.coldTransferIntlCall({
                dialDest: dialDest,
                countryId: countryId
              });
            case 1:
              _context0.n = 2;
              break;
            case 2:
              _context0.n = 4;
              break;
            case 3:
              _context0.n = 4;
              return this.evClient.coldTransferCall({
                dialDest: dialDest
              });
            case 4:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function coldTransferCall(_x3) {
        return _coldTransferCall.apply(this, arguments);
      }
      return coldTransferCall;
    }()
  }, {
    key: "setCancelTemplate",
    value: function setCancelTemplate(templates) {
      this.cancelTemplate = templates;
    }
  }, {
    key: "_showSendVoiceMailModal",
    value: function _showSendVoiceMailModal(data) {
      var _this0 = this;
      var currentLocale = this._deps.locale.currentLocale;
      var content = this.getErrorContent(data);
      this._sendVoiceMailModalId = this._deps.modalUI.confirm({
        title: _i18n["default"].getString('transferModalTitle', currentLocale),
        content: _i18n["default"].getString(content, currentLocale),
        confirmButtonText: _i18n["default"].getString('sendVoicemail', currentLocale),
        cancelButtonText: _i18n["default"].getString('selectOtherAgents', currentLocale),
        onConfirm: function onConfirm() {
          _this0.sendVoicemailToAgent();
        },
        childrenSize: 'small'
      });
    }
  }, {
    key: "getErrorContent",
    value: function getErrorContent(data) {
      if (data.status === 'FAILED') {
        // ? that is from ev backend message.
        if (data.message.includes('Routing')) {
          return 'transferFailedContent';
        }
        return 'transferTimeOutContent';
      }
      if (data.status === 'REJECTED') {
        return 'transferRejectedContent';
      }
      if (data.type === 'CANCEL') {
        return 'transferCancelContent';
      }
      return 'transferFailedContent';
    }
  }, {
    key: "_showIncomingTransferCallModal",
    value: function _showIncomingTransferCallModal() {
      var _this1 = this;
      var currentLocale = this._deps.locale.currentLocale;
      this._incomingTransferCallModalId = this._deps.modalUI.confirm({
        title: _i18n["default"].getString('incomingTransferTitle', currentLocale),
        content: _i18n["default"].getString('incomingTransferContent', currentLocale),
        confirmButtonText: _i18n["default"].getString('acceptIncomingTransfer', currentLocale),
        cancelButtonText: _i18n["default"].getString('ignoreIncomingTransfer', currentLocale),
        onConfirm: function onConfirm() {
          _this1.acceptTransferCall();
        },
        onCancel: function onCancel() {
          _this1.rejectTransferCall();
        },
        childrenSize: 'small'
      });
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "receivedCall", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isTransferCancelable", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "transferStatus", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enums.transferStatuses.idle;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "transferType", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enums.transferTypes.phoneBook;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "transferAgentId", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "transferAgentList", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "transferPhoneBookSelectedIndex", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "transferRecipientNumber", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "transferRecipientCountryId", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'USA';
  }
}), _descriptor0 = _applyDecoratedDescriptor(_class2.prototype, "stayOnCall", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "transferPhoneBook", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "transferPhoneBook"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setReceivedCall", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setReceivedCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCancelableTransfer", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCancelableTransfer"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetTransferStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetTransferStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeStayOnCall", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeStayOnCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeRecipientCountryId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeRecipientCountryId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeTransferType", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeTransferType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeAgentList", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeAgentList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeRecipientNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeRecipientNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeTransferPhoneBookSelected", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeTransferPhoneBookSelected"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeTransferAgentId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "changeTransferAgentId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setTransferStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setTransferStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allowTransferCall", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "allowTransferCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transferAgentAvailable", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "transferAgentAvailable"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=EvTransferCall.js.map
