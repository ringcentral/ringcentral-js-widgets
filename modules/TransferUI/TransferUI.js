"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.find");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransferUI = void 0;
require("regenerator-runtime/runtime");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
var _webphoneErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/webphoneErrors"));
var _core = require("@ringcentral-integration/core");
var _dec, _dec2, _dec3, _dec4, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var TransferUI = (_dec = (0, _di.Module)({
  name: 'TransferUI',
  deps: ['Locale', 'RegionSettings', 'RouterInteraction', 'AccountInfo', 'Alert', 'CallingSettings', {
    dep: 'AudioSettings',
    optional: true
  }, {
    dep: 'ContactSearch',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'ActiveCallControl',
    optional: true
  }, {
    dep: 'CompanyContacts',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  var _that$_deps$activeCal, _that$_deps$webphone;
  return [that._params.sessionId, that._params.type, (_that$_deps$activeCal = that._deps.activeCallControl) === null || _that$_deps$activeCal === void 0 ? void 0 : _that$_deps$activeCal.activeSession, (_that$_deps$webphone = that._deps.webphone) === null || _that$_deps$webphone === void 0 ? void 0 : _that$_deps$webphone.sessions];
}), _dec3 = (0, _core.track)(function (that, eventName, contactType) {
  return [eventName, {
    contactType: contactType,
    location: 'Transfer'
  }];
}), _dec4 = (0, _core.track)(_trackEvents.trackEvents.coldTransferCall), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(TransferUI, _RcUIModuleV);
  var _super = _createSuper(TransferUI);
  function TransferUI(deps) {
    var _this;
    _classCallCheck(this, TransferUI);
    _this = _super.call(this, {
      deps: deps
    });
    _this._params = {};
    return _this;
  }
  _createClass(TransferUI, [{
    key: "triggerEventTracking",
    value: function () {
      var _triggerEventTracking = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(eventName, contactType) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      function triggerEventTracking(_x, _x2) {
        return _triggerEventTracking.apply(this, arguments);
      }
      return triggerEventTracking;
    }()
  }, {
    key: "trackTransfer",
    value: function () {
      var _trackTransfer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      function trackTransfer() {
        return _trackTransfer.apply(this, arguments);
      }
      return trackTransfer;
    }()
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this$_deps$audioSett, _this$_deps$audioSett2, _this$_deps$audioSett3, _this$_deps$audioSett4, _this$_deps$companyCo, _this$_deps$contactSe, _this$_deps$activeCal;
      var _ref$params = _ref.params,
        params = _ref$params === void 0 ? {} : _ref$params,
        _ref$enableWarmTransf = _ref.enableWarmTransfer,
        enableWarmTransfer = _ref$enableWarmTransf === void 0 ? false : _ref$enableWarmTransf;
      this._params = params;
      var sessionId = params.sessionId;
      return {
        callVolume: (_this$_deps$audioSett = (_this$_deps$audioSett2 = this._deps.audioSettings) === null || _this$_deps$audioSett2 === void 0 ? void 0 : _this$_deps$audioSett2.callVolume) !== null && _this$_deps$audioSett !== void 0 ? _this$_deps$audioSett : 1,
        outputDeviceId: (_this$_deps$audioSett3 = (_this$_deps$audioSett4 = this._deps.audioSettings) === null || _this$_deps$audioSett4 === void 0 ? void 0 : _this$_deps$audioSett4.outputDeviceId) !== null && _this$_deps$audioSett3 !== void 0 ? _this$_deps$audioSett3 : '',
        companyContacts: (_this$_deps$companyCo = this._deps.companyContacts) === null || _this$_deps$companyCo === void 0 ? void 0 : _this$_deps$companyCo.data,
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
        sessionId: sessionId,
        currentLocale: this._deps.locale.currentLocale,
        searchContactList: (_this$_deps$contactSe = this._deps.contactSearch) === null || _this$_deps$contactSe === void 0 ? void 0 : _this$_deps$contactSe.sortedResult,
        // @ts-expect-error TS(2322): Type 'Partial<ActiveSession> | NormalizedSession |... Remove this comment to see the full error message
        session: this.session,
        controlBusy: ((_this$_deps$activeCal = this._deps.activeCallControl) === null || _this$_deps$activeCal === void 0 ? void 0 : _this$_deps$activeCal.busy) || false,
        enableWarmTransfer: enableWarmTransfer && this._deps.callingSettings.callWith === _CallingSettings.callingOptions.browser
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this2 = this;
      var _ref2$params$type = _ref2.params.type,
        type = _ref2$params$type === void 0 ? 'active' : _ref2$params$type;
      return {
        triggerEventTracking: function triggerEventTracking(eventName, contactType) {
          return _this2.triggerEventTracking(eventName, contactType);
        },
        setActiveSessionId: function setActiveSessionId(sessionId) {
          if (type === 'active') {
            var _this2$_deps$activeCa;
            (_this2$_deps$activeCa = _this2._deps.activeCallControl) === null || _this2$_deps$activeCa === void 0 ? void 0 : _this2$_deps$activeCa.setActiveSessionId(sessionId);
          }
        },
        onTransfer: function onTransfer(transferNumber, sessionId) {
          _this2.trackTransfer();
          if (type === 'active') {
            var _this2$_deps$activeCa2;
            (_this2$_deps$activeCa2 = _this2._deps.activeCallControl) === null || _this2$_deps$activeCa2 === void 0 ? void 0 : _this2$_deps$activeCa2.transfer(transferNumber, sessionId);
            return;
          }
          if (type === 'webphone') {
            var _this2$_deps$webphone;
            (_this2$_deps$webphone = _this2._deps.webphone) === null || _this2$_deps$webphone === void 0 ? void 0 : _this2$_deps$webphone.transfer(transferNumber, sessionId);
          }
        },
        onToVoicemail: function onToVoicemail(voicemailId, sessionId) {
          if (voicemailId) {
            if (type === 'active') {
              var _this2$_deps$activeCa3;
              (_this2$_deps$activeCa3 = _this2._deps.activeCallControl) === null || _this2$_deps$activeCa3 === void 0 ? void 0 : _this2$_deps$activeCa3.toVoicemail(voicemailId, sessionId);
              return;
            }
            if (type === 'webphone') {
              var _this2$_deps$webphone2;
              (_this2$_deps$webphone2 = _this2._deps.webphone) === null || _this2$_deps$webphone2 === void 0 ? void 0 : _this2$_deps$webphone2.toVoiceMail(sessionId);
            }
          } else {
            _this2._deps.alert.warning({
              message: _webphoneErrors["default"].toVoiceMailError
            });
          }
        },
        onWarmTransfer: function onWarmTransfer(transferNumber, sessionId) {
          if (type === 'active') {
            var _this2$_deps$activeCa4;
            (_this2$_deps$activeCa4 = _this2._deps.activeCallControl) === null || _this2$_deps$activeCa4 === void 0 ? void 0 : _this2$_deps$activeCa4.startWarmTransfer(transferNumber, sessionId);
            return;
          }
          if (type === 'webphone') {
            var _this2$_deps$webphone3;
            (_this2$_deps$webphone3 = _this2._deps.webphone) === null || _this2$_deps$webphone3 === void 0 ? void 0 : _this2$_deps$webphone3.startWarmTransfer(transferNumber, sessionId);
          }
        },
        onBack: function onBack() {
          _this2._deps.routerInteraction.goBack();
        },
        onCallEnd: function onCallEnd() {
          _this2._deps.routerInteraction.replace(type === 'active' ? '/calls' : '/dialer');
        },
        formatPhone: function formatPhone(phoneNumber) {
          return (
            // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
            (0, _formatNumber.formatNumber)({
              phoneNumber: phoneNumber,
              areaCode: _this2._deps.regionSettings.areaCode,
              countryCode: _this2._deps.regionSettings.countryCode,
              maxExtensionLength: _this2._deps.accountInfo.maxExtensionNumberLength
            })
          );
        },
        searchContact: function searchContact(searchString) {
          var _this2$_deps$contactS;
          (_this2$_deps$contactS = _this2._deps.contactSearch) === null || _this2$_deps$contactS === void 0 ? void 0 : _this2$_deps$contactS.debouncedSearch({
            searchString: searchString
          });
        }
      };
    }
  }, {
    key: "session",
    get: function get() {
      var _this$_params = this._params,
        sessionId = _this$_params.sessionId,
        _this$_params$type = _this$_params.type,
        type = _this$_params$type === void 0 ? 'active' : _this$_params$type;
      if (type === 'active' && this._deps.activeCallControl) {
        return this._deps.activeCallControl.activeSession;
      }
      if (type === 'webphone' && this._deps.webphone) {
        return this._deps.webphone.sessions.find(function (session) {
          return session.id === sessionId;
        });
      }
      return null;
    }
  }]);
  return TransferUI;
}(_core.RcUIModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "session", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "session"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "triggerEventTracking", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "triggerEventTracking"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "trackTransfer", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "trackTransfer"), _class2.prototype)), _class2)) || _class);
exports.TransferUI = TransferUI;
//# sourceMappingURL=TransferUI.js.map
