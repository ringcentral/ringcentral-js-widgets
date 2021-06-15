"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IncomingCallUI = void 0;

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _callDirections = _interopRequireDefault(require("ringcentral-integration/enums/callDirections"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var IncomingCallUI = (_dec = (0, _di.Module)({
  name: 'IncomingCallUI',
  deps: ['Webphone', 'Locale', 'ContactSearch', 'RegionSettings', 'ForwardingNumber', 'Brand', 'ExtensionInfo', {
    dep: 'ConferenceCall',
    optional: true
  }, {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'IncomingCallUIOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
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
      var _this$_deps = this._deps,
          webphone = _this$_deps.webphone,
          locale = _this$_deps.locale,
          contactMatcher = _this$_deps.contactMatcher,
          contactSearch = _this$_deps.contactSearch,
          regionSettings = _this$_deps.regionSettings,
          forwardingNumber = _this$_deps.forwardingNumber,
          brand = _this$_deps.brand;
      var currentSession = webphone.ringingCallOnView || {};
      var contactMapping = contactMatcher && contactMatcher.dataMapping;
      var fromMatches = contactMapping && contactMapping[currentSession.from] || [];
      var toMatches = contactMapping && contactMapping[currentSession.to] || [];
      var nameMatches = currentSession.direction === _callDirections["default"].outbound ? toMatches : fromMatches;
      return {
        sourceIcons: sourceIcons,
        brand: brand.fullName,
        nameMatches: nameMatches,
        currentLocale: locale.currentLocale,
        session: currentSession,
        activeSessionId: webphone.activeSessionId,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode,
        forwardingNumbers: forwardingNumber.forwardingNumbers,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        searchContactList: contactSearch.sortedResult,
        showCallQueueName: showCallQueueName
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var phoneTypeRenderer = _ref2.phoneTypeRenderer,
          phoneSourceNameRenderer = _ref2.phoneSourceNameRenderer,
          _ref2$getAvatarUrl = _ref2.getAvatarUrl,
          getAvatarUrl = _ref2$getAvatarUrl === void 0 ? function () {
        return null;
      } : _ref2$getAvatarUrl;
      var _this$_deps2 = this._deps,
          webphone = _this$_deps2.webphone,
          regionSettings = _this$_deps2.regionSettings,
          contactSearch = _this$_deps2.contactSearch,
          extensionInfo = _this$_deps2.extensionInfo,
          conferenceCall = _this$_deps2.conferenceCall;
      return {
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        formatPhone: function formatPhone(phoneNumber) {
          var _extensionInfo$site$c, _extensionInfo$site, _extensionInfo$isMult;

          return (0, _formatNumber["default"])({
            phoneNumber: phoneNumber,
            areaCode: regionSettings.areaCode,
            countryCode: regionSettings.countryCode,
            siteCode: (_extensionInfo$site$c = extensionInfo === null || extensionInfo === void 0 ? void 0 : (_extensionInfo$site = extensionInfo.site) === null || _extensionInfo$site === void 0 ? void 0 : _extensionInfo$site.code) !== null && _extensionInfo$site$c !== void 0 ? _extensionInfo$site$c : '',
            isMultipleSiteEnabled: (_extensionInfo$isMult = extensionInfo === null || extensionInfo === void 0 ? void 0 : extensionInfo.isMultipleSiteEnabled) !== null && _extensionInfo$isMult !== void 0 ? _extensionInfo$isMult : false
          });
        },
        answer: function answer(sessionId) {
          conferenceCall === null || conferenceCall === void 0 ? void 0 : conferenceCall.closeMergingPair();
          webphone.answer(sessionId);
        },
        reject: function reject(sessionId) {
          return webphone.reject(sessionId);
        },
        toVoiceMail: function toVoiceMail(sessionId) {
          return webphone.toVoiceMail(sessionId);
        },
        onForward: function onForward(sessionId, forwardNumber) {
          return webphone.forward(sessionId, forwardNumber);
        },
        replyWithMessage: function replyWithMessage(sessionId, message) {
          return webphone.replyWithMessage(sessionId, message);
        },
        toggleMinimized: function toggleMinimized(sessionId) {
          return webphone.toggleMinimized(sessionId);
        },
        updateSessionMatchedContact: function updateSessionMatchedContact(sessionId, contact) {
          return webphone.updateSessionMatchedContact(sessionId, contact);
        },
        getAvatarUrl: getAvatarUrl,
        hangup: function hangup(sessionId) {
          return webphone.hangup(sessionId);
        },
        onHold: function onHold(sessionId) {
          return webphone.hold(sessionId);
        },
        searchContact: function searchContact(pattern) {
          return contactSearch.debouncedSearch({
            searchString: pattern
          });
        }
      };
    }
  }]);

  return IncomingCallUI;
}(_core.RcUIModuleV2)) || _class);
exports.IncomingCallUI = IncomingCallUI;
//# sourceMappingURL=IncomingCallUI.js.map
