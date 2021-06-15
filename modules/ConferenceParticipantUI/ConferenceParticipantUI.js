"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConferenceParticipantUI = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ConferenceParticipantUI = (_dec = (0, _di.Module)({
  name: 'ConferenceParticipantUI',
  deps: ['Locale', 'ConferenceCall', 'Webphone', 'RegionSettings', 'RouterInteraction', {
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
      var _this$_deps = this._deps,
          locale = _this$_deps.locale,
          conferenceCall = _this$_deps.conferenceCall,
          webphone = _this$_deps.webphone;
      var participants = conferenceCall.partyProfiles;
      var sessionCount = webphone.sessions && webphone.sessions.length || 0;
      return {
        currentLocale: locale.currentLocale,
        participants: participants,
        sessionCount: sessionCount
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this$_deps2 = this._deps,
          conferenceCall = _this$_deps2.conferenceCall,
          routerInteraction = _this$_deps2.routerInteraction,
          regionSettings = _this$_deps2.regionSettings;
      return {
        onBackButtonClick: function onBackButtonClick() {
          routerInteraction.goBack();
        },
        removeFunc: function () {
          var _removeFunc = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
            var confId;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    confId = conferenceCall.conferences && Object.keys(conferenceCall.conferences)[0];
                    _context.prev = 1;
                    _context.next = 4;
                    return conferenceCall.removeFromConference(confId, id);

                  case 4:
                    // user action track
                    conferenceCall.removeParticipantClickRemoveTrack();
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
          return (0, _formatNumber["default"])({
            phoneNumber: phoneNumber,
            areaCode: regionSettings.areaCode,
            countryCode: regionSettings.countryCode
          });
        },
        // user action track functions
        afterOnRemoveBtnClick: function afterOnRemoveBtnClick() {
          return conferenceCall.participantListClickHangupTrack();
        },
        afterOnCancel: function afterOnCancel() {
          return conferenceCall.removeParticipantClickCancelTrack();
        }
      };
    }
  }]);

  return ConferenceParticipantUI;
}(_core.RcUIModuleV2)) || _class);
exports.ConferenceParticipantUI = ConferenceParticipantUI;
//# sourceMappingURL=ConferenceParticipantUI.js.map
