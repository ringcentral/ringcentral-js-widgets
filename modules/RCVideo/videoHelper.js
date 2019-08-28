"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVideoSettings = getVideoSettings;
exports.meetingProviderTypes = void 0;
var meetingProviderTypes = {
  meeting: 'RCMeetings',
  video: 'RCVideo'
};
exports.meetingProviderTypes = meetingProviderTypes;

function getVideoSettings() {
  var topic = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var extensionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return {
    name: topic || "".concat(extensionName, "'s Meeting"),
    allowJoinBeforeHost: true
  };
} // TODO: will remove this when google app script could support export seperately
// export together because google app script not fully support export
//# sourceMappingURL=videoHelper.js.map
