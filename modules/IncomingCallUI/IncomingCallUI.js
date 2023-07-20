"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IncomingCallUI = void 0;
var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _core = require("@ringcentral-integration/core");
var _checkShouldHidePhoneNumber = require("../../lib/checkShouldHidePhoneNumber");
var _dec, _dec2, _dec3, _dec4, _class, _class2;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
var IncomingCallUI = (_dec = (0, _di.Module)({
  name: 'IncomingCallUI',
  deps: ['Webphone', 'Locale', 'ContactSearch', 'RegionSettings', 'ForwardingNumber', 'Brand', 'ExtensionInfo', 'AppFeatures', 'AccountInfo', {
    dep: 'ConferenceCall',
    optional: true
  }, {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'IncomingCallUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.webphone.ringingCallOnView];
}), _dec3 = (0, _core.computed)(function (that) {
  var _that$_deps$contactMa;
  return [that.currentSession.from, (_that$_deps$contactMa = that._deps.contactMatcher) === null || _that$_deps$contactMa === void 0 ? void 0 : _that$_deps$contactMa.dataMapping];
}), _dec4 = (0, _core.computed)(function (that) {
  var _that$_deps$contactMa2;
  return [that.currentSession.to, (_that$_deps$contactMa2 = that._deps.contactMatcher) === null || _that$_deps$contactMa2 === void 0 ? void 0 : _that$_deps$contactMa2.dataMapping];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(IncomingCallUI, _RcUIModuleV);
  var _super = _createSuper(IncomingCallUI);
  function IncomingCallUI(deps) {
    _classCallCheck(this, IncomingCallUI);
    return _super.call(this, {
      deps: deps
    });
  }
  _createClass(IncomingCallUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _ref$showContactDispl = _ref.showContactDisplayPlaceholder,
        showContactDisplayPlaceholder = _ref$showContactDispl === void 0 ? false : _ref$showContactDispl,
        showCallQueueName = _ref.showCallQueueName,
        sourceIcons = _ref.sourceIcons;
      return {
        sourceIcons: sourceIcons,
        brand: this._deps.brand.name,
        nameMatches: this.nameMatches,
        currentLocale: this._deps.locale.currentLocale,
        session: this.currentSession,
        activeSessionId: this._deps.webphone.activeSessionId,
        areaCode: this._deps.regionSettings.areaCode,
        countryCode: this._deps.regionSettings.countryCode,
        forwardingNumbers: this._deps.forwardingNumber.forwardingNumbers,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        searchContactList: this._deps.contactSearch.sortedResult,
        showCallQueueName: showCallQueueName,
        phoneNumber: this.phoneNumber,
        name: this.name
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this = this;
      var phoneTypeRenderer = _ref2.phoneTypeRenderer,
        phoneSourceNameRenderer = _ref2.phoneSourceNameRenderer,
        _ref2$getAvatarUrl = _ref2.getAvatarUrl,
        getAvatarUrl = _ref2$getAvatarUrl === void 0 ? function () {
          return null;
        } : _ref2$getAvatarUrl;
      return {
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        formatPhone: function formatPhone(phoneNumber) {
          var _this$_deps$extension, _this$_deps$extension2, _this$_deps$extension3, _this$_deps$extension4, _this$_deps$extension5;
          return (
            // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
            (0, _formatNumber.formatNumber)({
              phoneNumber: phoneNumber,
              areaCode: _this._deps.regionSettings.areaCode,
              countryCode: _this._deps.regionSettings.countryCode,
              siteCode: (_this$_deps$extension = (_this$_deps$extension2 = _this._deps.extensionInfo) === null || _this$_deps$extension2 === void 0 ? void 0 : (_this$_deps$extension3 = _this$_deps$extension2.site) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.code) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : '',
              isMultipleSiteEnabled: (_this$_deps$extension4 = (_this$_deps$extension5 = _this._deps.extensionInfo) === null || _this$_deps$extension5 === void 0 ? void 0 : _this$_deps$extension5.isMultipleSiteEnabled) !== null && _this$_deps$extension4 !== void 0 ? _this$_deps$extension4 : false,
              maxExtensionLength: _this._deps.accountInfo.maxExtensionNumberLength
            })
          );
        },
        answer: function answer(sessionId) {
          var _this$_deps$conferenc;
          (_this$_deps$conferenc = _this._deps.conferenceCall) === null || _this$_deps$conferenc === void 0 ? void 0 : _this$_deps$conferenc.closeMergingPair();
          _this._deps.webphone.answer(sessionId);
        },
        reject: function reject(sessionId) {
          return _this._deps.webphone.reject(sessionId);
        },
        toVoiceMail: function toVoiceMail(sessionId) {
          return _this._deps.webphone.toVoiceMail(sessionId);
        },
        onForward: function onForward(sessionId, forwardNumber) {
          return _this._deps.webphone.forward(sessionId, forwardNumber);
        },
        replyWithMessage: function replyWithMessage(sessionId, message) {
          return _this._deps.webphone.replyWithMessage(sessionId, message);
        },
        toggleMinimized: function toggleMinimized(sessionId) {
          return _this._deps.webphone.toggleMinimized(sessionId);
        },
        updateSessionMatchedContact: function updateSessionMatchedContact(sessionId, contact) {
          return _this._deps.webphone.updateSessionMatchedContact(sessionId, contact);
        },
        getAvatarUrl: getAvatarUrl,
        hangup: function hangup(sessionId) {
          return _this._deps.webphone.hangup(sessionId);
        },
        onHold: function onHold(sessionId) {
          return _this._deps.webphone.hold(sessionId);
        },
        searchContact: function searchContact(pattern) {
          return _this._deps.contactSearch.debouncedSearch({
            searchString: pattern
          });
        }
      };
    }
  }, {
    key: "currentSession",
    get: function get() {
      var _this$_deps$webphone$;
      return (_this$_deps$webphone$ = this._deps.webphone.ringingCallOnView) !== null && _this$_deps$webphone$ !== void 0 ? _this$_deps$webphone$ : {};
    }
  }, {
    key: "fromMatches",
    get: function get() {
      var _this$_deps$contactMa, _this$_deps$contactMa2;
      return (_this$_deps$contactMa = (_this$_deps$contactMa2 = this._deps.contactMatcher) === null || _this$_deps$contactMa2 === void 0 ? void 0 : _this$_deps$contactMa2.dataMapping[this.currentSession.from]) !== null && _this$_deps$contactMa !== void 0 ? _this$_deps$contactMa : [];
    }
  }, {
    key: "toMatches",
    get: function get() {
      var _this$_deps$contactMa3, _this$_deps$contactMa4;
      return (_this$_deps$contactMa3 = (_this$_deps$contactMa4 = this._deps.contactMatcher) === null || _this$_deps$contactMa4 === void 0 ? void 0 : _this$_deps$contactMa4.dataMapping[this.currentSession.to]) !== null && _this$_deps$contactMa3 !== void 0 ? _this$_deps$contactMa3 : [];
    }
  }, {
    key: "nameMatches",
    get: function get() {
      var nameMatches = this.currentSession.direction === _callDirections["default"].outbound ? this.toMatches : this.fromMatches;
      return nameMatches;
    }
  }, {
    key: "phoneNumber",
    get: function get() {
      var phoneNumber = this.currentSession.direction === _callDirections["default"].outbound ? this.currentSession.to : this.currentSession.from;
      if (this._deps.appFeatures.isCDCEnabled && (0, _checkShouldHidePhoneNumber.checkShouldHidePhoneNumber)(phoneNumber, this.nameMatches)) {
        return null;
      }
      return phoneNumber;
    }
  }, {
    key: "name",
    get: function get() {
      return (0, _callLogHelpers.getWebphoneSessionDisplayName)(this.currentSession);
    }
  }]);
  return IncomingCallUI;
}(_core.RcUIModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "currentSession", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "currentSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fromMatches", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "fromMatches"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toMatches", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "toMatches"), _class2.prototype)), _class2)) || _class);
exports.IncomingCallUI = IncomingCallUI;
//# sourceMappingURL=IncomingCallUI.js.map
