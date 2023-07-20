"use strict";

require("core-js/modules/es.array.concat");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.popWindow = popWindow;
function popWindow(url, id, w, h) {
  // Fixes dual-screen position                         Most browsers      Firefox
  var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left;
  var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top;
  var width = window.screen.width || window.outerWidth;
  var height = window.screen.height || window.innerHeight;
  var left = width / 2 - w / 2 + dualScreenLeft;
  var top = height / 2 - h / 2 + dualScreenTop;
  var newWindow = window.open(url, id, "scrollbars=yes, width=".concat(w, ", height=").concat(h, ", top=").concat(top, ", left=").concat(left));

  // Puts focus on the newWindow
  try {
    newWindow === null || newWindow === void 0 ? void 0 : newWindow.focus();
  } catch (error) {
    /* ignore error */
  }
  return newWindow;
}
var _default = popWindow;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
