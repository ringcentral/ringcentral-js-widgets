'use strict';

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _simpleHash = require('../simpleHash');

var _simpleHash2 = _interopRequireDefault(_simpleHash);

var _popWindow = require('../popWindow');

var _popWindow2 = _interopRequireDefault(_popWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginWindow = null;

var _parse = (0, _urlParse2.default)(window.location.href, true),
    _parse$query = _parse.query,
    _parse$query$prefix = _parse$query.prefix,
    prefix = _parse$query$prefix === undefined ? 'rc' : _parse$query$prefix,
    _parse$query$hash = _parse$query.hash,
    hash = _parse$query$hash === undefined ? (0, _simpleHash2.default)() : _parse$query$hash;

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
      data = _ref$data === undefined ? {} : _ref$data;
  var oAuthUri = data.oAuthUri;

  if (oAuthUri && oAuthUri.trim() !== '') {
    var parsedUri = (0, _urlParse2.default)(oAuthUri, true);
    var query = parsedUri.query;

    query.state = query.state + '-' + prefix + '-' + hash;
    parsedUri.set('query', query);
    loginWindow = (0, _popWindow2.default)(parsedUri.toString(), prefix + '-oauth', 600, 600);
  }
});

var key = prefix + '-' + hash + '-callbackUri';
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
