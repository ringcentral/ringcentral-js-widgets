'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _popWindow = require('../popWindow');

var _popWindow2 = _interopRequireDefault(_popWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProxyFrameController = function ProxyFrameController() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      prefix = _ref.prefix;

  (0, _classCallCheck3.default)(this, ProxyFrameController);

  var _url$parse = _url2.default.parse(window.location.href, true),
      _url$parse$query$uuid = _url$parse.query.uuid,
      uuid = _url$parse$query$uuid === undefined ? '' : _url$parse$query$uuid;

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
        var _url$parse2 = _url2.default.parse(oAuthUri, true),
            query = _url$parse2.query,
            search = _url$parse2.search,
            parsedUri = (0, _objectWithoutProperties3.default)(_url$parse2, ['query', 'search']);

        var uri = _url2.default.format((0, _extends3.default)({}, parsedUri, {
          query: (0, _extends3.default)({}, query, {
            state: query.state + '-' + uuid
          }),
          search: undefined
        }));
        (0, _popWindow2.default)(uri, prefix + '-oauth', 600, 600);
      }
    }
  });

  var key = prefix + '-' + uuid + '-redirect-callbackUri';
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

exports.default = ProxyFrameController;
//# sourceMappingURL=index.js.map
