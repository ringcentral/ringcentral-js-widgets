"use strict";

require("core-js/modules/es.array.join");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.split");
require("core-js/modules/web.timers");
var _urlParse = _interopRequireDefault(require("url-parse"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
(function () {
  var callbackUri = window.location.href;
  try {
    if (window.opener && window.opener.oAuthCallback) {
      window.opener.oAuthCallback(callbackUri);
      window.close();
      return;
    }
  } catch (error) {
    /* ignore error */
  }

  // Use this when redirect page is different domain with app
  // Update window.origin to app's origin
  // try {
  //   if (window.opener && window.opener.postMessage) {
  //     window.opener.postMessage({ callbackUri }, window.origin);
  //     window.close();
  //     return;
  //   }
  // } catch (error) {
  //   /* ignore error */
  // }

  var parsedUri = (0, _urlParse["default"])(callbackUri, true);
  var state = parsedUri.query.state || '';
  var hash = state.split('-').slice(1).join('-');
  if (hash && hash !== '') {
    var key = "".concat(hash, "-callbackUri");
    window.addEventListener('storage', function (e) {
      if (e.key === key && (!e.newValue || e.newValue === '')) {
        window.close();
      }
    });
    localStorage.setItem(key, callbackUri);
    setTimeout(function () {
      localStorage.removeItem(key);
    }, 3000);
  }
})();
//# sourceMappingURL=index.js.map
