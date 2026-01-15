"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.iterator");
require("core-js/modules/es.string.search");
require("core-js/modules/web.dom-collections.iterator");
require("core-js/modules/web.url");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _popWindow = require("../popWindow");
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var ProxyFrameController = function ProxyFrameController() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    prefix = _ref.prefix;
  _classCallCheck(this, ProxyFrameController);
  var urlParams = new URLSearchParams(location.search);
  var uuid = urlParams.get('uuid') || '';

  // TODO: should find where to call that
  window.oAuthCallback = function (callbackUri) {
    window.parent.postMessage({
      callbackUri: callbackUri
    }, '*');
  };
  window.addEventListener('message', function (_ref2) {
    var data = _ref2.data;
    if (data) {
      var oAuthUri = data.oAuthUri;
      if (oAuthUri != null) {
        var toURL = new URL(oAuthUri);
        toURL.searchParams.set('state', "".concat(toURL.searchParams.get('state'), "-").concat(uuid));
        (0, _popWindow.popWindow)(toURL.href, "".concat(prefix, "-oauth"), 700, 700);
      }
    }
  });
  var key = "".concat(prefix, "-").concat(uuid, "-callbackUri");
  window.addEventListener('storage', function (e) {
    if (e.key === key && e.newValue && e.newValue !== '') {
      var callbackUri = e.newValue;
      window.parent.postMessage({
        callbackUri: callbackUri
      }, '*');
      localStorage.removeItem(key);
    }
  });

  // loaded
  window.parent.postMessage({
    proxyLoaded: true
  }, '*');
};
exports["default"] = ProxyFrameController;
//# sourceMappingURL=index.js.map
