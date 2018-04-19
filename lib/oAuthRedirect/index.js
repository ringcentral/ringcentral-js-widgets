'use strict';

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  var parsedUri = (0, _urlParse2.default)(callbackUri, true);
  var state = parsedUri.query.state || '';
  var hash = state.split('-').slice(1).join('-');
  if (hash && hash !== '') {
    var key = hash + '-callbackUri';
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
