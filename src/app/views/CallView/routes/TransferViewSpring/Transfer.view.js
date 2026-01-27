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
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransferView = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _views = require("@ringcentral-integration/micro-contacts/src/app/views");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _react = _interopRequireWildcard(require("react"));
var _services4 = require("../../../../services");
var _services5 = require("../../services");
var _TransferPage = require("./TransferPage");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2;
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
var TransferView = exports.TransferView = (_dec = (0, _nextCore.injectable)({
  name: 'TransferView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 5);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 6);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)('TransferViewOptions')(target, undefined, 7);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _services4.CallAction === "undefined" ? Object : _services4.CallAction, typeof _services3.Toast === "undefined" ? Object : _services3.Toast, typeof _services4.CallingSettings === "undefined" ? Object : _services4.CallingSettings, typeof _views.ContactSearchView === "undefined" ? Object : _views.ContactSearchView, typeof _services5.CallViewState === "undefined" ? Object : _services5.CallViewState, typeof _services4.AudioSettings === "undefined" ? Object : _services4.AudioSettings, typeof _services2.CompanyContacts === "undefined" ? Object : _services2.CompanyContacts, typeof TransferViewOptions === "undefined" ? Object : TransferViewOptions]), _dec7 = (0, _services.track)(_trackEvents.trackEvents.transferToVoicemail), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function TransferView(_callAction, _toast, _callingSettings, _contactSearchView, _callViewState, _audioSettings, _companyContacts, _transferViewOptions) {
    var _this;
    _classCallCheck(this, TransferView);
    _this = _callSuper(this, TransferView);
    _this._callAction = _callAction;
    _this._toast = _toast;
    _this._callingSettings = _callingSettings;
    _this._contactSearchView = _contactSearchView;
    _this._callViewState = _callViewState;
    _this._audioSettings = _audioSettings;
    _this._companyContacts = _companyContacts;
    _this._transferViewOptions = _transferViewOptions;
    return _this;
  }
  _inherits(TransferView, _RcViewModule);
  return _createClass(TransferView, [{
    key: "trackToVoicemail",
    value: function trackToVoicemail() {}
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$_audioSettings$, _this$_audioSettings, _this$_audioSettings$2, _this$_audioSettings2;
      var call = _ref.call,
        actionsDisabled = _ref.actionsDisabled;
      var state = this._callViewState.getCallViewState(call.telephonySessionId);
      var transferTargetNumber = this.getTransferTargetNumber(call.telephonySessionId);
      return {
        toNumber: state.transferToNumber,
        recipients: state.transferRecipients,
        callVolume: (_this$_audioSettings$ = (_this$_audioSettings = this._audioSettings) === null || _this$_audioSettings === void 0 ? void 0 : _this$_audioSettings.callVolume) !== null && _this$_audioSettings$ !== void 0 ? _this$_audioSettings$ : 1,
        outputDeviceId: (_this$_audioSettings$2 = (_this$_audioSettings2 = this._audioSettings) === null || _this$_audioSettings2 === void 0 ? void 0 : _this$_audioSettings2.outputDeviceId) !== null && _this$_audioSettings$2 !== void 0 ? _this$_audioSettings$2 : '',
        enableWarmTransfer: this._callingSettings.callWith === _services4.callingOptions.browser,
        actionButtonDisabled: actionsDisabled || !transferTargetNumber
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this2 = this;
      var call = _ref2.call;
      var telephonySessionId = call.telephonySessionId;
      return {
        onToNumberChange: function onToNumberChange(val) {
          return _this2._callViewState.setCallViewState(telephonySessionId, {
            transferToNumber: val
          });
        },
        onRecipientsChange: function onRecipientsChange(val) {
          return _this2._callViewState.setCallViewState(telephonySessionId, {
            transferRecipients: val,
            // Clear toNumber when recipients change
            transferToNumber: ''
          });
        },
        onAction: function () {
          var _onAction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(actionType) {
            var _this2$_transferViewO, _this2$_transferViewO2, _this2$_transferViewO3, _this2$_transferViewO4;
            var state, recipients, toNumber, handlers, _this2$_transferViewO5, _this2$_transferViewO6, id, _t;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  state = _this2._callViewState.getCallViewState(telephonySessionId);
                  recipients = state.transferRecipients;
                  toNumber = state.transferToNumber;
                  handlers = _this2._callAction.createActionsHandler(telephonySessionId);
                  _t = actionType;
                  _context.n = _t === 'startWarmTransfer' ? 1 : _t === 'startTransfer' ? 4 : _t === 'startTransferToVoicemail' ? 6 : 7;
                  break;
                case 1:
                  (_this2$_transferViewO = _this2._transferViewOptions) === null || _this2$_transferViewO === void 0 ? void 0 : (_this2$_transferViewO2 = _this2$_transferViewO.onWarmTransferDataTrack) === null || _this2$_transferViewO2 === void 0 ? void 0 : _this2$_transferViewO2.call(_this2$_transferViewO, recipients, toNumber);
                  _context.n = 2;
                  return handlers('startWarmTransfer', _this2.getTransferTargetNumber(telephonySessionId));
                case 2:
                  _context.n = 3;
                  return _this2.cleanTransferUserInput(telephonySessionId);
                case 3:
                  return _context.a(3, 9);
                case 4:
                  (_this2$_transferViewO3 = _this2._transferViewOptions) === null || _this2$_transferViewO3 === void 0 ? void 0 : (_this2$_transferViewO4 = _this2$_transferViewO3.onTransferDataTrack) === null || _this2$_transferViewO4 === void 0 ? void 0 : _this2$_transferViewO4.call(_this2$_transferViewO3, recipients, toNumber);
                  _context.n = 5;
                  return handlers('startTransfer', _this2.getTransferTargetNumber(telephonySessionId));
                case 5:
                  return _context.a(3, 9);
                case 6:
                  _this2.trackToVoicemail();
                  (_this2$_transferViewO5 = _this2._transferViewOptions) === null || _this2$_transferViewO5 === void 0 ? void 0 : (_this2$_transferViewO6 = _this2$_transferViewO5.onToVoicemailDataTrack) === null || _this2$_transferViewO6 === void 0 ? void 0 : _this2$_transferViewO6.call(_this2$_transferViewO5, recipients, toNumber);
                  id = _this2.getToVoiceMailId(telephonySessionId);
                  if (id) {
                    handlers('startTransferToVoicemail', id);
                  } else {
                    _this2._toast.warning({
                      message: (0, _i18n.t)('toVoiceMailError')
                    });
                  }
                  return _context.a(3, 9);
                case 7:
                  _context.n = 8;
                  return handlers(actionType);
                case 8:
                  return _context.a(3, 9);
                case 9:
                  return _context.a(2, false);
              }
            }, _callee);
          }));
          function onAction(_x) {
            return _onAction.apply(this, arguments);
          }
          return onAction;
        }()
      };
    }
  }, {
    key: "cleanTransferUserInput",
    value: function () {
      var _cleanTransferUserInput = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(telephonySessionId) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return this._callViewState.setCallViewState(telephonySessionId, {
                transferRecipients: [],
                transferToNumber: ''
              });
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function cleanTransferUserInput(_x2) {
        return _cleanTransferUserInput.apply(this, arguments);
      }
      return cleanTransferUserInput;
    }()
  }, {
    key: "getTransferTargetNumber",
    value: function getTransferTargetNumber(telephonySessionId) {
      var state = this._callViewState.getCallViewState(telephonySessionId);
      return state.transferRecipients.length > 0 && state.transferRecipients[0].phoneNumber || state.transferToNumber;
    }
  }, {
    key: "getToVoiceMailId",
    value: function getToVoiceMailId(telephonySessionId) {
      var _recipients$;
      var state = this._callViewState.getCallViewState(telephonySessionId);
      var recipients = state.transferRecipients;
      var toNumber = state.transferToNumber;
      var id = undefined;
      //! select a company contact
      if (recipients.length > 0 && ((_recipients$ = recipients[0]) === null || _recipients$ === void 0 ? void 0 : _recipients$.type) === 'company') {
        id = recipients[0].id;
      }

      //! click number on dial pad or use Directly Proceed entry
      else if (recipients.length > 0 && recipients[0].freeSolo || !!toNumber) {
        var _this$_companyContact, _companyContacts$find;
        var companyContacts = ((_this$_companyContact = this._companyContacts) === null || _this$_companyContact === void 0 ? void 0 : _this$_companyContact.data) || [];
        var transferTargetNumber = this.getTransferTargetNumber(telephonySessionId);
        id = (_companyContacts$find = companyContacts.find(function (item) {
          return (item === null || item === void 0 ? void 0 : item.extensionNumber) === transferTargetNumber;
        })) === null || _companyContacts$find === void 0 ? void 0 : _companyContacts$find.id;
      }
      return id;
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this3 = this,
        _this$_transferViewOp,
        _this$_contactSearchV;
      var _useRef = (0, _react.useRef)(this.getUIFunctions(props)),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this3.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var Component = ((_this$_transferViewOp = this._transferViewOptions) === null || _this$_transferViewOp === void 0 ? void 0 : _this$_transferViewOp.component) || _TransferPage.TransferPage;
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions, {
        ContactSearch: (_this$_contactSearchV = this._contactSearchView) === null || _this$_contactSearchV === void 0 ? void 0 : _this$_contactSearchV.component
      }));
    }
  }]);
}(_nextCore.RcViewModule), _applyDecoratedDescriptor(_class2.prototype, "trackToVoicemail", [_dec7, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "trackToVoicemail"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Transfer.view.js.map
