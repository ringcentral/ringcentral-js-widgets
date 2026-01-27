"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTabMap = void 0;
var _CallHistory = _interopRequireDefault(require("@ringcentral-integration/widgets/assets/images/CallHistory.svg"));
var _CallHistoryHover = _interopRequireDefault(require("@ringcentral-integration/widgets/assets/images/CallHistoryHover.svg"));
var _Calls = _interopRequireDefault(require("@ringcentral-integration/widgets/assets/images/Calls.svg"));
var _CallsHover = _interopRequireDefault(require("@ringcentral-integration/widgets/assets/images/CallsHover.svg"));
var _Contact = _interopRequireDefault(require("@ringcentral-integration/widgets/assets/images/Contact.svg"));
var _ContactHover = _interopRequireDefault(require("@ringcentral-integration/widgets/assets/images/ContactHover.svg"));
var _ContactsNavigation = _interopRequireDefault(require("@ringcentral-integration/widgets/assets/images/ContactsNavigation.svg"));
var _DialPadHover = _interopRequireDefault(require("@ringcentral-integration/widgets/assets/images/DialPadHover.svg"));
var _DialPadNav = _interopRequireDefault(require("@ringcentral-integration/widgets/assets/images/DialPadNav.svg"));
var _MeetingNavigation = _interopRequireDefault(require("@ringcentral-integration/widgets/assets/images/MeetingNavigation.svg"));
var _Messages = _interopRequireDefault(require("@ringcentral-integration/widgets/assets/images/Messages.svg"));
var _MessagesHover = _interopRequireDefault(require("@ringcentral-integration/widgets/assets/images/MessagesHover.svg"));
var _SettingsNavigation = _interopRequireDefault(require("@ringcentral-integration/widgets/assets/images/SettingsNavigation.svg"));
var _Settings = _interopRequireDefault(require("@ringcentral/juno-icon/es6/Settings.js"));
var _SettingsBorder = _interopRequireDefault(require("@ringcentral/juno-icon/es6/SettingsBorder.js"));
var _Videocam = _interopRequireDefault(require("@ringcentral/juno-icon/es6/Videocam.js"));
var _VideocamBorder = _interopRequireDefault(require("@ringcentral/juno-icon/es6/VideocamBorder.js"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _templateObject, _templateObject2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
// TODO: should not set color in svg fill any more when switch to Juno icon or ready icon
var StyledContactIcon = (0, _styledComponents["default"])(_Contact["default"])(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  path {\n    fill: currentColor !important;\n  }\n"])));
var StyledContactHoverIcon = (0, _styledComponents["default"])(_ContactHover["default"])(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  path {\n    fill: currentColor !important;\n  }\n"])));
var defaultTabMap = exports.defaultTabMap = {
  dialer: {
    symbol: _DialPadNav["default"],
    activeSymbol: _DialPadHover["default"]
  },
  calls: {
    symbol: _Calls["default"],
    activeSymbol: _CallsHover["default"]
  },
  history: {
    symbol: _CallHistory["default"],
    activeSymbol: _CallHistoryHover["default"]
  },
  messages: {
    symbol: _Messages["default"],
    activeSymbol: _MessagesHover["default"]
  },
  contacts: {
    // symbol: ContactsBorder,
    // activeSymbol: Contacts,
    symbol: StyledContactIcon,
    activeSymbol: StyledContactHoverIcon,
    moreMenuSymbol: _ContactsNavigation["default"]
  },
  meeting: {
    symbol: _VideocamBorder["default"],
    activeSymbol: _Videocam["default"],
    moreMenuSymbol: _MeetingNavigation["default"]
  },
  settings: {
    symbol: _SettingsBorder["default"],
    activeSymbol: _Settings["default"],
    moreMenuSymbol: _SettingsNavigation["default"]
  }
};
//# sourceMappingURL=tabs.js.map
