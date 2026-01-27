"use strict";

require("core-js/modules/es.array.find.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExtensionName = getExtensionName;
exports.getHostId = getHostId;
exports.getRcvUriRegExp = exports.getRcmUriRegExp = void 0;
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
var _ramda = require("ramda");
function getExtensionName(_ref) {
  var extensionInfo = _ref.extensionInfo,
    enableScheduleOnBehalf = _ref.enableScheduleOnBehalf,
    meeting = _ref.meeting,
    delegators = _ref.delegators;
  var extensionName = extensionInfo.info.name || '';
  if (!enableScheduleOnBehalf || !meeting || !delegators || delegators.length === 0) {
    return extensionName;
  }
  var currentHost = "".concat(meeting.host && meeting.host.id || '');
  var user = (0, _ramda.find)(function (item) {
    return item.id === currentHost;
  }, delegators);
  return user && user.id !== "".concat(extensionInfo.info.id) ? user.name : extensionName;
}
function getHostId(_ref2) {
  var _meeting$host;
  var enableScheduleOnBehalf = _ref2.enableScheduleOnBehalf,
    meeting = _ref2.meeting,
    extensionInfo = _ref2.extensionInfo;
  if (enableScheduleOnBehalf && (meeting === null || meeting === void 0 ? void 0 : (_meeting$host = meeting.host) === null || _meeting$host === void 0 ? void 0 : _meeting$host.id)) {
    return "".concat(meeting.host.id);
  }
  return "".concat(extensionInfo.info.id) || '';
}
var getRcmUriRegExp = exports.getRcmUriRegExp = function getRcmUriRegExp(regExpText) {
  return new RegExp("(https?):\\/\\/".concat(regExpText, "(\\/\\w+)?(\\/(\\d+))(\\?pwd=\\w+)?"), 'i');
};

// Regular expression for RingCentral Video meeting URLs, support pmn
// Examples:
// - https://v.ringcentral.com/join/123456789
// - https://v.ringcentral.com/join/asd.f-_?pw=1234
var getRcvUriRegExp = exports.getRcvUriRegExp = function getRcvUriRegExp(regExpText) {
  return new RegExp("(https?):\\/\\/".concat(regExpText, "(\\/{1,2}\\w+)*(\\/{1,2}(\\w|\\.)+)(\\?pw=\\w+)?"), 'i');
};
//# sourceMappingURL=helper.js.map
