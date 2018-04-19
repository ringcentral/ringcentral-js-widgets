"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = popWindow;
function popWindow(url, id, w, h) {
  // Fixes dual-screen position                         Most browsers      Firefox
  var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left;
  var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top;

  var width = window.screen.width || window.outerWidth;
  var height = window.screen.height || window.innerHeight;

  var left = width / 2 - w / 2 + dualScreenLeft;
  var top = height / 2 - h / 2 + dualScreenTop;
  var newWindow = window.open(url, id, "scrollbars=yes, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);

  // Puts focus on the newWindow
  try {
    if (newWindow.focus) {
      newWindow.focus();
    }
  } catch (error) {
    /* ignore error */
  }
  return newWindow;
}
//# sourceMappingURL=index.js.map
