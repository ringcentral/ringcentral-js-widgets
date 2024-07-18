"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.regexp.to-string");
require("core-js/modules/es.string.iterator");
require("core-js/modules/es.string.search");
require("core-js/modules/es.string.trim");
require("core-js/modules/web.dom-collections.iterator");
require("core-js/modules/web.url");
var _popWindow = require("../popWindow");
var _simpleHash = _interopRequireDefault(require("../simpleHash"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var loginWindow = null;
var urlSearchParams = new URLSearchParams(window.location.search);
var prefix = urlSearchParams.get('prefix') || 'rc';
var hash = urlSearchParams.get('hash') || (0, _simpleHash["default"])();

/**
 * @function
 * @global
 * @description oAuthCallback allows redirect to call via window.opener.oAuthCallback if window.opener is not blocked.
 * @param {String} callbackUri
 */
window.oAuthCallback = function (callbackUri) {
  window.parent.postMessage({
    callbackUri: callbackUri
  }, '*');
};
window.addEventListener('message', function (_ref) {
  var _ref$data = _ref.data,
    data = _ref$data === void 0 ? {} : _ref$data;
  var oAuthUri = data.oAuthUri;
  if (oAuthUri && oAuthUri.trim() !== '') {
    var parsedUri = new URL(oAuthUri);
    var searchParams = new URLSearchParams(parsedUri.search);
    searchParams.set('state', "".concat(searchParams.get('state'), "-").concat(prefix, "-").concat(hash));
    parsedUri.search = searchParams.toString();
    loginWindow = (0, _popWindow.popWindow)(parsedUri.toString(), "".concat(prefix, "-oauth"), 700, 700);
  }
});
var key = "".concat(prefix, "-").concat(hash, "-callbackUri");
window.addEventListener('storage', function (e) {
  if (e.key === key && e.newValue && e.newValue !== '') {
    var callbackUri = e.newValue;
    localStorage.removeItem(key);
    window.parent.postMessage({
      callbackUri: callbackUri
    }, '*');
  }
});
try {
  window.parent.postMessage({
    proxyLoaded: true
  }, '*');
} catch (error) {
  /* ignore error */
}
window.addEventListener('beforeunload', function () {
  if (loginWindow) {
    try {
      loginWindow.close();
    } catch (error) {
      /* ignore error */
    }
  }
});
//# sourceMappingURL=index.js.map
