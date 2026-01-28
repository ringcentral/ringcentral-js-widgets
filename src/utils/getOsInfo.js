"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OsType = exports.DeviceType = void 0;
exports.getOsInfo = getOsInfo;
exports.isAndroid = isAndroid;
exports.isIOS = isIOS;
exports.isIPad = isIPad;
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.regexp.exec.js");
var OsType = exports.OsType = /*#__PURE__*/function (OsType) {
  OsType["Mac"] = "MacOS";
  OsType["IOS"] = "iOS";
  OsType["Android"] = "Android";
  OsType["Linux"] = "Linux";
  OsType["Windows"] = "Windows";
  OsType["Unknown"] = "Unknown";
  return OsType;
}({});
var DeviceType = exports.DeviceType = /*#__PURE__*/function (DeviceType) {
  DeviceType["Mac"] = "Mac";
  DeviceType["PC"] = "PC";
  DeviceType["Mobile"] = "Mobile";
  DeviceType["Unknown"] = "Unknown";
  return DeviceType;
}({});
function isIPad() {
  var _userAgentData;
  var platform = global.navigator.platform || ((_userAgentData = global.navigator.userAgentData) === null || _userAgentData === void 0 ? void 0 : _userAgentData.platform);
  var isIpad = /iPad/.test(platform) || platform === 'MacIntel' && navigator.maxTouchPoints >= 1; // iPadOS 13 fix
  return isIpad;
}
function getOsInfo() {
  var OS = OsType.Unknown;
  var Device = DeviceType.Unknown;
  try {
    var _userAgentData2;
    var userAgent = global.navigator.userAgent;
    var platform = global.navigator.platform || ((_userAgentData2 = global.navigator.userAgentData) === null || _userAgentData2 === void 0 ? void 0 : _userAgentData2.platform);
    var macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    var windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    var iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    // for new iOS device, it may return the value like MacIntel.
    // We need to check it if there is a same value for M1 chip device.
    var isIpad = isIPad();
    if (macosPlatforms.indexOf(platform) !== -1 && !isIpad) {
      OS = OsType.Mac;
      Device = DeviceType.Mac;
    } else if (iosPlatforms.indexOf(platform) !== -1 || isIpad) {
      OS = OsType.IOS;
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      OS = OsType.Windows;
      Device = DeviceType.PC;
    } else if (/Android/.test(userAgent)) {
      OS = OsType.Android;
    } else if (/Linux/.test(platform)) {
      OS = OsType.Linux;
    }
    if (/Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent.toLowerCase()) || OS === OsType.IOS) {
      Device = DeviceType.Mobile;
    }
  } catch (err) {
    console.log('get os info error', err);
  }
  return {
    OS: OS,
    Device: Device
  };
}
function isAndroid() {
  return getOsInfo().OS === OsType.Android;
}
function isIOS() {
  return getOsInfo().OS === OsType.IOS;
}
//# sourceMappingURL=getOsInfo.js.map
