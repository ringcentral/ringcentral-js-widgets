"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.object.keys");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConferenceParticipantUI = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _core = require("@ringcentral-integration/core");
var _dec, _class;
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
var ConferenceParticipantUI = (_dec = (0, _di.Module)({
  name: 'ConferenceParticipantUI',
  deps: ['Locale', 'ConferenceCall', 'Webphone', 'RegionSettings', 'RouterInteraction', 'AccountInfo', {
    dep: 'ConferenceParticipantUIOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(ConferenceParticipantUI, _RcUIModuleV);
  var _super = _createSuper(ConferenceParticipantUI);
  function ConferenceParticipantUI(deps) {
    _classCallCheck(this, ConferenceParticipantUI);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(ConferenceParticipantUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _ref$showCallerIdName = _ref.showCallerIdName,
        showCallerIdName = _ref$showCallerIdName === void 0 ? false : _ref$showCallerIdName;
      var participants = this._deps.conferenceCall.partyProfiles;
      var sessionCount = this._deps.webphone.sessions && this._deps.webphone.sessions.length || 0;
      return {
        currentLocale: this._deps.locale.currentLocale,
        participants: participants,
        sessionCount: sessionCount,
        showCallerIdName: showCallerIdName
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this = this;
      return {
        onBackButtonClick: function onBackButtonClick() {
          _this._deps.routerInteraction.goBack();
        },
        removeFunc: function () {
          var _removeFunc = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
            var confId;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    confId = _this._deps.conferenceCall.conferences && Object.keys(_this._deps.conferenceCall.conferences)[0];
                    _context.prev = 1;
                    _context.next = 4;
                    return _this._deps.conferenceCall.removeFromConference(confId, id);
                  case 4:
                    // user action track
                    _this._deps.conferenceCall.removeParticipantClickRemoveTrack();
                    return _context.abrupt("return", true);
                  case 8:
                    _context.prev = 8;
                    _context.t0 = _context["catch"](1);
                    return _context.abrupt("return", false);
                  case 11:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[1, 8]]);
          }));
          function removeFunc(_x) {
            return _removeFunc.apply(this, arguments);
          }
          return removeFunc;
        }(),
        formatPhone: function formatPhone(phoneNumber) {
          return (
            // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
            (0, _formatNumber.formatNumber)({
              phoneNumber: phoneNumber,
              areaCode: _this._deps.regionSettings.areaCode,
              countryCode: _this._deps.regionSettings.countryCode,
              maxExtensionLength: _this._deps.accountInfo.maxExtensionNumberLength
            })
          );
        },
        // user action track functions
        afterOnRemoveBtnClick: function afterOnRemoveBtnClick() {
          return _this._deps.conferenceCall.participantListClickHangupTrack();
        },
        afterOnCancel: function afterOnCancel() {
          return _this._deps.conferenceCall.removeParticipantClickCancelTrack();
        }
      };
    }
  }]);
  return ConferenceParticipantUI;
}(_core.RcUIModuleV2)) || _class);
exports.ConferenceParticipantUI = ConferenceParticipantUI;
//# sourceMappingURL=ConferenceParticipantUI.js.map
