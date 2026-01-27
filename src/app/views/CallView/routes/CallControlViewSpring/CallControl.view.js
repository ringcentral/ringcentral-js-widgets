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
exports.CallControlView = void 0;
exports.getLastCallInfoFromWebphoneSession = getLastCallInfoFromWebphoneSession;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _calleeTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/calleeTypes"));
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _react = _interopRequireWildcard(require("react"));
var _services2 = require("../../../../services");
var _AudioCardViewSpring = require("../AudioCardViewSpring");
var _CallControlPanel = require("./CallControlPanel");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function getLastCallInfoFromWebphoneSession(webphoneSession) {
  var sessionNumber = webphoneSession.direction === _callDirections["default"].outbound ? webphoneSession.to : webphoneSession.from;
  var sessionStatus = webphoneSession.callStatus;
  var matchedContact = webphoneSession.contactMatch;
  var calleeType = matchedContact ? _calleeTypes["default"].contacts : _calleeTypes["default"].unknown;
  return {
    calleeType: calleeType,
    avatarUrl: matchedContact && matchedContact.profileImageUrl,
    name: matchedContact && matchedContact.name,
    status: sessionStatus,
    phoneNumber: sessionNumber
  };
}
var CallControlView = exports.CallControlView = (_dec = (0, _nextCore.injectable)({
  name: 'CallControlView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('CallControlViewOptions')(target, undefined, 8);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services2.CallAction === "undefined" ? Object : _services2.CallAction, typeof _services2.CallingSettings === "undefined" ? Object : _services2.CallingSettings, typeof _services2.ActiveCallControl === "undefined" ? Object : _services2.ActiveCallControl, typeof _services2.ForwardingNumber === "undefined" ? Object : _services2.ForwardingNumber, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _nextCore.Root === "undefined" ? Object : _nextCore.Root, typeof _views.SyncTabView === "undefined" ? Object : _views.SyncTabView, typeof _AudioCardViewSpring.AudioCardView === "undefined" ? Object : _AudioCardViewSpring.AudioCardView, typeof CallControlViewOptions === "undefined" ? Object : CallControlViewOptions]), _dec5 = Reflect.metadata("design:type", typeof AiNoteTipsMap === "undefined" ? Object : AiNoteTipsMap), _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [String]), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [String]), _dec0 = (0, _nextCore.delegate)('server'), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [String]), _dec11 = (0, _nextCore.delegate)('server'), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", [String]), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function CallControlView(_callAction, _callingSettings, _activeCallControl, _forwardingNumber, _appFeatures, _root, _syncTabView, _audioCardView, _callControlViewOptions) {
    var _this;
    _classCallCheck(this, CallControlView);
    _this = _callSuper(this, CallControlView);
    _this._callAction = _callAction;
    _this._callingSettings = _callingSettings;
    _this._activeCallControl = _activeCallControl;
    _this._forwardingNumber = _forwardingNumber;
    _this._appFeatures = _appFeatures;
    _this._root = _root;
    _this._syncTabView = _syncTabView;
    _this._audioCardView = _audioCardView;
    _this._callControlViewOptions = _callControlViewOptions;
    _initializerDefineProperty(_this, "aiNoteTipsDisplayStatusMap", _descriptor, _this);
    return _this;
  }
  _inherits(CallControlView, _RcViewModule);
  return _createClass(CallControlView, [{
    key: "_updateAiNoteTipsDisplayStatusMap",
    value: function _updateAiNoteTipsDisplayStatusMap(telephonySessionId) {
      this.aiNoteTipsDisplayStatusMap[telephonySessionId] = true;
    }
  }, {
    key: "_deleteAiNoteTipsDisplayStatusMap",
    value: function _deleteAiNoteTipsDisplayStatusMap(telephonySessionId) {
      delete this.aiNoteTipsDisplayStatusMap[telephonySessionId];
    }
  }, {
    key: "updateAiNoteTipsDisplayStatusMap",
    value: function () {
      var _updateAiNoteTipsDisplayStatusMap2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(telephonySessionId) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._updateAiNoteTipsDisplayStatusMap(telephonySessionId);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function updateAiNoteTipsDisplayStatusMap(_x) {
        return _updateAiNoteTipsDisplayStatusMap2.apply(this, arguments);
      }
      return updateAiNoteTipsDisplayStatusMap;
    }()
  }, {
    key: "deleteAiNoteTipsDisplayStatusMap",
    value: function () {
      var _deleteAiNoteTipsDisplayStatusMap2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(telephonySessionId) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._deleteAiNoteTipsDisplayStatusMap(telephonySessionId);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function deleteAiNoteTipsDisplayStatusMap(_x2) {
        return _deleteAiNoteTipsDisplayStatusMap2.apply(this, arguments);
      }
      return deleteAiNoteTipsDisplayStatusMap;
    }()
  }, {
    key: "useCallActions",
    value: function useCallActions(_ref) {
      var _this2 = this;
      var call = _ref.call,
        actionsDisabled = _ref.actionsDisabled;
      var telephonySessionId = call.telephonySessionId;
      var _useConnector = (0, _nextCore.useConnector)(function () {
          return {
            enableSmartNotes: _this2._callAction.enableSmartNotes,
            isCurrentAiNotesLoading: _this2._callAction.isCurrentAiNotesLoading,
            isCurrentAiNotesPauseable: _this2._callAction.isCurrentAiNotesPauseable,
            session: _this2._activeCallControl.getActiveSession(telephonySessionId),
            flipNumbers: _this2._forwardingNumber.flipNumbers,
            isWebphoneMode: _this2._callingSettings.isWebphoneMode,
            hasCallRecordingPermission: _this2._appFeatures.hasCallRecordingPermission
          };
        }),
        session = _useConnector.session,
        isWebphoneMode = _useConnector.isWebphoneMode,
        hasCallRecordingPermission = _useConnector.hasCallRecordingPermission,
        enableSmartNotes = _useConnector.enableSmartNotes,
        isCurrentAiNotesPauseable = _useConnector.isCurrentAiNotesPauseable,
        isCurrentAiNotesLoading = _useConnector.isCurrentAiNotesLoading;
      var preinsert = (0, _services2.isPreinsertCall)(call);
      var otherDevice = (0, _services2.isOtherDeviceCall)(call);
      if (!session && !preinsert) return [];
      var _ref2 = session || {},
        _ref2$isOnMute = _ref2.isOnMute,
        isOnMute = _ref2$isOnMute === void 0 ? false : _ref2$isOnMute,
        _ref2$isOnHold = _ref2.isOnHold,
        isOnHold = _ref2$isOnHold === void 0 ? false : _ref2$isOnHold,
        recordStatus = _ref2.recordStatus;
      var warmTransferInfo = call.warmTransferInfo;
      var muteDisabled = isOnHold || actionsDisabled;
      var transferring = Boolean(warmTransferInfo);
      var addButton = this._activeCallControl.skipConferenceCall ? [] : [{
        type: 'add',
        disabled: !isWebphoneMode || transferring || actionsDisabled
      }];
      var audioButton = otherDevice || !this._audioCardView.enabled ? [] : [{
        type: 'audio',
        disabled: actionsDisabled
      }];
      var actions = [{
        type: isOnMute ? 'unmute' : 'mute',
        disabled: muteDisabled
      }, {
        type: 'keypad',
        disabled: !isWebphoneMode
      }].concat(audioButton, addButton, [{
        type: isOnHold ? 'unHold' : 'hold',
        disabled: actionsDisabled
      }]);

      /* --------------------- Transfer --------------------------- */
      actions.push({
        type: 'transfer',
        disabled: transferring || actionsDisabled || call.isConferenceCall
      });

      /* --------------------- Record --------------------------- */

      var isRecording = recordStatus === _services2.recordStatus.recording;
      var recordCtrlDisabled = isOnHold || recordStatus === _services2.recordStatus.pending || recordStatus === _services2.recordStatus.noAccess || actionsDisabled || !isWebphoneMode || !hasCallRecordingPermission;
      actions.push(isRecording ? {
        type: 'stopRecord',
        disabled: recordCtrlDisabled
      } : {
        type: 'record',
        disabled: recordCtrlDisabled
      });
      /* --------------------- Flip --------------------------- */

      // actions.push({
      //   type: 'flip',
      //   disabled:
      //     !isWebphoneMode ||
      //     transferring ||
      //     isConferenceCall ||
      //     isOnHold ||
      //     flipNumbers.length === 0 ||
      //     actionsDisabled,
      // });

      /* --------------------- Park --------------------------- */
      // if (showPark) {
      // actions.push({
      //   type: 'park',
      //   disabled: disableControlButton || actionsDisabled || !isWebphoneMode,
      // });
      // }

      if (enableSmartNotes) {
        actions.push({
          type: isCurrentAiNotesPauseable ? 'stopNotes' : 'aiNotes',
          disabled: isCurrentAiNotesLoading || actionsDisabled
        });
      }
      actions.push({
        type: 'hangUp',
        disabled: preinsert ? false : actionsDisabled
      });
      return actions;
    }
  }, {
    key: "currentAiNoteTipType",
    get: function get() {
      return this._callAction.isCurrentAiNotesPauseable ? 'viewAiNote' : 'aiNoteStopped';
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref3) {
      var call = _ref3.call;
      var displayAiNoteTip = this.aiNoteTipsDisplayStatusMap[call.telephonySessionId];
      var aiNoteTipType = displayAiNoteTip ? this.currentAiNoteTipType : undefined;
      return {
        call: call,
        aiNoteTipType: aiNoteTipType,
        flipNumbers: this._forwardingNumber.flipNumbers,
        expanded: this._root.expanded
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref4) {
      var _this3 = this;
      var call = _ref4.call;
      var telephonySessionId = call.telephonySessionId;
      var onAction = /*#__PURE__*/function () {
        var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(actionType) {
          var handler,
            _this3$_syncTabView$t,
            _this3$_syncTabView$t2,
            result,
            _this3$_syncTabView$t3,
            _this3$_syncTabView$t4,
            _result,
            _len,
            args,
            _key,
            _args3 = arguments,
            _t;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                handler = _this3._callAction.createActionsHandler(telephonySessionId);
                _t = actionType;
                _context3.n = _t === 'stopNotes' ? 1 : _t === 'aiNotes' ? 3 : 5;
                break;
              case 1:
                _context3.n = 2;
                return handler('stopNotes');
              case 2:
                result = _context3.v;
                if (result && !_this3._root.expanded || ((_this3$_syncTabView$t = _this3._syncTabView.tabInfo) === null || _this3$_syncTabView$t === void 0 ? void 0 : (_this3$_syncTabView$t2 = _this3$_syncTabView$t[_views.SyncTabId.CALL_LOG]) === null || _this3$_syncTabView$t2 === void 0 ? void 0 : _this3$_syncTabView$t2.active) !== _views.CallLogSyncTabId.AI_NOTE) {
                  _this3.updateAiNoteTipsDisplayStatusMap(telephonySessionId);
                }
                return _context3.a(2, result);
              case 3:
                _context3.n = 4;
                return handler('aiNotes');
              case 4:
                _result = _context3.v;
                if (_result && (!_this3._root.expanded || ((_this3$_syncTabView$t3 = _this3._syncTabView.tabInfo) === null || _this3$_syncTabView$t3 === void 0 ? void 0 : (_this3$_syncTabView$t4 = _this3$_syncTabView$t3[_views.SyncTabId.CALL_LOG]) === null || _this3$_syncTabView$t4 === void 0 ? void 0 : _this3$_syncTabView$t4.active) !== _views.CallLogSyncTabId.AI_NOTE)) {
                  _this3.updateAiNoteTipsDisplayStatusMap(telephonySessionId);
                }
                return _context3.a(2, _result);
              case 5:
                for (_len = _args3.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = _args3[_key];
                }
                _context3.n = 6;
                return handler.apply(void 0, [actionType].concat(args));
              case 6:
                return _context3.a(3, 7);
              case 7:
                return _context3.a(2);
            }
          }, _callee3);
        }));
        return function onAction(_x3) {
          return _ref5.apply(this, arguments);
        };
      }();
      var toggleExpanded = this._callAction.toggleExpanded;
      return {
        onAction: onAction,
        viewAiNote: function viewAiNote() {
          if (!_this3._root.expanded) {
            toggleExpanded === null || toggleExpanded === void 0 ? void 0 : toggleExpanded(telephonySessionId);
          }
          _this3._syncTabView.replaceActive(_views.SyncTabId.CALL_LOG, _views.CallLogSyncTabId.AI_NOTE);
        },
        onCloseAiNoteTip: function onCloseAiNoteTip() {
          _this3.deleteAiNoteTipsDisplayStatusMap(telephonySessionId);
        },
        onExpand: toggleExpanded ? function () {
          return toggleExpanded(telephonySessionId);
        } : undefined
      };
    }
  }, {
    key: "useTransferringCalls",
    value: function useTransferringCalls(props) {
      var _this4 = this;
      var call = props.call;
      var warmTransferInfo = call.warmTransferInfo;
      var relatedCall = (0, _nextCore.useConnector)(function () {
        var _this4$_callAction$ge;
        var relatedTelephonySessionId = warmTransferInfo === null || warmTransferInfo === void 0 ? void 0 : warmTransferInfo.relatedTelephonySessionId;
        if (!relatedTelephonySessionId) return null;
        return (_this4$_callAction$ge = _this4._callAction.getAllInfoByTelephonySessionId(relatedTelephonySessionId)) === null || _this4$_callAction$ge === void 0 ? void 0 : _this4$_callAction$ge.call;
      });
      var isOriginal = relatedCall && (warmTransferInfo === null || warmTransferInfo === void 0 ? void 0 : warmTransferInfo.isOriginal);
      var transferringCalls = (0, _react.useMemo)(function () {
        return relatedCall ? isOriginal ? [relatedCall, call] : [call, relatedCall] : null;
      }, [call, relatedCall, isOriginal]);
      return transferringCalls;
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this5 = this,
        _this$_callControlVie;
      var uiFunctions = (0, _react.useMemo)(function () {
        return _this5.getUIFunctions(props);
      }, [props]);
      var actions = this.useCallActions(props);
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this5.getUIProps(props);
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      var transferringCalls = this.useTransferringCalls(props);
      var Component = ((_this$_callControlVie = this._callControlViewOptions) === null || _this$_callControlVie === void 0 ? void 0 : _this$_callControlVie.component) || _CallControlPanel.CallControlPanel;
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, {
        transferringCalls: transferringCalls,
        actions: actions
      }, uiFunctions, {
        AudioCardComponent: /*#__PURE__*/_react["default"].createElement(this._audioCardView.component, null)
      }));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "aiNoteTipsDisplayStatusMap", [_nextCore.state, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_updateAiNoteTipsDisplayStatusMap", [_nextCore.action, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateAiNoteTipsDisplayStatusMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_deleteAiNoteTipsDisplayStatusMap", [_nextCore.action, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "_deleteAiNoteTipsDisplayStatusMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateAiNoteTipsDisplayStatusMap", [_dec0, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "updateAiNoteTipsDisplayStatusMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteAiNoteTipsDisplayStatusMap", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteAiNoteTipsDisplayStatusMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentAiNoteTipType", [_nextCore.computed, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "currentAiNoteTipType"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=CallControl.view.js.map
