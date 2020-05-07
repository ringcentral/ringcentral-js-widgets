"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.regexp.split");

var _url = _interopRequireDefault(require("url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RedirectController = function RedirectController() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      prefix = _ref.prefix,
      appOrigin = _ref.appOrigin;

  _classCallCheck(this, RedirectController);

  window.addEventListener('load', function () {
    var callbackUri = window.location.href; // RCINT-3477 some devices will have reference to opener, but will throw exception
    // when tring to access opener

    try {
      if (window.opener && window.opener.oAuthCallback) {
        window.opener.oAuthCallback(callbackUri);
        window.close();
        return;
      }
    } catch (e) {}
    /* ignore error */
    // Use this when redirect page is different domain with app
    // appOrigin: app's origin


    try {
      if (appOrigin && window.opener && window.opener.postMessage) {
        window.opener.postMessage({
          callbackUri: callbackUri
        }, appOrigin);
        window.close();
        return;
      }
    } catch (error) {}
    /* ignore error */
    // fall back to use localStorage as a vessel to avoid opener is null bug


    var _url$parse = _url["default"].parse(callbackUri, true),
        state = _url$parse.query.state;

    var uuid = state.split('-').slice(1).join('-');
    var key = "".concat(prefix, "-").concat(uuid, "-callbackUri");
    localStorage.removeItem(key);
    window.addEventListener('storage', function (e) {
      if (e.key === key && (!e.newValue || e.newValue === '')) {
        window.close();
      }
    });
    localStorage.setItem(key, callbackUri);
  });
};

exports["default"] = RedirectController;
//# sourceMappingURL=index.js.map
