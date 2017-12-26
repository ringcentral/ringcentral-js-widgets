'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RedirectController = function RedirectController() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      prefix = _ref.prefix;

  (0, _classCallCheck3.default)(this, RedirectController);

  window.addEventListener('load', function () {
    var callbackUri = window.location.href;
    // RCINT-3477 some devices will have reference to opener, but will throw exception
    // when tring to access opener
    try {
      if (window.opener && window.opener.oAuthCallback) {
        window.opener.oAuthCallback(callbackUri);
        window.close();
        return;
      }
    } catch (e) {}
    /* ignore error */

    // fall back to use localStorage as a vessel to avoid opener is null bug

    var _url$parse = _url2.default.parse(callbackUri, true),
        state = _url$parse.query.state;

    var uuid = state.split('-').slice(1).join('-');
    var key = prefix + '-' + uuid + '-redirect-callbackUri';
    localStorage.removeItem(key);
    window.addEventListener('storage', function (e) {
      if (e.key === key && (!e.newValue || e.newValue === '')) {
        window.close();
      }
    });
    localStorage.setItem(key, callbackUri);
  });
};

exports.default = RedirectController;
//# sourceMappingURL=index.js.map
