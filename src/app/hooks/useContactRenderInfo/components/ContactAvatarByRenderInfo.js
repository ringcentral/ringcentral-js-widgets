"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactAvatarByRenderInfo = void 0;
require("core-js/modules/es.function.name.js");
var _components = require("@ringcentral-integration/micro-contacts/src/app/components");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ContactAvatarByRenderInfo = exports.ContactAvatarByRenderInfo = function ContactAvatarByRenderInfo(_ref) {
  var _renderInfo$matchedCo, _renderInfo$matchedCo2;
  var isConferenceCall = _ref.isConferenceCall,
    isQueue = _ref.isQueue,
    renderInfo = _ref.renderInfo,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'large' : _ref$size;
  if (isConferenceCall) {
    return /*#__PURE__*/_react["default"].createElement(_springUi.Avatar, {
      symbol: _springIcon.ConferenceMd,
      size: size,
      "data-sign": "conferenceAvatar",
      classes: {
        content: 'bg-extra-denim text-neutral-base'
      }
    });
  }
  return /*#__PURE__*/_react["default"].createElement(_components.ContactAvatar, {
    isDepartment: isQueue,
    contact: renderInfo.matchedContact,
    contactName:
    // when be queue number contact, not use the name for render the queue avatar
    ((_renderInfo$matchedCo = renderInfo.matchedContact) === null || _renderInfo$matchedCo === void 0 ? void 0 : _renderInfo$matchedCo.isCallQueueNumber) ? undefined :
    // should use the matched contact name first to prevent using multi matches display name
    ((_renderInfo$matchedCo2 = renderInfo.matchedContact) === null || _renderInfo$matchedCo2 === void 0 ? void 0 : _renderInfo$matchedCo2.name) || (renderInfo.type === 'callerIdName' &&
    // only when not be queue call can use callerId as display avatar
    !isQueue ? renderInfo.displayName : undefined),
    size: size,
    phoneNumber: renderInfo.dialToPhoneNumber,
    "data-sign": "contactAvatar"
  });
};
//# sourceMappingURL=ContactAvatarByRenderInfo.js.map
