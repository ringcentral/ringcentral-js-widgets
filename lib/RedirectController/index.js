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
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url-search-params.js");
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var RedirectController = exports["default"] = /*#__PURE__*/_createClass(function RedirectController() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    prefix = _ref.prefix,
    appOrigin = _ref.appOrigin;
  _classCallCheck(this, RedirectController);
  window.addEventListener('load', function () {
    var callbackUri = location.href;
    // RCINT-3477 some devices will have reference to opener, but will throw exception
    // when try to access opener
    try {
      if (window.opener && window.opener.oAuthCallback) {
        window.opener.oAuthCallback(callbackUri);
        window.close();
        return;
      }
    } catch (e) {
      /* ignore error */
    }

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
    } catch (error) {
      /* ignore error */
    }

    // fall back to use localStorage as a vessel to avoid opener is null bug

    var searchParams = new URLSearchParams(callbackUri);
    var state = searchParams.get('state');
    if (!state) {
      return;
    }
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
});
//# sourceMappingURL=index.js.map
