"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _url = _interopRequireDefault(require("url"));
var _popWindow = _interopRequireDefault(require("../popWindow"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var ProxyFrameController = function ProxyFrameController() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    prefix = _ref.prefix;
  _classCallCheck(this, ProxyFrameController);
  var _url$parse = _url["default"].parse(window.location.href, true),
    _url$parse$query$uuid = _url$parse.query.uuid,
    uuid = _url$parse$query$uuid === void 0 ? '' : _url$parse$query$uuid; // TODO: should find where to call that
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
        var _url$parse2 = _url["default"].parse(oAuthUri, true),
          query = _url$parse2.query,
          parsedUri = _objectWithoutProperties(_url$parse2, ["query"]);
        var uri = _url["default"].format(_objectSpread(_objectSpread({}, parsedUri), {}, {
          query: _objectSpread(_objectSpread({}, query), {}, {
            state: "".concat(query.state, "-").concat(uuid)
          }),
          search: undefined
        }));
        (0, _popWindow["default"])(uri, "".concat(prefix, "-oauth"), 600, 600);
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
