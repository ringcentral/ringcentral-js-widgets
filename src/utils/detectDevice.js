"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOSType = getOSType;
exports.isMobile = void 0;
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.regexp.exec.js");
var isMobile = exports.isMobile = function isMobile() {
  var userAgent = global.navigator.userAgent.toLowerCase();
  var platform = global.navigator.platform;
  // for new iOS device, it may return the value like MacIntel.
  // We need to check it if there is a same value for M1 chip device.
  var isIOS = /iPad|iPhone|iPod/.test(platform) || platform === 'MacIntel' && navigator.maxTouchPoints >= 1; // change '>' to '>=', convenient for dev on macbook
  return /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || isIOS;
};
var OSTypes = {
  Windows: 'Windows',
  MacOS: 'MacOS'
};
function getOSType() {
  var OS = 'Windows';
  if (global.navigator.userAgent.indexOf('Windows') !== -1) {
    OS = 'Windows';
  } else if (global.navigator.userAgent.indexOf('Mac') !== -1) {
    OS = 'MacOS';
  }
  // WE DON'T SUPPORT THOSE FOR NOW
  // else if (global.navigator.userAgent.indexOf('X11') !== -1) {
  //   OS = 'UNIX';
  // } else if (global.navigator.userAgent.indexOf('Linux') !== -1) {
  //   OS = 'Linux';
  // }
  return OS;
}
//# sourceMappingURL=detectDevice.js.map
