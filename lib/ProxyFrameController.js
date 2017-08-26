'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _popWindow = require('./popWindow');

var _popWindow2 = _interopRequireDefault(_popWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProxyFrameController = function ProxyFrameController() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      prefix = _ref.prefix;

  (0, _classCallCheck3.default)(this, ProxyFrameController);

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
        (0, _popWindow2.default)(oAuthUri, 'rc-oauth', 600, 600);
      }
    }
  });

  var key = prefix + '-redirect-callbackUri';
  window.addEventListener('storage', function (e) {
    if (e.key === key && e.newValue && e.newValue !== '') {
      var callbackUri = e.newValue;
      window.parent.postMessage({
        callbackUri: callbackUri,
        fromLocalStorage: true
      }, '*');
      localStorage.removeItem(key);
    }
  });
  // loaded
  window.parent.postMessage({
    proxyLoaded: true
  }, '*');
};

exports.default = ProxyFrameController;
//# sourceMappingURL=ProxyFrameController.js.map
