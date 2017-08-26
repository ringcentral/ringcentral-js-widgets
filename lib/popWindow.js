"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = popWindow;
function popWindow(url, id, w, h) {
  // Fixes dual-screen position                         Most browsers      Firefox
  var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
  var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

  var width = screen.width || window.outerWidth;
  var height = screen.height || window.innerHeight;

  var left = width / 2 - w / 2 + dualScreenLeft;
  var top = height / 2 - h / 2 + dualScreenTop;
  var newWindow = window.open(url, id, "scrollbars=yes, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);

  // Puts focus on the newWindow
  if (window.focus) {
    try {
      newWindow.focus();
    } catch (e) {
      /* falls through */
    }
  }
  return newWindow;
}
//# sourceMappingURL=popWindow.js.map
