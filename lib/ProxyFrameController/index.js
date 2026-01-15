"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-property.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url.to-json.js");
require("core-js/modules/web.url-search-params.js");
var _popWindow = require("../popWindow");
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var ProxyFrameController = exports["default"] = /*#__PURE__*/_createClass(function ProxyFrameController() {
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
});
//# sourceMappingURL=index.js.map
