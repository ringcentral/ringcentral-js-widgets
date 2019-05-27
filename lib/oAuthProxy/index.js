"use strict";

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.trim");

var _urlParse = _interopRequireDefault(require("url-parse"));

var _simpleHash = _interopRequireDefault(require("../simpleHash"));

var _popWindow = _interopRequireDefault(require("../popWindow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loginWindow = null;

var _parse = (0, _urlParse["default"])(window.location.href, true),
    _parse$query = _parse.query,
    _parse$query$prefix = _parse$query.prefix,
    prefix = _parse$query$prefix === void 0 ? 'rc' : _parse$query$prefix,
    _parse$query$hash = _parse$query.hash,
    hash = _parse$query$hash === void 0 ? (0, _simpleHash["default"])() : _parse$query$hash;
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
    var parsedUri = (0, _urlParse["default"])(oAuthUri, true);
    var query = parsedUri.query;
    query.state = "".concat(query.state, "-").concat(prefix, "-").concat(hash);
    parsedUri.set('query', query);
    loginWindow = (0, _popWindow["default"])(parsedUri.toString(), "".concat(prefix, "-oauth"), 600, 600);
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
