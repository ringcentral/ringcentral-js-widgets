"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
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
    value: function getUIProps() {
      var participants = this._deps.conferenceCall.partyProfiles;
      var sessionCount = this._deps.webphone.sessions && this._deps.webphone.sessions.length || 0;
      return {
        currentLocale: this._deps.locale.currentLocale,
        participants: participants,
        sessionCount: sessionCount
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
