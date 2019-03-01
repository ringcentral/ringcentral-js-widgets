"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.regexp.search");

var _url = _interopRequireDefault(require("url"));

var _popWindow = _interopRequireDefault(require("../popWindow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProxyFrameController = function ProxyFrameController() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      prefix = _ref.prefix;

  _classCallCheck(this, ProxyFrameController);

  var _url$parse = _url.default.parse(window.location.href, true),
      _url$parse$query$uuid = _url$parse.query.uuid,
      uuid = _url$parse$query$uuid === void 0 ? '' : _url$parse$query$uuid;

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
        var _url$parse2 = _url.default.parse(oAuthUri, true),
            query = _url$parse2.query,
            search = _url$parse2.search,
            parsedUri = _objectWithoutProperties(_url$parse2, ["query", "search"]);

        var uri = _url.default.format(_objectSpread({}, parsedUri, {
          query: _objectSpread({}, query, {
            state: "".concat(query.state, "-").concat(uuid)
          }),
          search: undefined
        }));

        (0, _popWindow.default)(uri, "".concat(prefix, "-oauth"), 600, 600);
      }
    }
  });
  var key = "".concat(prefix, "-").concat(uuid, "-redirect-callbackUri");
  window.addEventListener('storage', function (e) {
    if (e.key === key && e.newValue && e.newValue !== '') {
      var callbackUri = e.newValue;
      window.parent.postMessage({
        callbackUri: callbackUri
      }, '*');
      localStorage.removeItem(key);
    }
  }); // loaded

  window.parent.postMessage({
    proxyLoaded: true
  }, '*');
};

exports.default = ProxyFrameController;
//# sourceMappingURL=index.js.map
