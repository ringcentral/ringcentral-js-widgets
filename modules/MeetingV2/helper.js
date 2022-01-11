"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExtensionName = getExtensionName;
exports.getHostId = getHostId;
exports.getRcvUriRegExp = exports.getRcmUriRegExp = void 0;

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.function.name");

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

var getRcmUriRegExp = function getRcmUriRegExp(regExpText) {
  return new RegExp("(https?):\\/\\/".concat(regExpText, "(\\/\\w+)?(\\/(\\d+))(\\?pwd=\\w+)?"), 'i');
};

exports.getRcmUriRegExp = getRcmUriRegExp;

var getRcvUriRegExp = function getRcvUriRegExp(regExpText) {
  return new RegExp("(https?):\\/\\/".concat(regExpText, "(\\/{1,2}\\w+)*(\\/{1,2}(\\d+))(\\?pw=\\w{32})?"), 'i');
};

exports.getRcvUriRegExp = getRcvUriRegExp;
//# sourceMappingURL=helper.js.map
