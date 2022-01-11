"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleCallControlUI = void 0;

require("core-js/modules/es6.function.name");

var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));

var _di = require("@ringcentral-integration/commons/lib/di");

var _core = require("@ringcentral-integration/core");

var _i18n = _interopRequireDefault(require("../../components/SimpleCallControlPanel/i18n"));

var _utils = require("../../components/SimpleCallControlPanel/utils");

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SimpleCallControlUI = (_dec = (0, _di.Module)({
  name: 'SimpleCallControlUI',
  deps: ['Locale', 'RouterInteraction', 'Brand', 'RegionSettings', 'ActiveCallControl', {
    dep: 'SimpleCallControlUIOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(SimpleCallControlUI, _RcUIModuleV);

  var _super = _createSuper(SimpleCallControlUI);

  function SimpleCallControlUI(deps) {
    _classCallCheck(this, SimpleCallControlUI);

    return _super.call(this, {
      deps: deps
    });
  }

  _createClass(SimpleCallControlUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var sessionId = _ref.params.sessionId,
          renderContactName = _ref.renderContactName;
      var _this$_deps = this._deps,
          activeCallControl = _this$_deps.activeCallControl,
          regionSettings = _this$_deps.regionSettings,
          locale = _this$_deps.locale,
          brand = _this$_deps.brand;
      var activeSession = activeCallControl.activeSession;
      var nameMatches = [];

      if (activeSession && !renderContactName) {
        // TODO: check activeSession type
        nameMatches = activeSession.direction === _callDirections["default"].outbound ? activeSession.toMatches : activeSession.fromMatches;
      }

      var phoneNumber;

      if (activeSession) {
        phoneNumber = activeSession.direction === _callDirections["default"].outbound ? activeSession.to : activeSession.from;
      }

      var fallBackName = _i18n["default"].getString('Unknown', locale.currentLocale);

      if (renderContactName) {
        var _pickFallBackInfo = (0, _utils.pickFallBackInfo)(activeSession, renderContactName({
          sessionId: activeSession && activeSession.sessionId,
          telephonySessionId: sessionId
        }), locale.currentLocale),
            fallBackNameFromThirdParty = _pickFallBackInfo.fallBackName,
            fallBackNumber = _pickFallBackInfo.fallBackNumber;

        phoneNumber = fallBackNumber;
        fallBackName = fallBackNameFromThirdParty;
      }

      return {
        currentLocale: locale.currentLocale,
        activeSession: activeSession,
        sessionId: sessionId,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode,
        nameMatches: nameMatches,
        phoneNumber: phoneNumber,
        fallBackName: fallBackName,
        brandName: brand.name,
        controlBusy: activeCallControl.busy
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this = this;

      var sessionId = _ref2.params.sessionId;
      return {
        onBackButtonClick: function onBackButtonClick() {
          _this._deps.routerInteraction.goBack();
        },
        setActiveSessionId: function setActiveSessionId(sessionId) {
          _this._deps.activeCallControl.setActiveSessionId(sessionId);
        },
        onTransfer: function onTransfer(sessionId) {
          _this._deps.routerInteraction.push("/transfer/".concat(sessionId, "/active"));
        },
        onMute: function onMute() {
          return _this._deps.activeCallControl.mute(sessionId);
        },
        onUnmute: function onUnmute() {
          return _this._deps.activeCallControl.unmute(sessionId);
        },
        onHold: function onHold() {
          return _this._deps.activeCallControl.hold(sessionId);
        },
        onUnhold: function onUnhold() {
          return _this._deps.activeCallControl.unhold(sessionId);
        },
        onHangup: function onHangup() {
          return _this._deps.activeCallControl.hangUp(sessionId);
        }
      };
    }
  }]);

  return SimpleCallControlUI;
}(_core.RcUIModuleV2)) || _class);
exports.SimpleCallControlUI = SimpleCallControlUI;
//# sourceMappingURL=SimpleCallControlUI.js.map
